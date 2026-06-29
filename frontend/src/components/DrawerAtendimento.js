import { useState } from 'react';

function DrawerAtendimento({ chamado, onFechar, onFinalizar }) {
  const [nomeTecnico, setNomeTecnico] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [status, setStatus] = useState('');

  function finalizar(statusEscolhido) {
    if (!nomeTecnico) return alert('Informe o nome do técnico.');
    if (statusEscolhido !== 'Resolvido' && !justificativa) {
      return alert('Informe uma justificativa.');
    }
    onFinalizar({ ...chamado, status: statusEscolhido, nomeTecnico, justificativa });
  }

  return (
    <div className="drawer-fundo" onClick={onFechar}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <h2>Atendimento</h2>

        <div className="drawer-info">
          <p><strong>Aberto por:</strong> {chamado.nome}</p>
          <p><strong>Setor:</strong> {chamado.setor}</p>
          <p><strong>Problema:</strong> {chamado.problema}</p>
          {chamado.observacao && (
            <p><strong>Obs:</strong> {chamado.observacao}</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Seu nome (técnico)"
          value={nomeTecnico}
          onChange={(e) => setNomeTecnico(e.target.value)}
        />

        <textarea
          placeholder="Justificativa (obrigatória se não resolver)"
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
          rows={3}
        />

        <div className="drawer-botoes">
          <button className="btn-resolver" onClick={() => finalizar('Resolvido')}>
            Resolvido
          </button>
          <button className="btn-analise" onClick={() => finalizar('Em análise')}>
            Em análise
          </button>
          <button className="btn-nao-resolvido" onClick={() => finalizar('Não resolvido')}>
            Não resolvido
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrawerAtendimento;