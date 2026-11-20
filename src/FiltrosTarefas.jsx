// Lista de opções disponíveis para filtrar a exibição das tarefas
const OPCOES_FILTRO = [
  { id: 'todas',
    rotulo: 'Todas' },
  { id: 'pendentes',
    rotulo: 'Pendentes' },
  { id: 'concluidas',
    rotulo: 'Concluídas' },
];

// Barra com botões de filtro por status e ação de limpar concluídas
export function FiltrosTarefa({
                                filtroAtual,
                                aoMudarFiltro,
                                aoLimparConcluidas,
                                tarefasConcluidas,
                              }) {
  return (
    <div
      className="mb-4
      flex flex-col
      gap-3 border-b
      border-slate-200
      pb-4
        sm:flex-row
        sm:items-center
        sm:justify-between"
    >
      {/* Grupo de botões de filtro por status */}
      <div
        className="inline-flex
        rounded-lg
        bg-slate-200/70
        p-1"
        role="group"
        aria-label="Filtrar tarefas por status"
      >
        {OPCOES_FILTRO.map((opcao) => {
          const ativo = filtroAtual === opcao.id;

          return (
            <button
              key={opcao.id}
              type="button"
              onClick={() => aoMudarFiltro(opcao.id)}
              aria-pressed={ativo}
              className={`flex-1 
              cursor-pointer 
              rounded-md 
              px-3 
              py-1.5 
              text-sm
                font-medium 
                transition-all 
                sm:flex-initial ${
                ativo
                  ? 'bg-white ' +
                  'text-indigo-600 ' +
                  'shadow-xs'
                  : 'text-slate-600 ' +
                  'hover:text-slate-900'
              }`}
            >
              {opcao.rotulo}
            </button>
          );
        })}
      </div>

      {/* Botão para remover de uma vez todas as tarefas concluídas */}
      <button
        type="button"
        onClick={aoLimparConcluidas}
        disabled={tarefasConcluidas === 0}
        className="cursor-pointer
        self-end
        text-sm font-medium
        text-slate-500
          transition-colors
          hover:text-red-600
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:text-slate-500
          sm:self-auto"
      >
        Limpar concluídas ({tarefasConcluidas})
      </button>
    </div>
  );
}
