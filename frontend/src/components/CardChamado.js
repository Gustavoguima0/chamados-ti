import { useState, useEffect } from 'react';

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

function calcularTempo(abertoEm) {
    if (!abertoEm) return null;
    const abertura = new Date(abertoEm);
    const agora = new Date();
    const minutos = Math.floor((agora - abertura) / 1000 / 60);
    if (minutos < 1) return 'agora';
    if (minutos === 1) return 'há 1 min';
    return `há ${minutos} min`;
}

function CardChamado({ chamado, onAtender }) {
    const [agora, setAgora] = useState(new Date());
    const prioridade = calcularPrioridade(chamado.setor, chamado.problema);

    useEffect(() => {
        const timer = setInterval(() => {
            setAgora(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`card-chamado ${chamado.status === 'Em análise' ? 'card-em-analise' : ''}`}>
            <div className="card-header">
                <span className="card-setor">{chamado.setor}</span>
                <span className="card-prioridade" style={{ color: prioridade.cor }}>●</span>
            </div>
            <p className="card-problema">{chamado.problema}</p>
            <p className="card-nome">Aberto por: {chamado.nome}</p>
            {chamado.abertoEm && (
                <p className="card-nome" style={{ color: '#888', fontSize: '11px' }}>
                    {calcularTempo(chamado.abertoEm)}
                </p>
            )}
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