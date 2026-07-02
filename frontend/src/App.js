import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Chamados from './pages/Chamados';
import Historico from './pages/Historico';
import Login from './pages/Login';

function App() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar onSair={() => setLogado(false)} />
        <Routes>
          <Route path="/" element={<Chamados />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;