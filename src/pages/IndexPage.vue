<template>
  <q-page class="row justify-evenly">
    <div class="col q-ma-xl q-pb-xl">
      <component :is="games[currentGame]" :key="currentGame" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const SmallLetter = defineAsyncComponent(() => import('src/components/SmallLetter.vue'))
const TenFriend = defineAsyncComponent(() => import('src/components/TenFriend.vue'))
const props = defineProps({
  gameName: {
    type: String,
    required: false,
    restrict: ['letter', 'tenFriend'],
  },
})

const route = useRoute()
const currentGame = computed(() => props.gameName || (route.params.gameName as string))

console.log(route.params.gameName)
//key is game name object  is component
const games: Record<string, unknown> = {
  letter: SmallLetter,
  tenFriend: TenFriend,
}
</script>
