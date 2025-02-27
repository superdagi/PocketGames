<template>
  <q-page class="row justify-evenly">
    <div class="col q-ma-xl q-pb-xl">
      <component :is="games[currentGame]" :key="currentGame" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SmallLetter from 'src/components/SmallLetter.vue'
import TenFriend from 'src/components/TenFriend.vue'

const props = defineProps({
  gameName: {
    type: String,
    required: false,
    restrict: ['letter', 'tenFriend'],
    default: 'letter',
  },
})

const route = useRoute()
const currentGame = computed(() => props.gameName || (route.params.gameName as string))

console.log(currentGame.value)
//key is game name object  is component
const games: Record<string, unknown> = {
  letter: SmallLetter,
  tenFriend: TenFriend,
}
</script>
