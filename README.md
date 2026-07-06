🔗 **[Acesse o projeto no ar](https://chamados-ti-teal.vercel.app)**

> ⏱️ O backend roda no plano gratuito do Render e hiberna após inatividade — o primeiro login pode levar até 1 minuto enquanto o servidor acorda.

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
**Autenticação:** JWT (jsonwebtoken) + bcrypt  
**Testes:** Jest, React Testing Library

## Funcionalidades

**Já implementado:**
- [x] Abertura de chamados com setor e problema
- [x] Prioridade automática por setor e tipo de problema
- [x] Painel do técnico com cards de chamados
- [x] Histórico de chamados com filtro por status
- [x] Persistência real em banco de dados PostgreSQL (API REST própria)
- [x] Autenticação real com JWT + hash de senha (bcrypt)
- [x] Rotas da API protegidas por middleware de autenticação
- [x] Sessão persistente (o login sobrevive ao recarregamento da página)
- [x] Deploy (frontend na Vercel, backend no Render, banco no Neon)



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

   Crie um arquivo `.env` (baseado no `.env.example`) com sua `DATABASE_URL` e um `JWT_SECRET` (qualquer string longa e aleatória).

   Rode o conteúdo de `schema.sql` no seu banco (ex: pelo SQL Editor do Neon) para criar as tabelas `chamados` e `usuarios`.

   Gere o hash da senha do primeiro usuário:

   ```
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('SUA-SENHA', 10).then(h => console.log(h));"
   ```

   Insira o usuário no banco (SQL Editor do Neon), usando o hash gerado:

   ```
   INSERT INTO usuarios (nome_usuario, senha_hash, perfil)
   VALUES ('seu-usuario', 'hash-gerado-acima', 'tecnico');
   ```

   E suba o servidor:

   ```
   npm start
   ```

3. Em outro terminal, configure o frontend:

   ```
   cd frontend
   npm install
   npm start
   ```

4. Acesse `http://localhost:3000` no navegador e entre com o usuário que você cadastrou.

## O que eu aprendi construindo isso

- Por que `node_modules` e arquivos `.env` nunca devem ser commitados (e como remover algo já commitado por engano).
- Modelar uma tabela no Postgres pensando em evitar duplicação de dados, em vez de manter arrays separados no front-end.
- A diferença entre estado só em memória (`useState`) e persistência real via API + banco de dados.
- Autenticação de verdade: hash de senha com bcrypt (nunca senha em texto puro), tokens JWT assinados e middleware protegendo rotas — e por que validar no front-end não substitui validar no back-end (qualquer um pode chamar a API por fora do site).
- Fluxo de trabalho com Git: branches, Pull Requests e merge, em vez de commitar tudo direto na `main`.