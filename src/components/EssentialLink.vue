<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label v-if="caption" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { IEssentialLinkProps } from 'src/ts/interfaces/IEssentialLinkProps'

withDefaults(defineProps<IEssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>
