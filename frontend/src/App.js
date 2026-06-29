import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FormChamado from './components/FormChamado';

function App() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="layout">
      <Sidebar />
      <main>
        <button onClick={() => setModalAberto(true)}>
          + Abrir Chamado
        </button>

        {modalAberto && (
          <FormChamado onFechar={() => setModalAberto(false)} />
        )}
      </main>
    </div>
  );
}

export default App;