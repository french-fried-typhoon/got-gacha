<script setup lang="ts">
const props = defineProps({
  value: { type: Boolean, default: false },
  label: { type: String, required: true }
})

const emit = defineEmits(['change'])

const valueRef = ref(props.value)

function handleChange() {
  emit('change', valueRef.value)
}
</script>

<template>
  <div class="GCheckbox">
    <input
      :id="`gcheck-${label}`"
      v-model="valueRef"
      type="checkbox"
      :name="`gcheck-${label}`"
      @change="handleChange"
    >
    <label :for="`gcheck-${label}`" class="label">{{ label }}</label>
  </div>
</template>

<style lang="postcss" scoped>
.label {
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  padding: 5px 30px;
  position: relative;
  width: auto;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

.label::before {
  background: #fff;
  border: 1px solid #000000;
  border-radius: 4px;
  content: '';
  display: block;
  height: 18px;
  width: 18px;
  left: 3px;
  margin-top: -8px;
  position: absolute;
  top: 48%;
}

.label::after {
  border-right: 6px solid #b63424;
  border-bottom: 6px solid #b63424;
  content: '';
  display: block;
  height: 31px;
  left: 8px;
  margin-top: -21px;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: rotate(45deg) translate3d(0,2px,0) scale3d(.7,.7,1);
  width: 16px;
  transition: transform .2s ease-in-out, opacity .2s ease-in-out;
}

input[type=checkbox]:checked + .label::after {
  opacity: 1;
}
</style>
