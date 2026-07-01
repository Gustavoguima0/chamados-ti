import { useState } from 'react';

function FormChamado({ onFechar, onSubmit }) {
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [problema, setProblema] = useState('');
  const [observacao, setObservacao] = useState('');

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div className="modal-caixa" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Abrir Chamado</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>

        <div className="modal-campo">
          <label>Seu nome</label>
          <input
            type="text"
            placeholder="Ex: Maria da Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="modal-campo">
          <label>Setor</label>
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
        </div>

        <div className="modal-campo">
          <label>Problema</label>
          <select value={problema} onChange={(e) => setProblema(e.target.value)}>
            <option value="">Selecione o problema</option>
            <option value="Sem rede">Sem rede</option>
            <option value="Computador não liga">Computador não liga</option>
            <option value="Impressora">Impressora</option>
            <option value="Sistema lento">Sistema lento</option>
          </select>
        </div>

        <div className="modal-campo">
          <label>Observação <span className="label-opcional">(opcional)</span></label>
          <textarea
            placeholder="Descreva o problema com mais detalhes..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            rows={3}
          />
        </div>

        <div className="modal-botoes">
          <button className="btn-cancelar" onClick={onFechar}>Cancelar</button>
          <button
            className="btn-confirmar"
            onClick={() => {
              if (!nome || !setor || !problema) return;
              onSubmit({ nome, setor, problema, observacao });
            }}
          >
            Abrir Chamado
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormChamado;