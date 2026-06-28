<template>
  <ion-tabs>
    <ion-router-outlet />

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="garcom-dashboard" href="/garcom/dashboard">
        <ion-icon :icon="gridOutline" />
        <ion-label>Dashboard</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="garcom-comandas" href="/garcom/comandas">
        <ion-icon :icon="receiptOutline" />
        <ion-label>Comandas</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="garcom-pagamentos" href="/garcom/pagamentos">
        <ion-icon :icon="cardOutline" />
        <ion-label>Pagamentos</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="garcom-estoque" href="/garcom/estoque">
        <ion-icon :icon="archiveOutline" />
        <ion-label>Estoque</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="garcom-perfil" href="/garcom/perfil">
        <ion-icon :icon="personCircleOutline" />
        <ion-label>Perfil</ion-label>
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
  cardOutline,
  gridOutline,
  personCircleOutline,
  receiptOutline
} from 'ionicons/icons';
</script>
