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

        <q-list>
          <q-item
            v-for="(link, i) in linksList"
            :key="i"
            clickable
            @click="navigateTo(link.link ?? '')"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              {{ link.title }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IEssentialLinkProps } from 'src/ts/interfaces/IEssentialLinkProps'
import { useRouter } from 'vue-router'

const router = useRouter()

// Function to navigate using Vue Router
const navigateTo = (path: string) => {
  void router.push(path) // Navigates to the specified path
}

const linksList: IEssentialLinkProps[] = [
  {
    title: 'Liten bokstav',
    icon: 'copyright',
    link: '/letter',
  },
  {
    title: 'Tiervenn',
    icon: 'pin',
    link: '/tenFriend',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
