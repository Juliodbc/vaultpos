import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/supabase/client'
import { useAuthStore } from './auth.store'
import type { CargoUsuario } from '@/types/database.types'

interface UsuarioLogado {
  id: string
  empresa_id: string
  nome: string
  email: string
  telefone: string | null
  cargo: CargoUsuario
  foto: string | null
  ativo: boolean
}

export const useUserStore = defineStore('user', () => {
  // State
  const usuario = ref<UsuarioLogado | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAdmin = computed(() => usuario.value?.cargo === 'admin')
  const isGarcom = computed(() => usuario.value?.cargo === 'garcom')
  const empresaId = computed(() => usuario.value?.empresa_id ?? null)
  const nomeUsuario = computed(() => usuario.value?.nome ?? '')

  // Busca os dados do usuário logado na tabela usuarios
  async function fetchUsuarioLogado() {
    const authStore = useAuthStore()
    if (!authStore.userId) return

    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', authStore.userEmail)
        .single()

      if (err) throw err
      usuario.value = data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Atualiza perfil do usuário logado
  async function updatePerfil(updates: Partial<{
    nome: string
    telefone: string
    foto: string
  }>) {
    if (!usuario.value) return

    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('usuarios')
        .update(updates)
        .eq('id', usuario.value.id)
        .select()
        .single()

      if (err) throw err
      usuario.value = { ...usuario.value, ...data }
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Limpa ao fazer logout
  function clear() {
    usuario.value = null
    error.value = null
  }

  return {
    // State
    usuario,
    loading,
    error,
    // Getters
    isAdmin,
    isGarcom,
    empresaId,
    nomeUsuario,
    // Actions
    fetchUsuarioLogado,
    updatePerfil,
    clear,
  }
})