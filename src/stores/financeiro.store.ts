import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.store'
import { getPagamentos, createPagamento } from '@/supabase/queries/pagamentos'

export const useFinanceiroStore = defineStore('financeiro', () => {
  // State
  const pagamentos = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const totalRecebido = computed(() =>
    pagamentos.value
      .filter(p => p.status === 'pago')
      .reduce((acc, p) => acc + p.valor, 0)
  )
  const totalPix = computed(() =>
    pagamentos.value
      .filter(p => p.status === 'pago' && p.metodo === 'pix')
      .reduce((acc, p) => acc + p.valor, 0)
  )
  const totalCartao = computed(() =>
    pagamentos.value
      .filter(p => p.status === 'pago' && p.metodo === 'cartao')
      .reduce((acc, p) => acc + p.valor, 0)
  )
  const totalDinheiro = computed(() =>
    pagamentos.value
      .filter(p => p.status === 'pago' && p.metodo === 'dinheiro')
      .reduce((acc, p) => acc + p.valor, 0)
  )

  // Buscar pagamentos
  async function fetchPagamentos() {
    const userStore = useUserStore()
    if (!userStore.empresaId) return

    loading.value = true
    error.value = null
    try {
      pagamentos.value = await getPagamentos(userStore.empresaId)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Registrar pagamento
  async function registrarPagamento(dados: {
    comanda_id: string
    metodo: 'pix' | 'cartao' | 'dinheiro'
    valor: number
  }) {
    const userStore = useUserStore()
    if (!userStore.empresaId || !userStore.usuario) return

    loading.value = true
    error.value = null
    try {
      const pagamento = await createPagamento({
        empresa_id: userStore.empresaId,
        recebido_por: userStore.usuario.id,
        ...dados,
      })
      pagamentos.value.unshift(pagamento)
      return pagamento
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    pagamentos,
    loading,
    error,
    // Getters
    totalRecebido,
    totalPix,
    totalCartao,
    totalDinheiro,
    // Actions
    fetchPagamentos,
    registrarPagamento,
  }
})