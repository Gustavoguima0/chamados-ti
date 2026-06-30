import { useState } from 'react';

function Historico({ historico }) {
    const [filtroStatus, setFiltroStatus] = useState('Todos');

    const chamadosFiltrados = historico.filter(chamado => {
        if (filtroStatus === 'Todos') return true;
        return chamado.status === filtroStatus;
    });

    return (
        <main>
            <h2>Histórico de Chamados</h2>

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

            <div className="lista-chamados">
                {chamadosFiltrados.length === 0 && (
                    <p style={{ color: '#888' }}>Nenhum chamado encontrado.</p>
                )}

                {chamadosFiltrados.map((chamado, index) => (
                    <div key={index} className="card-chamado">
                        <div className="card-header">
                            <span className="card-setor">{chamado.setor}</span>
                            <span style={{ fontSize: '12px', color: chamado.status === 'Resolvido' ? '#2ecc71' : chamado.status === 'Em análise' ? '#e67e22' : '#e74c3c' }}>
                                {chamado.status}
                            </span>
                        </div>
                        <p className="card-problema">{chamado.problema}</p>
                        <p className="card-nome">Aberto por: {chamado.nome}</p>
{chamado.abertoEm && (
  <p className="card-nome">
    Aberto em: {new Date(chamado.abertoEm).toLocaleString('pt-BR')}
  </p>
)}                        <p className="card-nome">Técnico: {chamado.nomeTecnico}</p>
                        {chamado.justificativa && (
                            <p className="card-obs">Justificativa: {chamado.justificativa}</p>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Historico;