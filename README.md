# Angular Base Template

Base Angular reutilizavel com Tailwind CSS, PrimeNG, ESLint, Prettier, Husky,
lint-staged e Vitest.

## Stack

- Angular 22
- Tailwind CSS 4
- PrimeNG 22
- ESLint flat config com angular-eslint
- Prettier com prettier-plugin-tailwindcss
- Husky + lint-staged
- Vitest via Angular CLI

## Requisitos

- Node.js `^22.22.3`, `^24.15.0` ou `^26.0.0`
- npm `12.0.2`

## Licenca do PrimeNG

O PrimeNG 22 usa a licenca PrimeUI Community ou Commercial. Este template nao
versiona uma chave de licenca. Cada projeto criado a partir dele deve obter a
licenca adequada e configurar sua propria chave no `providePrimeNG` seguindo a
[documentacao oficial](https://primeng.dev/configuration).

A licenca Community exige elegibilidade, registro e renovacao anual. Consulte os
[termos da licenca Community](https://primeui.dev/licenses/community) antes de usar
o template em um projeto.

## Como Usar

Crie um novo repositorio a partir deste template e ajuste:

- `package.json`: `name`
- `angular.json`: nome do projeto e `prefix`
- `eslint.config.js`: prefixos dos selectors Angular
- `src/index.html`: `title` e selector root
- `src/app/app.ts`: selector root e titulo

Depois rode:

```bash
npm install
npm run verify
```

## Scripts

```bash
npm start
npm run build
npm run test:ci
npm run lint
npm run format:check
npm run verify
```

## Estrutura

```text
src/app/core
src/app/features
src/app/shared
```

Aliases TypeScript configurados:

- `@app/*`
- `@core/*`
- `@features/*`
- `@shared/*`
