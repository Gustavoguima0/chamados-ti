import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FormChamado from './components/FormChamado';

function App() {
  const [modalAberto, setModalAberto] = useState(false);
  const [chamados, setChamados] = useState([]);

  function adicionarChamado(novoChamado) {
    setChamados([novoChamado, ...chamados]);
    setModalAberto(false);
  }

  return (
    <div className="layout">
      <Sidebar />
      <main>
        <button onClick={() => setModalAberto(true)}>
          + Abrir Chamado
        </button>

        <div>
          {chamados.map((chamado, index) => (
            <div key={index}>
              <p>{chamado.nome} — {chamado.setor} — {chamado.problema}</p>
            </div>
          ))}
        </div>

        {modalAberto && (
          <FormChamado
            onFechar={() => setModalAberto(false)}
            onSubmit={adicionarChamado}
          />
        )}
      </main>
    </div>
  );
}

export default App;