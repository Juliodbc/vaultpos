import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import TabsAdmin from '../views/TabsAdmin.vue';
import TabsGarcom from '../views/TabsGarcom.vue';
import LoginPage from '../pages/auth/LoginPage.vue';
import RegisterPage from '../pages/auth/RegisterPage.vue';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.vue';
import DashboardAdmin from '../pages/admin/DashboardAdmin.vue';
import EmpresaPage from '../pages/admin/EmpresaPage.vue';
import EstoqueAdminPage from '../pages/admin/EstoquePage.vue';
import FinanceiroPage from '../pages/admin/FinanceiroPage.vue';
import ProdutosPage from '../pages/admin/ProdutosPage.vue';
import RelatoriosPage from '../pages/admin/RelatoriosPage.vue';
import UsuariosPage from '../pages/admin/UsuariosPage.vue';
import ConfiguracoesPage from '../pages/admin/ConfiguracoesPage.vue';
import DashboardGarcom from '../pages/garcom/DashboardGarcom.vue';
import ComandasPage from '../pages/garcom/ComandasPage.vue';
import ComandaDetalhesPage from '../pages/garcom/ComandaDetalhesPage.vue';
import NovaComandaPage from '../pages/garcom/NovaComandaPage.vue';
import PagamentosPage from '../pages/garcom/PagamentosPage.vue';
import EstoqueGarcomPage from '../pages/garcom/EstoquePage.vue';
import PerfilPage from '../pages/garcom/PerfilPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage
  },
  {
    path: '/admin',
    component: TabsAdmin,
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: DashboardAdmin
      },
      {
        path: 'empresa',
        name: 'AdminEmpresa',
        component: EmpresaPage
      },
      {
        path: 'estoque',
        name: 'AdminEstoque',
        component: EstoqueAdminPage
      },
      {
        path: 'financeiro',
        name: 'AdminFinanceiro',
        component: FinanceiroPage
      },
      {
        path: 'produtos',
        name: 'AdminProdutos',
        component: ProdutosPage
      },
      {
        path: 'relatorios',
        name: 'AdminRelatorios',
        component: RelatoriosPage
      },
      {
        path: 'usuarios',
        name: 'AdminUsuarios',
        component: UsuariosPage
      },
      {
        path: 'configuracoes',
        name: 'AdminConfiguracoes',
        component: ConfiguracoesPage
      }
    ]
  },
  {
    path: '/garcom',
    component: TabsGarcom,
    children: [
      {
        path: '',
        redirect: '/garcom/dashboard'
      },
      {
        path: 'dashboard',
        name: 'GarcomDashboard',
        component: DashboardGarcom
      },
      {
        path: 'comandas',
        name: 'GarcomComandas',
        component: ComandasPage
      },
      {
        path: 'comandas/nova',
        name: 'GarcomNovaComanda',
        component: NovaComandaPage
      },
      {
        path: 'comandas/:id',
        name: 'GarcomComandaDetalhes',
        component: ComandaDetalhesPage
      },
      {
        path: 'pagamentos',
        name: 'GarcomPagamentos',
        component: PagamentosPage
      },
      {
        path: 'estoque',
        name: 'GarcomEstoque',
        component: EstoqueGarcomPage
      },
      {
        path: 'perfil',
        name: 'GarcomPerfil',
        component: PerfilPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
