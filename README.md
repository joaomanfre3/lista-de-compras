# 🛒 Lista de Compras

Sua lista de compras de supermercado, organizada por corredor. Marque o que já pegou, ajuste as quantidades e não esqueça nada — tudo salvo no navegador, offline e sem cadastro.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)

## O que faz

- **Adicionar itens** com a categoria do corredor (Hortifruti, Padaria, Açougue...)
- **Quantidade** ajustável em cada item
- **Marcar como pego** — o item risca e desce pro fim do grupo
- **Agrupado por corredor**, na ordem de um percurso típico de mercado
- **Barra de progresso** do carrinho
- **Limpar os itens já pegos** de uma vez
- **Salva sozinho** no navegador — sua lista continua lá
- 100% **responsivo** e **offline**

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide. Sem banco — a lista fica no `localStorage`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Deploy

Pronto pra Vercel — importe o repositório, build padrão (`next build`), zero variáveis de ambiente.

---

Feito por [@joaomanfre3](https://github.com/joaomanfre3).
