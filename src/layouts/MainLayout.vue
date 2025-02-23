<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Pocket games </q-toolbar-title>

        <div>Hei!</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Velg spill </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import type { IEssentialLinkProps } from 'src/ts/interfaces/IEssentialLinkProps'

const linksList: IEssentialLinkProps[] = [
  {
    title: 'Liten bokstav',
    icon: 'copyright',
    link: 'https://quasar.dev',
  },
  {
    title: 'Tall',
    icon: 'pin',
    link: 'https://github.com/quasarframework',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
