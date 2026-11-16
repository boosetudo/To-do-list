// Chave utilizada para identificar os dados das tarefas no localStorage.
const CHAVE_ARMAZENAMENTO = 'to-do-list-tasks'

/**
 * Recupera as tarefas armazenadas no navegador.
 * Caso não existam tarefas ou ocorra algum erro, retorna uma lista vazia.
 */
export function getTasks() {
  try {
    const storedTasks = localStorage.getItem(CHAVE_ARMAZENAMENTO);

    // Se não houver dados armazenados, retorna um array vazio.
    if (!storedTasks) {
      return [];
    }

    const tasks = JSON.parse(storedTasks);

    // Verifica se o conteúdo recuperado é realmente um array.
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error('Erro ao recuperar as tarefas:', error);
    return [];
  }
}
