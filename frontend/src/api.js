const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

async function tratarResposta(resposta) {
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(dados?.erro || 'Erro ao comunicar com o servidor.');
  }
  return dados;
}

export function listarChamados() {
  return fetch(`${API_URL}/chamados`).then(tratarResposta);
}

export function listarHistorico() {
  return fetch(`${API_URL}/historico`).then(tratarResposta);
}

export function criarChamado(dados) {
  return fetch(`${API_URL}/chamados`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(tratarResposta);
}

export function atenderChamado(id, dados) {
  return fetch(`${API_URL}/chamados/${id}/atender`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(tratarResposta);
}

export function login(dados) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(tratarResposta);
}