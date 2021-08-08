<script setup lang="ts">
import { useRoute } from 'vue-router'
import { setInitialPath } from './route'

const route = useRoute()
setInitialPath(route)
</script>

<template>
  <RouterView />
</template>
