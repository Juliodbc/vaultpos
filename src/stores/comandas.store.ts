import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.store'
import {
  getComandas,
  getComandaById,
  createComanda,
  addItemComanda,
  removeItemComanda,
  updateItemQuantidade,
  fecharComanda,
  cancelarComanda,
} from '@/supabase/queries/comandas'

export const useComandasStore = defineStore('comandas', () => {
  // State
  const comandas = ref<any[]>([])
  const comandaAtiva = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const comandasAbertas = computed(() =>
    comandas.value.filter(c => c.status === 'aberta')
  )
  const comandasFechadas = computed(() =>
    comandas.value.filter(c => c.status === 'fechada')
  )
  const totalComandasAbertas = computed(() => comandasAbertas.value.length)

  // Buscar todas as comandas
  async function fetchComandas(status?: 'aberta' | 'fechada' | 'cancelada') {
    const userStore = useUserStore()
    if (!userStore.empresaId) return

    loading.value = true
    error.value = null
    try {
      comandas.value = await getComandas(userStore.empresaId, status)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Buscar comanda específica com itens
  async function fetchComandaById(id: string) {
    loading.value = true
    error.value = null
    try {
      comandaAtiva.value = await getComandaById(id)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Abrir nova comanda
  async function abrirComanda(dados: {
    mesa?: number
    cliente_id?: string
    observacoes?: string
  }) {
    const userStore = useUserStore()
    if (!userStore.empresaId || !userStore.usuario) return

    loading.value = true
    error.value = null
    try {
      const novaComanda = await createComanda({
        empresa_id: userStore.empresaId,
        garcom_id: userStore.usuario.id,
        ...dados,
      })
      comandas.value.unshift(novaComanda)
      return novaComanda
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Adicionar item na comanda ativa
  async function adicionarItem(item: {
    produto_id: string
    quantidade: number
    valor_unitario: number
  }) {
    if (!comandaAtiva.value) return

    loading.value = true
    error.value = null
    try {
      await addItemComanda({ comanda_id: comandaAtiva.value.id, ...item })
      await fetchComandaById(comandaAtiva.value.id) // recarrega com totais atualizados
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Remover item da comanda ativa
  async function removerItem(itemId: string) {
    if (!comandaAtiva.value) return

    loading.value = true
    error.value = null
    try {
      await removeItemComanda(itemId, comandaAtiva.value.id)
      await fetchComandaById(comandaAtiva.value.id)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Atualizar quantidade de item
  async function atualizarQuantidade(itemId: string, quantidade: number, valorUnitario: number) {
    if (!comandaAtiva.value) return

    loading.value = true
    error.value = null
    try {
      await updateItemQuantidade(itemId, comandaAtiva.value.id, quantidade, valorUnitario)
      await fetchComandaById(comandaAtiva.value.id)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fechar comanda
  async function fechar(id: string, desconto = 0) {
    loading.value = true
    error.value = null
    try {
      await fecharComanda(id, desconto)
      await fetchComandas()
      comandaAtiva.value = null
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cancelar comanda
  async function cancelar(id: string) {
    loading.value = true
    error.value = null
    try {
      await cancelarComanda(id)
      await fetchComandas()
      comandaAtiva.value = null
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    comandas,
    comandaAtiva,
    loading,
    error,
    // Getters
    comandasAbertas,
    comandasFechadas,
    totalComandasAbertas,
    // Actions
    fetchComandas,
    fetchComandaById,
    abrirComanda,
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    fechar,
    cancelar,
  }
})