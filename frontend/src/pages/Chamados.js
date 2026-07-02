import { useState, useEffect } from 'react';
import FormChamado from '../components/FormChamado';
import CardChamado from '../components/CardChamado';
import DrawerAtendimento from '../components/DrawerAtendimento';
import { listarChamados, criarChamado, atenderChamado } from '../api';

function Chamados() {
  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  useEffect(() => {
    listarChamados()
      .then(setChamados)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  async function adicionarChamado(novoChamado) {
    try {
      const criado = await criarChamado(novoChamado);
      setChamados([criado, ...chamados]);
      setModalAberto(false);
    } catch (e) {
      setErro(e.message);
    }
  }

  async function finalizarChamado(dados) {
    try {
      const atualizado = await atenderChamado(chamadoSelecionado.id, dados);
      if (atualizado.status === 'Em análise') {
        setChamados(chamados.map((c) => (c.id === atualizado.id ? atualizado : c)));
      } else {
        setChamados(chamados.filter((c) => c.id !== atualizado.id));
      }
      setChamadoSelecionado(null);
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <main>
      <div className="page-header">
        <h2>Chamados Abertos {chamados.length > 0 && `(${chamados.length})`}</h2>
        <button className="btn-novo-chamado" onClick={() => setModalAberto(true)}>
          + Abrir Chamado
        </button>
      </div>

      {erro && <p className="erro-carregamento">{erro}</p>}

      {carregando ? (
        <p>Carregando chamados...</p>
      ) : (
        <div className="lista-chamados">
          {chamados.length === 0 && (
            <div className="estado-vazio">
              <p>Nenhum chamado aberto no momento.</p>
              <span>Clique em "+ Abrir Chamado" para registrar um novo.</span>
            </div>
          )}
          {chamados.map((chamado) => (
            <CardChamado
              key={chamado.id}
              chamado={chamado}
              onAtender={() => setChamadoSelecionado(chamado)}
            />
          ))}
        </div>
      )}

      {modalAberto && (
        <FormChamado
          onFechar={() => setModalAberto(false)}
          onSubmit={adicionarChamado}
        />
      )}

      {chamadoSelecionado && (
        <DrawerAtendimento
          chamado={chamadoSelecionado}
          onFechar={() => setChamadoSelecionado(null)}
          onFinalizar={finalizarChamado}
        />
      )}
    </main>
  );
}

export default Chamados;
