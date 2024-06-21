<template>
  <RouterView v-if="isViewTransitionAPISupported" class="child-view" />
  <RouterView v-slot="{ Component }" v-else>
    <transition :name="transitionName">
      <component class="child-view" :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  NavigationGuardNext,
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  RouterView
} from 'vue-router'

const transitionName = ref('slide-left')
const isViewTransitionAPISupported = ref(false)

function doVueOwnTransition(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left'
}

async function tryViewAPITransition(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (isViewTransitionAPISupported.value) {
    // With View Transitions:
    const transition = document.startViewTransition(() => doVueOwnTransition(to, from, next))

    transition.finished.then(() => {
      console.log('finished!')
    })
  } else {
    // Fallback for browsers that don't support View Transitions:
    doVueOwnTransition(to, from)
  }

  next()
}

onBeforeRouteUpdate(tryViewAPITransition)

onMounted(() => {
  isViewTransitionAPISupported.value = Boolean(document.startViewTransition)
})
</script>
