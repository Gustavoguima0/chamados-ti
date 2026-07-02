import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('exibe a tela de login quando o usuário ainda não entrou', () => {
  render(<App />);
  expect(screen.getByText(/chamados ti/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/digite seu usuário/i)).toBeInTheDocument();
});

test('mostra erro ao tentar logar com credenciais inválidas', () => {
  render(<App />);

  userEvent.type(screen.getByPlaceholderText(/digite seu usuário/i), 'usuario-errado');
  userEvent.type(screen.getByPlaceholderText(/digite sua senha/i), 'senha-errada');
  userEvent.click(screen.getByRole('button', { name: /entrar/i }));

  expect(screen.getByText(/usuário ou senha incorretos/i)).toBeInTheDocument();
});
