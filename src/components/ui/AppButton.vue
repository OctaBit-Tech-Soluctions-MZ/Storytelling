<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition',
      fullWidth ? 'w-full' : '',
      variant === 'primary'
        ? 'bg-violet-600 text-white hover:bg-violet-500'
        : 'border border-slate-700 bg-slate-900 text-white hover:bg-slate-800'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})
</script>