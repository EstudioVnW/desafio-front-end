# Desafio Técnico - Desenvolvedor(a) Front-End

Bem-vindo ao desafio técnico para a vaga de **Desenvolvedor(a) Front-End Jr.**!

Este repositório contém o projeto de uma mini Rede Social de Fotos, desenvolvida para o desafio proposto. O objetivo é consumir a [API do Unsplash](https://unsplash.com/developers) utilizando **Next.js**, **Tailwind CSS** e **Typescript**.

---

## 🥅 Objetivo

Criar uma Rede Social de Fotos com as seguintes funcionalidades:

1. **Exibir um grid de fotos aleatórias** (como um feed).
2. **Permitir buscas** por termos (natureza, animais, etc.).
3. **Exibir detalhes da foto em um modal** (autor, descrição, link).
4. **Favoritar/desfavoritar fotos**, usando localStorage.

---

## 🧩 Requisitos Básicos

- Exibir um grid de fotos aleatórias (mínimo 12) ao carregar a página.
- Cada foto mostra:
  - Imagem em alta (com lazy loading)
  - Nome do autor (photographer)
- Barra de pesquisa para buscar fotos por termos.
- Modal de detalhes:
  - Imagem em alta qualidade
  - Nome do autor
  - Descrição (se disponível)
  - Link para o perfil do autor no Unsplash
- Sistema de favoritos:
  - Adicionar/remover favoritos (ícone de coração)
  - Persistir favoritos com localStorage

---

## 💻 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Unsplash API](https://unsplash.com/developers)

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**
  
 [https://github.com/seuusuario/seurepo.git](https://github.com/seuusuario/seurepo.git)
  cd seurepo
2. Instale as dependências:

npm install
3. Configure a chave da API do Unsplash:
Crie um arquivo .env.local na raiz do projeto e adicione sua chave:

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=sua_chave_aqui
4. Execute o projeto:

npm run dev
5. Acesse: [http://localhost:3000](http://localhost:3000)
