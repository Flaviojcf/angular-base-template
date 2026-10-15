# Angular Base Template

Base Angular reutilizável com Tailwind CSS, PrimeNG, ESLint, Prettier, Husky,
lint-staged e Vitest.

## Stack

- Angular 22.2
- Tailwind CSS 4
- PrimeNG 22
- ESLint flat config com angular-eslint
- Prettier com prettier-plugin-tailwindcss
- Husky + lint-staged
- Vitest via Angular CLI
- Playwright com axe-core para testes end-to-end e de acessibilidade

## Requisitos

- Node.js 24 LTS (`24.22.0` ou superior dentro da linha 24)
- npm `12.2.0`

Os arquivos `.nvmrc` e `.node-version` fixam o Node.js usado no desenvolvimento e
no CI. O workflow do GitHub Actions instala as dependências com `npm ci` e executa
`npm run verify` em cada pull request e push na `main`.

O TypeScript permanece na linha 6.0, compatível com Angular 22.2. O Vitest permanece
na linha 4.1; a migração para a versão 5 deve ser avaliada separadamente.

## Licença do PrimeNG

O PrimeNG 22 usa a licença PrimeUI Community ou Commercial. Este template não
versiona uma chave de licença. Cada projeto criado a partir dele deve obter a
licença adequada e configurar sua própria chave no `providePrimeNG` seguindo a
[documentação oficial](https://primeng.dev/configuration).

A licença Community exige elegibilidade, registro e renovação anual. Consulte os
[termos da licença Community](https://primeui.dev/licenses/community) antes de usar
o template em um projeto.

## Como Usar

Crie um novo repositório a partir deste template e ajuste:

- `package.json`: `name`
- `angular.json`: nome do projeto e `prefix`
- `eslint.config.js`: prefixos dos selectors Angular
- `src/app/app.constants.ts`: `APP_TITLE`, usado no cabeçalho e no título da aba
- `src/index.html`: `title` inicial e selector root
- `src/app/app.ts`: selector root

Depois rode:

```bash
npm ci
npm run verify
```

## Scripts

```bash
npm start
npm run build
npm run test:ci
npm run e2e
npm run lint
npm run format:check
npm run verify
```

## Estrutura

```text
src/app/core       # serviços globais, como tratamento de erros e notificações
src/app/features   # páginas carregadas sob demanda pelas rotas
src/app/shared     # componentes, pipes e diretivas reutilizáveis
```

O `AppComponent` contém apenas o toast e o `router-outlet`. Cada página fica em
`src/app/features` e entra nas rotas com `loadComponent`, para não aumentar o
bundle inicial. O Angular e o PrimeNG com o tema Aura já ocupam cerca de 560 kB,
por isso o aviso de orçamento do bundle inicial fica em 750 kB e o erro em 1 MB.

Erros HTTP mostram um toast com a mensagem do status e continuam disponíveis para
quem fez a chamada; o `GlobalErrorHandlerService` registra os demais erros e não
repete o aviso de erros HTTP.

Aliases TypeScript configurados:

- `@app/*`
- `@core/*`
- `@features/*`
- `@shared/*`

## Testes end-to-end

Os testes end-to-end ficam em `e2e/` com o sufixo `.e2e.ts` e usam Playwright.
Localmente, o Playwright sobe o `ng serve`; para testar outro endereço, como uma
imagem já em execução, defina `E2E_BASE_URL`. Antes da primeira execução, instale
o navegador:

```bash
npx playwright install chromium
npm run e2e
```

Toda página nova deve ganhar testes end-to-end, incluindo a verificação de
acessibilidade com `AxeBuilder`. O CI falha quando não existe nenhum teste em `e2e/`.
