CREATE TABLE IF NOT EXISTS chamados (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  setor VARCHAR(60) NOT NULL,
  problema VARCHAR(120) NOT NULL,
  observacao TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'Aberto'
    CHECK (status IN ('Aberto', 'Em análise', 'Resolvido', 'Não resolvido')),
  nome_tecnico VARCHAR(120),
  justificativa TEXT,
  aberto_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  finalizado_em TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_chamados_status ON chamados (status);
