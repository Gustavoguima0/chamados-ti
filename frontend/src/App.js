import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Chamados from './pages/Chamados';
import Historico from './pages/Historico';

function App() {
  const [chamados, setChamados] = useState([]);
  const [historico, setHistorico] = useState([]);

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Chamados
                chamados={chamados}
                setChamados={setChamados}
                historico={historico}
                setHistorico={setHistorico}
              />
            }
          />
          <Route
            path="/historico"
            element={<Historico historico={historico} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;