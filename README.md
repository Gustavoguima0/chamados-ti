# Chamados TI

Sistema de abertura e gerenciamento de chamados de TI para ambiente hospitalar.

## Status
🚧 Em desenvolvimento

## Sobre o projeto

Este é um projeto pessoal de aprendizado, criado para praticar desenvolvimento full-stack do zero: **React** no front-end, **Node.js/Express** no back-end e **PostgreSQL** como banco de dados real (hospedado no [Neon](https://neon.tech)).

A ideia surgiu de um cenário real — a rotina de abertura de chamados de TI em um ambiente hospitalar (UPA), onde priorizar corretamente um problema por setor (ex: falta de rede na UTI é mais crítico que na recepção) faz diferença de verdade.

Ao longo do desenvolvimento, usei IA como ferramenta de apoio (pair programming), mas o foco sempre foi entender cada decisão tomada — desde por que separar "chamados abertos" e "histórico" numa única tabela do banco, até por que `node_modules` e arquivos `.env` nunca devem ir para o controle de versão. Erros de configuração (git, variáveis de ambiente, testes quebrados) foram debugados manualmente como parte do aprendizado.

## Tecnologias
**Frontend:** React, React Router, JavaScript, CSS  
**Backend:** Node.js, Express  
**Banco:** PostgreSQL (Neon)  
**Testes:** Jest, React Testing Library

## Funcionalidades

**Já implementado:**
- [x] Abertura de chamados com setor e problema
- [x] Prioridade automática por setor e tipo de problema
- [x] Painel do técnico com cards de chamados
- [x] Histórico de chamados com filtro por status
- [x] Persistência real em banco de dados PostgreSQL (API REST própria)
- [x] Login básico (ainda sem perfis reais nem sessão persistida)

**Pendente:**
- [ ] Autenticação real com JWT + hash de senha (bcrypt), com perfis técnico/usuário
- [ ] Deploy (frontend e backend)

## Como rodar localmente

Pré-requisitos: Node.js instalado e uma connection string de um banco PostgreSQL (ex: gratuito no [Neon](https://neon.tech)).

1. Clone o repositório e entre na pasta:
   ```
   git clone https://github.com/Gustavoguima0/chamados-ti.git
   cd chamados-ti
   ```

2. Configure o backend:
   ```
   cd backend
   npm install
   ```
   Crie um arquivo `.env` (baseado no `.env.example`) com sua `DATABASE_URL`.

   Rode o conteúdo de `schema.sql` no seu banco (ex: pelo SQL Editor do Neon) para criar a tabela `chamados`.

   ```
   npm start
   ```

3. Em outro terminal, configure o frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

4. Acesse `http://localhost:3000` no navegador. Login de teste: usuário `admin`, senha `1234`.

## O que eu aprendi construindo isso

- Por que `node_modules` e arquivos `.env` nunca devem ser commitados (e como remover algo já commitado por engano).
- Modelar uma tabela no Postgres pensando em evitar duplicação de dados, em vez de manter arrays separados no front-end.
- A diferença entre estado só em memória (`useState`) e persistência real via API + banco de dados.
- Fluxo de trabalho com Git: branches, Pull Requests e merge, em vez de commitar tudo direto na `main`.
