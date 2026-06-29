function calcularPrioridade(setor, problema) {
    const setoresVermelhos = ['UTI', 'Sala Vermelha'];
    const setoresLaranja = ['Triagem', 'Medicação'];
    const problemasVermelhos = ['Sem rede'];
    const problemasLaranja = ['Computador não liga', 'Sistema lento'];

    if (setoresVermelhos.includes(setor) || problemasVermelhos.includes(problema)) {
        return { cor: '#e74c3c', label: 'Crítico' };
    }
    if (setoresLaranja.includes(setor) || problemasLaranja.includes(problema)) {
        return { cor: '#e67e22', label: 'Urgente' };
    }
    return { cor: '#2ecc71', label: 'Normal' };
}
function CardChamado({ chamado, onAtender }) {
    const prioridade = calcularPrioridade(chamado.setor, chamado.problema);

    return (
        <div className="card-chamado">
            <div className="card-header">
                <span className="card-setor">{chamado.setor}</span>
                <span className="card-prioridade" style={{ color: prioridade.cor }}>
                    ●
                </span>
            </div>
            <p className="card-problema">{chamado.problema}</p>
            <p className="card-nome">Aberto por: {chamado.nome}</p>
            {chamado.observacao && (
                <p className="card-obs">Obs: {chamado.observacao}</p>
            )}

            <button className="btn-atender" onClick={onAtender}>
                Atender
            </button>
        </div>
    );
}

export default CardChamado;