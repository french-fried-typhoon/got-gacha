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
  letter-spacing: 1px;

  &:hover .action-brush {
    fill: #3f95e0;
  }

  &:active .action-brush {
    fill: #1779ce;
    fill: background-color .1s;
  }
}

.action-brush {
  width: 324px;
  transition: fill .25s;
}

.icon {
  display: inline;
  width: 16px;
  height: 16px;
}

.label {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  z-index: 10;
}

</style>

