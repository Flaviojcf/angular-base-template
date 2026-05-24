# Angular Base Template

Base Angular reutilizavel com Tailwind CSS, PrimeNG, ESLint, Prettier, Husky,
lint-staged e Vitest.

## Stack

- Angular 21
- Tailwind CSS 4
- PrimeNG 21
- ESLint flat config com angular-eslint
- Prettier com prettier-plugin-tailwindcss
- Husky + lint-staged
- Vitest via Angular CLI

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
