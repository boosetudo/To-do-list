import { useState } from 'react'
import { useTarefas } from './useTasks.js'
import { Cabecalho } from './Cabecalho.jsx'
import { FormularioTarefa } from './FormularioTarefa.jsx'
import { FiltrosTarefa } from './FiltrosTarefas.jsx'
import { ListaTarefas } from './ListaTarefas.jsx'

export function App() {
  // Estado que controla o filtro de visualização ativo na tela
  const [filtroAtual, setFiltroAtual] = useState('todas')

  // Obtém os dados e ações do hook personalizado de tarefas
  const {
    tarefas,
    totalTarefas,
    tarefasConcluidas,
    adicionarTarefa,
    alternarTarefa,
    editarTarefa,
    removerTarefa,
    limparConcluidas,
  } = useTarefas()

  // Filtra as tarefas exibidas de acordo com a aba selecionada
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtual === 'pendentes') return !tarefa.concluida
    if (filtroAtual === 'concluidas') return tarefa.concluida
    return true
  })

  return (
    <div className="min-h-screen
    px-4
    py-8
    sm:py-12">
      <main className="mx-auto w-full max-w-2xl">
        {/* Cabeçalho com título e barra de progresso */}
        <Cabecalho totalTarefas={totalTarefas} tarefasConcluidas={tarefasConcluidas} />

        {/* Formulário para criação de novas tarefas */}
        <FormularioTarefa aoAdicionar={adicionarTarefa} />

        {/* Barra de filtros por status e botão de limpar concluídas */}
        <FiltrosTarefa
          filtroAtual={filtroAtual}
          aoMudarFiltro={setFiltroAtual}
          aoLimparConcluidas={limparConcluidas}
          tarefasConcluidas={tarefasConcluidas}
        />

        {/* Lista de tarefas filtradas ou mensagem de estado vazio */}
        <ListaTarefas
          tarefas={tarefasFiltradas}
          totalTarefas={totalTarefas}
          filtroAtual={filtroAtual}
          aoAlternar={alternarTarefa}
          aoEditar={editarTarefa}
          aoRemover={removerTarefa}
        />

        {/* Rodapé discreto com dica de interação */}
        <footer className="mt-8
        text-center text-xs
        text-slate-400">
          Dica: clique duas vezes no texto de uma tarefa para editá-la.
          <a
            href="https://github.com/boosetudo/To-do-list"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block underline underline-offset-2 transition-colors hover:text-slate-600"
          >
            Ver repositório no GitHub
          </a>
        </footer>
      </main>
    </div>
  )
}

export default App
