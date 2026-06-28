<template>
  <ion-tabs>
    <ion-router-outlet />

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="admin-dashboard" href="/admin/dashboard">
        <ion-icon :icon="gridOutline" />
        <ion-label>Dashboard</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="admin-produtos" href="/admin/produtos">
        <ion-icon :icon="cubeOutline" />
        <ion-label>Produtos</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="admin-estoque" href="/admin/estoque">
        <ion-icon :icon="archiveOutline" />
        <ion-label>Estoque</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="admin-financeiro" href="/admin/financeiro">
        <ion-icon :icon="cashOutline" />
        <ion-label>Financeiro</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="admin-configuracoes" href="/admin/configuracoes">
        <ion-icon :icon="settingsOutline" />
        <ion-label>Ajustes</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/vue';
import {
  archiveOutline,
  cashOutline,
  cubeOutline,
  gridOutline,
  settingsOutline
} from 'ionicons/icons';
</script>
