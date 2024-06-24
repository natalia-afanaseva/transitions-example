<template>
  <component :is="getComponent()" :transitionName="transitionName"></component>
</template>

<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue'
import {
  NavigationGuardNext,
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  RouterView
} from 'vue-router'

const transitionName = ref('slide-left')
const isViewTransitionAPISupported = ref(false)

const ViewTransition = defineAsyncComponent(
  () => import('../components/router-views/view-transition.vue')
)
const VueTransition = defineAsyncComponent(
  () => import('../components/router-views/vue-transition.vue')
)

function getComponent() {
  return document.startViewTransition ? ViewTransition : VueTransition
}

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
  const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
  if (!isReduced) {
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
  }

  next()
}

onBeforeRouteUpdate(tryViewAPITransition)

onMounted(() => {
  isViewTransitionAPISupported.value = Boolean(document.startViewTransition)
})
</script>
