import { useState } from 'react';

function DrawerAtendimento({ chamado, onFechar, onFinalizar }) {
  const [nomeTecnico, setNomeTecnico] = useState('');
  const [justificativa, setJustificativa] = useState('');

  function finalizar(statusEscolhido) {
    if (!nomeTecnico) return alert('Informe o nome do técnico.');
    if (statusEscolhido !== 'Resolvido' && !justificativa) {
      return alert('Informe uma justificativa.');
    }
    onFinalizar({ status: statusEscolhido, nomeTecnico, justificativa });
  }

  return (
    <div className="drawer-fundo" onClick={onFechar}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>

        <div className="drawer-header">
          <h2>Atendimento</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>

        <div className="drawer-secao">
          <p className="drawer-secao-titulo">Chamado</p>
          <div className="drawer-info">
            <p><strong>Aberto por:</strong> {chamado.nome}</p>
            <p><strong>Setor:</strong> {chamado.setor}</p>
            <p><strong>Problema:</strong> {chamado.problema}</p>
            {chamado.observacao && (
              <p><strong>Obs:</strong> {chamado.observacao}</p>
            )}
          </div>
        </div>

        <div className="drawer-secao">
          <p className="drawer-secao-titulo">Técnico</p>

          <div className="drawer-campo">
            <label>Nome do técnico</label>
            <input
              type="text"
              placeholder="Ex: João Silva"
              value={nomeTecnico}
              onChange={(e) => setNomeTecnico(e.target.value)}
            />
          </div>

          <div className="drawer-campo">
            <label>Justificativa <span className="label-opcional">(obrigatória se não resolver)</span></label>
            <textarea
              placeholder="Descreva o que foi feito ou o motivo..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={4}
            />
          </div>
        </div>

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