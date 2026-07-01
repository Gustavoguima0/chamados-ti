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
  const minutos = Math.floor((new Date() - new Date(abertoEm)) / 60000);
  if (minutos < 1) return 'agora';
  if (minutos === 1) return 'há 1 min';
  return `há ${minutos} min`;
}

function CardChamado({ chamado, onAtender }) {
  const [, setTick] = useState(0);
  const prioridade = calcularPrioridade(chamado.setor, chamado.problema);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`card-chamado ${chamado.status === 'Em análise' ? 'card-em-analise' : ''}`}
      style={{ borderLeft: `4px solid ${prioridade.cor}` }}
    >
      <div className="card-header">
        <span className="card-setor">{chamado.setor}</span>
        <span className="card-badge-prioridade" style={{ color: prioridade.cor }}>
          ● {prioridade.label}
        </span>
      </div>

      <p className="card-problema">{chamado.problema}</p>

      <div className="card-rodape">
        <span className="card-nome">{chamado.nome}</span>
        {chamado.abertoEm && (
          <span className="card-tempo">{calcularTempo(chamado.abertoEm)}</span>
        )}
      </div>

      {chamado.observacao && (
        <p className="card-obs">"{chamado.observacao}"</p>
      )}

      <button className="btn-atender" onClick={onAtender}>
        Atender
      </button>
    </div>
  );
}

export default CardChamado;