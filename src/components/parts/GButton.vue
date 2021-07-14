<script setup lang="ts">
interface Props {
  text: string
}

const emit = defineEmits(['click'])
const props = withDefaults(defineProps<Props>(), {
  text: ''
})
</script>

<template>
  <div class="GButton" role="button" @click="emit('click')">
    {{ text }}
  </div>
</template>

<style lang="postcss" scoped>
.GButton {
  width: 80px;
  height: 24px;
  padding: 4px 8px;
  text-align: center;
  line-height: 24px; 
  background-color: gray;
  border-radius: 5px;
  cursor: pointer;

  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
}
</style>