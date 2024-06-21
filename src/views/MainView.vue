<template>
  <RouterView v-slot="{ Component }">
    <transition :name="transitionName">
      <component class="child-view" :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, RouterView } from 'vue-router'

const transitionName = ref('slide-left')

onBeforeRouteUpdate((to, from, next) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  next()
})
</script>

<style scoped></style>
