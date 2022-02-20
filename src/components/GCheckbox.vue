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
      type="checkbox"
      :name="`gcheck-${label}`"
      v-model="valueRef"
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
  font-size: 20px;
}

.label::before {
  background: #fff;
  border: 1px solid #231815;
  border-radius: 2px;
  opacity: .5;
  content: '';
  display: block;
  height: 18px;
  left: -3px;
  margin-top: -8px;
  position: absolute;
  top: 48%;
  width: 18px;
}

.label::after {
  border-right: 6px solid #b63424;
  border-bottom: 6px solid #b63424;
  content: '';
  display: block;
  height: 31px;
  left: 2px;
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
