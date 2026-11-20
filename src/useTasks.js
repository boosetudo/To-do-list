import { useState, useEffect } from 'react'

// Chave única usada para salvar e ler as tarefas no localStorage
const CHAVE_ARMAZENAMENTO = 'to-do-list-useTasks'

// Gera um identificador único com fallback para redes sem HTTPS
function gerarId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Lê as tarefas salvas no navegador de forma segura ao iniciar
function carregarTarefasIniciais() {
  try {
    const tarefasSalvas = localStorage.getItem(CHAVE_ARMAZENAMENTO)
    if (!tarefasSalvas) return []

    const dadosConvertidos = JSON.parse(tarefasSalvas)
    return Array.isArray(dadosConvertidos) ? dadosConvertidos : []
  } catch (erro) {
    console.error('Erro ao carregar tarefas do localStorage:', erro)
    return []
  }
}

// Salva a lista de tarefas no localStorage com tratamento de erro
function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(tarefas))
  } catch (erro) {
    console.error('Erro ao salvar tarefas no localStorage:', erro)
  }
}

export function useTarefas() {
  // Inicializa o estado a partir do localStorage na montagem
  const [tarefas, setTarefas] = useState(carregarTarefasIniciais)

  // Salva automaticamente no localStorage sempre que a lista mudar
  useEffect(() => {
    salvarTarefas(tarefas)
  }, [tarefas])

  // Sincroniza alterações em tempo real entre abas abertas
  useEffect(() => {
    function sincronizarAbas(evento) {
      // Ignora alterações de outras chaves no armazenamento
      if (evento.key !== CHAVE_ARMAZENAMENTO) return

      try {
        const tarefasAtualizadas = evento.newValue ? JSON.parse(evento.newValue) : []
        setTarefas(Array.isArray(tarefasAtualizadas) ? tarefasAtualizadas : [])
      } catch (erro) {
        console.error('Erro ao sincronizar abas:', erro)
      }
    }

    window.addEventListener('storage', sincronizarAbas)

    // Remove o ouvinte ao desmontar para evitar vazamento de memória
    return () => window.removeEventListener('storage', sincronizarAbas)
  }, [])

  // Adiciona uma nova tarefa no topo da lista após validar o texto
  function adicionarTarefa(titulo) {
    const tituloLimpo = titulo.trim()
    if (!tituloLimpo) return false

    const novaTarefa = {
      id: gerarId(),
      titulo: tituloLimpo,
      concluida: false,
    }

    setTarefas((tarefasAnteriores) => [novaTarefa, ...tarefasAnteriores])
    return true
  }

  // Alterna o status de conclusão:
  function alternarTarefa(id) {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    )
  }

  // Atualiza o título de uma tarefa existente se o texto for válido
  function editarTarefa(id, novoTitulo) {
    const tituloLimpo = novoTitulo.trim()
    if (!tituloLimpo) return false

    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, titulo: tituloLimpo } : tarefa,
      ),
    )
    return true
  }

  // Remove uma única tarefa pelo seu ID
  function removerTarefa(id) {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.filter((tarefa) => tarefa.id !== id),
    )
  }

  // Remove em lote todas as tarefas marcadas como concluídas
  function limparConcluidas() {
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.filter((tarefa) => !tarefa.concluida),
    )
  }

  // Métricas derivadas calculadas na renderização (sem estado extra)
  const totalTarefas = tarefas.length
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length

  return {
    tarefas,
    totalTarefas,
    tarefasConcluidas,
    adicionarTarefa,
    alternarTarefa,
    editarTarefa,
    removerTarefa,
    limparConcluidas,
  }
}
