<script setup lang="ts">
import TwitterIcon from './icons/TwitterIcon.vue'
import GBrushStroke from './GBrushStroke.vue'

const props = defineProps<{
  label: string,
  text?: string,
  url?: string,
  hashtags?: string
}>()

const href = computed(() => {
  return `https://twitter.com/intent/tweet?text=${props.text}&url=${props.url}%0a&hashtags=${props.hashtags}`
})

function handleClick() {
  window.open(href.value, '_blank')
}
</script>

<template>
  <button
    class="TwitterShareButton"
    @click="handleClick"
  >
    <GBrushStroke class="action-brush" />
    <span class="label">
      <TwitterIcon class="icon" />
      {{ label }}
    </span>
  </button>
</template>

<style lang="postcss" scoped>
.TwitterShareButton {
  position: relative;
  color: #ffffff;
  font-size: 14px;

  &:hover .action-brush {
    fill: #3f95e0;
  }

  &:active .action-brush {
    fill: #1779ce;
    fill: background-color .1s;
  }
}

.action-brush {
  width: 248px;
  transition: fill .25s;
}

.icon {
  display: inline;
  width: 16px;
  height: 16px;
}

.label {
  position: absolute;
  top: 16%;
  left: 30%;
  z-index: 10;
}

</style>

