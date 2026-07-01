import { useState } from 'react';

const COR_STATUS = {
  'Resolvido': '#2ecc71',
  'Em análise': '#e67e22',
  'Não resolvido': '#e74c3c',
};

function Historico({ historico }) {
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  const chamadosFiltrados = historico.filter(chamado => {
    if (filtroStatus === 'Todos') return true;
    return chamado.status === filtroStatus;
  });

  return (
    <main>
      <div className="page-header">
        <h2>Histórico de Chamados</h2>
      </div>

      <div className="filtros">
        {['Todos', 'Resolvido', 'Em análise', 'Não resolvido'].map(status => (
          <button
            key={status}
            className={`btn-filtro ${filtroStatus === status ? 'ativo' : ''}`}
            onClick={() => setFiltroStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {chamadosFiltrados.length === 0 ? (
        <div className="estado-vazio">
          <p>Nenhum chamado encontrado.</p>
          <span>
            {filtroStatus === 'Todos'
              ? 'Os chamados finalizados aparecerão aqui.'
              : `Nenhum chamado com status "${filtroStatus}".`}
          </span>
        </div>
      ) : (
        <div className="lista-chamados">
          {chamadosFiltrados.map((chamado, index) => (
            <div
              key={index}
              className="card-chamado"
              style={{ borderLeft: `4px solid ${COR_STATUS[chamado.status] || '#555'}` }}
            >
              <div className="card-header">
                <span className="card-setor">{chamado.setor}</span>
                <span className="card-status" style={{ color: COR_STATUS[chamado.status] }}>
                  {chamado.status}
                </span>
              </div>

              <p className="card-problema">{chamado.problema}</p>

              <div className="card-meta">
                <p>Aberto por: <strong>{chamado.nome}</strong></p>
                <p>Técnico: <strong>{chamado.nomeTecnico}</strong></p>
                {chamado.abertoEm && (
                  <p>Em: {new Date(chamado.abertoEm).toLocaleString('pt-BR')}</p>
                )}
              </div>

              {chamado.justificativa && (
                <p className="card-obs">"{chamado.justificativa}"</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Historico;