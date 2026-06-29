import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        <h1>Chamados TI</h1>
      </main>
    </div>
  );
}

export default App;