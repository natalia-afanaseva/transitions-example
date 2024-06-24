<template>
  <RouterView v-slot="{ Component }">
    <transition :name="transitionName">
      <component class="child-view" :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
defineProps<{ transitionName: string }>()
</script>

<style scoped></style>
