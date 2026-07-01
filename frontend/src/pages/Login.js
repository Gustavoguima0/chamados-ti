import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleLogin() {
    if (usuario === 'admin' && senha === '1234') {
      onLogin();
    } else {
      setErro('Usuário ou senha incorretos.');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleLogin();
  }

  return (
    <div className="login-fundo">
      <div className="login-caixa">

        <div className="login-topo">
          <h1>Chamados TI</h1>
          <p>Sistema de atendimento — UPA</p>
        </div>

        <div className="login-campos">
          <div className="login-campo">
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="login-campo">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {erro && <p className="login-erro">{erro}</p>}

          <button className="btn-login" onClick={handleLogin}>
            Entrar
          </button>
        </div>

        <p className="login-rodape">Luiz Gustavo Guimarães · v1.0</p>
      </div>
    </div>
  );
}

export default Login;