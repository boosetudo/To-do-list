import { useState } from 'react';

// Formulário responsável por capturar e validar o texto de novas tarefas:
export function FormularioTarefa({ aoAdicionar }) {
  // Estado local controlado para o texto digitado no campo:
  const [titulo, setTitulo] = useState('');
  // Controla a exibição de aviso caso o usuário tente enviar texto vazio:
  const [erro, setErro] = useState(false);

  // Trata o envio do formulário:
  function lidarComEnvio(evento) {
    evento.preventDefault();

    // Chama a função recebida via prop e verifica se o texto era válido:
    const adicionou = aoAdicionar(titulo);

    if (!adicionou) {
      setErro(true);
      return;
    }

    // Limpa o campo e remove qualquer aviso após criar a tarefa
    setTitulo('');
    setErro(false);
  }

  // Atualiza o texto digitado e limpa o estado de erro automaticamente
  function lidarComMudanca(evento) {
    setTitulo(evento.target.value);
    if (erro) setErro(false);
  }

  return (
    <form onSubmit={lidarComEnvio} className="mb-6" noValidate>
      <div className="flex
      flex-col
      gap-2.5
      sm:flex-row">
        {/* Campo de texto controlado */}
        <input
          type="text"
          value={titulo}
          onChange={lidarComMudanca}
          placeholder="O que você precisa fazer hoje?"
          aria-label="Título da nova tarefa"
          aria-invalid={erro}
          className={`flex-1 rounded-lg border
          bg-white px-4 py-2.5
          text-slate-800 shadow-xs
          transition-colors
          placeholder:text-slate-400 ${
            erro
              ? 'border-red-400 ' +
              'focus-visible:outline-red-500 '
              : 'border-slate-300 ' +
              'hover:border-slate-400'
          }`}
        />

        {/* Botão de submissão do formulário */}
        <button
          type="submit"
          className="cursor-pointer rounded-lg
          bg-indigo-600
          px-5
          py-2.5
          font-medium
          text-white
          shadow-xs
          transition-colors
          hover:bg-indigo-700
          active:bg-indigo-800"
        >
          Adicionar
        </button>
      </div>

      {/* Mensagem de feedback caso o usuário envie apenas espaços ou vazio */}
      {erro && (
        <p className="mt-1.5 text-xs font-medium
        text-red-600"
           role="alert">
          Digite uma descrição antes de adicionar a tarefa.
        </p>
      )}
    </form>
  );
}
