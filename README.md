# Lista de Tarefas

Aplicação web responsiva para gerenciamento de tarefas, desenvolvida com React, Vite e Tailwind CSS. O projeto permite criar, editar, concluir, excluir e filtrar tarefas, mantendo os dados salvos no navegador.

## Aplicação publicada

A lista de tarefas está disponível online e pode ser usada diretamente em:

https://to-do-list-green-delta.vercel.app/

## Funcionalidades

- Adicionar novas tarefas
- Validar tarefas vazias
- Marcar tarefas como concluídas ou pendentes
- Editar tarefas inline
- Editar com duplo clique no texto
- Salvar ou cancelar alterações
- Excluir tarefas individualmente
- Filtrar tarefas por:
  - Todas
  - Pendentes
  - Concluídas
- Remover todas as tarefas concluídas
- Exibir contador e percentual de progresso
- Persistir tarefas no `localStorage`
- Sincronizar alterações entre abas do navegador
- Interface responsiva
- Suporte à navegação por teclado
- Estados vazios com mensagens contextuais

## Tecnologias

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- JavaScript
- ESLint
- Prettier

## Requisitos

- Node.js `22.13.0` ou superior
- npm

A versão recomendada do Node.js está definida no arquivo `.nvmrc`.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/boosetudo/To-do-list.git
cd To-do-list
```

Instale as dependências:

```bash
npm install
```

## Desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

Depois, acesse a URL exibida no terminal, geralmente:

```text
http://localhost:5173
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão otimizada para produção |
| `npm run preview` | Visualiza localmente a build de produção |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run format` | Formata os arquivos com Prettier |
| `npm run format:check` | Verifica se os arquivos estão formatados |

## Build para produção

Gere os arquivos otimizados:

```bash
npm run build
```

Para visualizar a build localmente:

```bash
npm run preview
```

## Persistência dos dados

As tarefas são armazenadas no `localStorage` do navegador. Isso permite que os dados permaneçam disponíveis após recarregar ou fechar a página.

A aplicação também escuta alterações na chave de armazenamento para sincronizar tarefas entre abas abertas no mesmo navegador.

Os dados são armazenados na chave:

```text
to-do-list-useTasks
```

## Estrutura do projeto

```text
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src
    ├── App.jsx
    ├── Cabecalho.jsx
    ├── FiltrosTarefas.jsx
    ├── FormularioTarefa.jsx
    ├── ItemTarefas.jsx
    ├── ListaTarefas.jsx
    ├── useTasks.js
    ├── index.css
    ├── main.jsx
    └── utils
        └── taskStorage.js
```

### Principais arquivos

- `App.jsx`: componente principal e gerenciamento dos filtros.
- `useTasks.js`: estado, operações e persistência das tarefas.
- `FormularioTarefa.jsx`: criação e validação de tarefas.
- `ListaTarefas.jsx`: renderização da lista e dos estados vazios.
- `ItemTarefas.jsx`: conclusão, edição e exclusão de tarefas.
- `FiltrosTarefas.jsx`: filtros por status e limpeza de tarefas concluídas.
- `Cabecalho.jsx`: título, contador e barra de progresso.
- `index.css`: estilos globais, Tailwind CSS e animações.

## Como usar

1. Digite uma descrição no campo de texto.
2. Clique em **Adicionar**.
3. Clique no checkbox para concluir ou reabrir uma tarefa.
4. Clique no ícone de edição ou dê duplo clique no texto para editar.
5. Pressione `Enter` para salvar uma edição ou `Escape` para cancelá-la.
6. Use os filtros para visualizar tarefas por status.
7. Clique em **Limpar concluídas** para remover todas as tarefas finalizadas.

## Acessibilidade

A interface utiliza:

- Rótulos e descrições para controles interativos
- Estados `aria-checked`, `aria-pressed` e `aria-invalid`
- Região de progresso acessível
- Mensagens de estado com `aria-live`
- Indicadores visuais de foco
- Atalhos de teclado durante a edição

## Repositório

O código-fonte está disponível em:

https://github.com/boosetudo/To-do-list
