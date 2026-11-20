import { ItemTarefa } from './ItemTarefas';

// Mensagens exibidas quando não há tarefas visíveis na lista
const MENSAGENS_VAZIAS = {
  todas: {
    titulo: 'Nenhuma tarefa por aqui ainda',
    descricao: 'Adicione sua primeira tarefa acima para começar o dia.',
  },
  pendentes: {
    titulo: 'Tudo em dia!',
    descricao: 'Você não possui nenhuma tarefa pendente no momento.',
  },
  concluidas: {
    titulo: 'Nenhuma tarefa concluída',
    descricao: 'Marque suas tarefas realizadas para acompanhá-las aqui.',
  },
};

// Renderiza a lista de tarefas filtradas ou um estado vazio
export function ListaTarefas({
                               tarefas,
                               totalTarefas,
                               filtroAtual,
                               aoAlternar,
                               aoEditar,
                               aoRemover,
                             }) {
  // Exibe mensagem contextual quando a lista visível estiver vazia
  if (tarefas.length === 0) {
    const chaveMensagem = totalTarefas === 0 ? 'todas' : filtroAtual;
    const mensagem = MENSAGENS_VAZIAS[chaveMensagem] || MENSAGENS_VAZIAS.todas;

    return (
      <div
        className="rounded-xl
        border border-dashed
        border-slate-300
        bg-white/60
          px-6
          py-10
          text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-base
        font-semibold
        text-slate-700">
          {mensagem.titulo}
        </p>
        <p className="mt-1
        text-sm
        text-slate-500">{mensagem.descricao}</p>
      </div>
    );
  }

  return (
    <ul className="flex
    flex-col
    gap-2.5"
        aria-label="Lista de tarefas">
      {tarefas.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          tarefa={tarefa}
          aoAlternar={aoAlternar}
          aoEditar={aoEditar}
          aoRemover={aoRemover}
        />
      ))}
    </ul>
  );
}
