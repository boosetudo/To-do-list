import { useState, useRef, useEffect } from 'react';

// Representa um item individual da lista com ações de concluir e editar
export function ItemTarefa({ tarefa, aoAlternar, aoEditar, aoRemover }) {
  // Controla se o item está em modo de edição de texto
  const [estaEditando, setEstaEditando] = useState(false);
  // Armazena o texto temporário enquanto o usuário edita
  const [novoTitulo, setNovoTitulo] = useState(tarefa.titulo);
  // Indica tentativa de salvar um título vazio
  const [erroEdicao, setErroEdicao] = useState(false);

  const inputRef = useRef(null);

  // Foca automaticamente no campo ao ativar o modo de edição
  useEffect(() => {
    if (estaEditando && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [estaEditando]);

  // Ativa o modo de edição sincronizando o texto atual
  function iniciarEdicao() {
    setNovoTitulo(tarefa.titulo);
    setErroEdicao(false);
    setEstaEditando(true);
  }

  // Descarta alterações e volta para a visualização
  function cancelarEdicao() {
    setNovoTitulo(tarefa.titulo);
    setErroEdicao(false);
    setEstaEditando(false);
  }

  // Valida e salva o novo título da tarefa
  function salvarEdicao() {
    const salvou = aoEditar(tarefa.id, novoTitulo);

    if (!salvou) {
      setErroEdicao(true);
      inputRef.current?.focus();
      return;
    }

    setErroEdicao(false);
    setEstaEditando(false);
  }

  // Atalhos de teclado na edição (Enter salva, Escape cancela)
  function lidarComTecla(evento) {
    if (evento.key === 'Enter') {
      salvarEdicao();
    } else if (evento.key === 'Escape') {
      cancelarEdicao();
    }
  }

  return (
    <li
      className="animate-task-enter
      flex items-center
      justify-between gap-3
        rounded-xl border
        border-slate-200
        bg-white p-3.5
        shadow-xs
        transition-all
        hover:border-slate-300"
    >
      {estaEditando ? (
        /* Modo de edição inline */
        <div className="flex
        flex-1
        flex-col
        gap-2
        sm:flex-row
        sm:items-center">
          <input
            ref={inputRef}
            type="text"
            value={novoTitulo}
            onChange={(evento) => {
              setNovoTitulo(evento.target.value);
              if (erroEdicao) setErroEdicao(false);
            }}
            onKeyDown={lidarComTecla}
            aria-label="Editar título da tarefa"
            aria-invalid={erroEdicao}
            className={`flex-1 rounded-lg border 
            bg-slate-50 
            px-3 
            py-1.5
              text-sm 
              text-slate-800 
              transition-colors ${
              erroEdicao
                ? 'border-red-400 ' +
                'focus-visible:outline-red-500'
                : 'border-indigo-300 ' +
                'focus-visible:outline-indigo-600'
            }`}
          />

          <div className="flex items-center
          justify-end gap-1.5">
            <button
              type="button"
              onClick={salvarEdicao}
              className="cursor-pointer
              rounded-lg
              bg-indigo-600
              px-3 py-1.5
                text-xs font-medium
                text-white
                transition-colors
                hover:bg-indigo-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={cancelarEdicao}
              className="cursor-pointer
              rounded-lg border
              border-slate-300
                bg-white
                px-3
                py-1.5
                text-xs
                font-medium
                text-slate-600
                transition-colors
                hover:bg-slate-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        /* Modo de visualização padrão */
        <>
          <div className="flex
          min-w-0
          flex-1
          items-center
          gap-3">
            {/* Botão de marcação (concluída / pendente) */}
            <button
              type="button"
              role="checkbox"
              aria-checked={tarefa.concluida}
              aria-label={
                tarefa.concluida
                  ? `Marcar "${tarefa.titulo}" como pendente`
                  : `Marcar "${tarefa.titulo}" como concluída`
              }
              onClick={() => aoAlternar(tarefa.id)}
              className={`flex 
              h-5 
              w-5 
              shrink-0 
              cursor-pointer 
              items-center
                justify-center 
                rounded-md border 
                transition-colors ${
                tarefa.concluida
                  ? 'border-indigo-600 ' +
                  'bg-indigo-600 ' +
                  'text-white'
                  : 'border-slate-300 ' +
                  'bg-white ' +
                  'hover:border-indigo-500'
              }`}
            >
              {tarefa.concluida && (
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0
                    01-1.414 0l-3.5-3.5a1 1 0 011.414-1.42L8.5 12.086l6.79-6.796a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Texto da tarefa (clique duplo também ativa edição) */}
            <span
              onDoubleClick={iniciarEdicao}
              title="Clique duas vezes para editar"
              className={`cursor-pointer break-words text-sm sm:text-base ${
                tarefa.concluida
                  ? 'text-slate-400 ' +
                  'line-through'
                  : 'text-slate-800'
              }`}
            >
              {tarefa.titulo}
            </span>
          </div>

          {/* Botões de ação (Editar e Excluir) */}
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={iniciarEdicao}
              aria-label={`Editar tarefa "${tarefa.titulo}"`}
              title="Editar tarefa"
              className="cursor-pointer
              rounded-lg p-1.5
              text-slate-400
                transition-colors
                hover:bg-slate-100
                hover:text-indigo-600"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => aoRemover(tarefa.id)}
              aria-label={`Excluir tarefa "${tarefa.titulo}"`}
              title="Excluir tarefa"
              className="cursor-pointer
              rounded-lg p-1.5
              text-slate-400
                transition-colors
                hover:bg-red-50
                hover:text-red-600"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2
                   0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7
                   8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
