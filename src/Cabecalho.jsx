// Exibe o título da aplicação e o resumo de progresso das tarefas
export function Cabecalho({ totalTarefas, tarefasConcluidas }) {
  // Calcula o percentual de conclusão:
  const percentual =
    totalTarefas > 0
      ? Math.round((tarefasConcluidas / totalTarefas) * 100)
      : 0;

  return (
    <header className="mb-6">
      {/* Linha superior com título e contador numérico */}
      <div className="flex
      flex-col gap-3
      sm:flex-row
      sm:items-center
      sm:justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
            愚公移山 Variedades
          </span>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Minhas Tarefas
          </h1>
        </div>

        {/* Indicador numérico de progresso (concluídas de total) */}
        <div className="inline-flex items-center
          gap-2
          self-start
          rounded-full
          bg-indigo-50
          px-3.5 py-1.5
          text-sm font-medium
          text-indigo-700
          sm:self-auto">
          <span>Concluídas:</span>
          <span className="font-bold">
            {tarefasConcluidas} de {totalTarefas}
          </span>
          <span className="text-xs
          text-indigo-500">({percentual}%)</span>
        </div>
      </div>

      {/* Barra visual de progresso */}
      <div
        className="mt-4
        h-2
        w-full
        overflow-hidden
        rounded-full
        bg-slate-200"
        role="progressbar"
        aria-valuenow={percentual}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso geral das tarefas"
      >
        <div
          className="h-full
          bg-indigo-600
          transition-all
          duration-300
          ease-out"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </header>
  );
}
