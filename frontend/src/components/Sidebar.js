import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ onSair }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Chamados TI</h2>
      </div>

      <nav>
        <ul>
          <li><NavLink to="/" end>Chamados</NavLink></li>
          <li><NavLink to="/historico">Histórico</NavLink></li>
        </ul>
      </nav>

      <div className="sidebar-rodape">
        <p className="rodape-nome">Luiz Gustavo Guimarães</p>
        <p className="rodape-versao">v1.0 — Chamados TI</p>
        <button className="btn-sair" onClick={onSair}>
          → Sair
        </button>
      </div>
    </div>
  );
}

export default Sidebar;