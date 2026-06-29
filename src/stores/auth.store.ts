import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "@/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!session.value);
  const userId = computed(() => user.value?.id ?? null);
  const userEmail = computed(() => user.value?.email ?? null);

  // Inicializa sessão ao carregar o app
  async function init() {
    const { data } = await supabase.auth.getSession();
    session.value = data.session;
    user.value = data.session?.user ?? null;

    // Ouve mudanças de sessão em tempo real
    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession;
      user.value = newSession?.user ?? null;
    });
  }

  // Login
  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) throw err;
      session.value = data.session;
      user.value = data.user;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Logout
  async function logout() {
    loading.value = true;
    error.value = null;
    try {
      const { error: err } = await supabase.auth.signOut();
      if (err) throw err;
      session.value = null;
      user.value = null;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Recuperar senha
  async function forgotPassword(email: string) {
    loading.value = true;
    error.value = null;
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email);
      if (err) throw err;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    // State
    user,
    session,
    loading,
    error,
    // Getters
    isAuthenticated,
    userId,
    userEmail,
    // Actions
    init,
    login,
    logout,
    forgotPassword,
  };
});
