import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Chamados TI</h2>
      <ul>
        <li><Link to="/">Chamados</Link></li>
        <li><Link to="/historico">Histórico</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;