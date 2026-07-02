const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor Chamados TI rodando!' });
});

// Chamados ainda ativos: recém-abertos ou em análise.
app.get('/chamados', async (req, res) => {
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

// Chamados já atendidos ao menos uma vez (inclui os que continuam em análise).
app.get('/historico', async (req, res) => {
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

app.post('/chamados', async (req, res) => {
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

app.patch('/chamados/:id/atender', async (req, res) => {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
