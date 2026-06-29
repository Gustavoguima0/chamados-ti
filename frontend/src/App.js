import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FormChamado from './components/FormChamado';
import CardChamado from './components/CardChamado';
import DrawerAtendimento from './components/DrawerAtendimento';

function App() {
  const [modalAberto, setModalAberto] = useState(false);
  const [chamados, setChamados] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  function adicionarChamado(novoChamado) {
    setChamados([novoChamado, ...chamados]);
    setModalAberto(false);
  }

  function finalizarChamado(chamadoFinalizado) {
    setChamados(chamados.filter((c, i) => i !== chamados.indexOf(chamadoFinalizado)));
    setHistorico([chamadoFinalizado, ...historico]);
    setChamadoSelecionado(null);
  }

  return (
    <div className="layout">
      <Sidebar />
      <main>
        <button onClick={() => setModalAberto(true)}>+ Abrir Chamado</button>

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
    </div>
  );
}

export default App;