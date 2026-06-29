import { useState } from 'react';

function FormChamado({ onFechar }) {
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [problema, setProblema] = useState('');

  return (
    <div className="modal-fundo">
      <div className="modal-caixa">
        <h2>Abrir Chamado</h2>

        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <select value={setor} onChange={(e) => setSetor(e.target.value)}>
          <option value="">Selecione o setor</option>
          <option value="UTI">UTI</option>
          <option value="Recepção">Recepção</option>
          <option value="Triagem">Triagem</option>
          <option value="Sala Vermelha">Sala Vermelha</option>
          <option value="Medicação">Medicação</option>
          <option value="ADM">ADM</option>
          <option value="RH">RH</option>
        </select>

        <select value={problema} onChange={(e) => setProblema(e.target.value)}>
          <option value="">Selecione o problema</option>
          <option value="Sem rede">Sem rede</option>
          <option value="Computador não liga">Computador não liga</option>
          <option value="Impressora">Impressora</option>
          <option value="Sistema lento">Sistema lento</option>
        </select>

        <div className="modal-botoes">
          <button onClick={onFechar}>Cancelar</button>
          <button>Abrir Chamado</button>
        </div>
      </div>
    </div>
  );
}

export default FormChamado;