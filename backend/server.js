const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

function verificarToken(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const token = cabecalho.split(' ')[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor Chamados TI rodando!' });
});

app.get('/chamados', verificarToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM chamados
       WHERE status IN ('Aberto', 'Em análise')
       ORDER BY aberto_em DESC`
    );
    res.json(rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Não foi possível buscar os chamados.' });
  }
});

app.get('/historico', verificarToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM chamados
       WHERE status IN ('Em análise', 'Resolvido', 'Não resolvido')
       ORDER BY finalizado_em DESC NULLS LAST, aberto_em DESC`
    );
    res.json(rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Não foi possível buscar o histórico.' });
  }
});

app.post('/chamados', verificarToken, async (req, res) => {
  const { nome, setor, problema, observacao } = req.body;
  if (!nome || !setor || !problema) {
    return res.status(400).json({ erro: 'Nome, setor e problema são obrigatórios.' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO chamados (nome, setor, problema, observacao)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, setor, problema, observacao || null]
    );
    res.status(201).json(rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Não foi possível criar o chamado.' });
  }
});

app.patch('/chamados/:id/atender', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { status, nomeTecnico, justificativa } = req.body;
  const statusValidos = ['Em análise', 'Resolvido', 'Não resolvido'];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido.' });
  }
  if (!nomeTecnico) {
    return res.status(400).json({ erro: 'Nome do técnico é obrigatório.' });
  }
  if (status !== 'Resolvido' && !justificativa) {
    return res.status(400).json({ erro: 'Justificativa é obrigatória.' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE chamados
       SET status = $1, nome_tecnico = $2, justificativa = $3, finalizado_em = now()
       WHERE id = $4
       RETURNING *`,
      [status, nomeTecnico, justificativa || null, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Chamado não encontrado.' });
    }
    res.json(rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Não foi possível atualizar o chamado.' });
  }
});

app.post('/login', async (req, res) => {
  const { nome_usuario, senha } = req.body;

  if (!nome_usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM usuarios WHERE nome_usuario = $1',
      [nome_usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    const usuario = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, nome_usuario: usuario.nome_usuario, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, nome_usuario: usuario.nome_usuario, perfil: usuario.perfil });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});