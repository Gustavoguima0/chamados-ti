import { useState } from 'react';
import FormChamado from '../components/FormChamado';
import CardChamado from '../components/CardChamado';
import DrawerAtendimento from '../components/DrawerAtendimento';

function Chamados({ chamados, setChamados, historico, setHistorico }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  function adicionarChamado(novoChamado) {
    const agora = new Date().toLocaleTimeString('pt-BR');
    setChamados([{ ...novoChamado, abertoEm: agora }, ...chamados]);
    setModalAberto(false);
  }

  function finalizarChamado(chamadoFinalizado) {
    setChamados(chamados.filter(c => c !== chamadoFinalizado));
    setHistorico([chamadoFinalizado, ...historico]);
    setChamadoSelecionado(null);
  }

  return (
    <main>
      <button className="btn-novo-chamado" onClick={() => setModalAberto(true)}>
        + Abrir Chamado
      </button>

      <div className="lista-chamados">
        {chamados.map((chamado, index) => (
          <CardChamado
            key={index}
            chamado={chamado}
            onAtender={() => setChamadoSelecionado(chamado)}
          />
        ))}
      </div>

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