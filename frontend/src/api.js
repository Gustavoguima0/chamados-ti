const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function cabecalhos() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function tratarResposta(resposta) {
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(dados?.erro || 'Erro ao comunicar com o servidor.');
  }
  return dados;
}

export function login(dados) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: cabecalhos(),
    body: JSON.stringify(dados),
  }).then(tratarResposta);
}

export function listarChamados() {
  return fetch(`${API_URL}/chamados`, { headers: cabecalhos() }).then(tratarResposta);
}

export function listarHistorico() {
  return fetch(`${API_URL}/historico`, { headers: cabecalhos() }).then(tratarResposta);
}

export function criarChamado(dados) {
  return fetch(`${API_URL}/chamados`, {
    method: 'POST',
    headers: cabecalhos(),
    body: JSON.stringify(dados),
  }).then(tratarResposta);
}

export function atenderChamado(id, dados) {
  return fetch(`${API_URL}/chamados/${id}/atender`, {
    method: 'PATCH',
    headers: cabecalhos(),
    body: JSON.stringify(dados),
  }).then(tratarResposta);
}