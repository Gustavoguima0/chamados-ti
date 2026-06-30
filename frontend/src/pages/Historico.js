function Historico({ historico }) {
  return (
    <main>
      <h2>Histórico de Chamados</h2>

      <div className="lista-chamados">
        {historico.length === 0 && (
          <p style={{ color: '#888' }}>Nenhum chamado finalizado ainda.</p>
        )}

        {historico.map((chamado, index) => (
          <div key={index} className="card-chamado">
            <div className="card-header">
              <span className="card-setor">{chamado.setor}</span>
              <span style={{ fontSize: '12px', color: chamado.status === 'Resolvido' ? '#2ecc71' : chamado.status === 'Em análise' ? '#e67e22' : '#e74c3c' }}>
                {chamado.status}
              </span>
            </div>
            <p className="card-problema">{chamado.problema}</p>
            <p className="card-nome">Aberto por: {chamado.nome}</p>
            {chamado.abertoEm && <p className="card-nome">Aberto às: {chamado.abertoEm}</p>}
            <p className="card-nome">Técnico: {chamado.nomeTecnico}</p>
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