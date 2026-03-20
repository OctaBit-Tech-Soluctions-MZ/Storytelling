<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}
</script>
<style scoped>
.input-error {
    border: 1px solid #e3342f !important;
}
</style>
<template>
  <div>
    <label
      v-if="label"
      class="mb-2 block text-sm text-slate-300"
    >
      {{ label }}
    </label>

    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      :class="{ 'input-error': error }"
      class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-violet-400"
    />

    <p
      v-if="error"
      class="mt-1 text-sm text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>