<template>
  <!-- outer card-container -->
  <div
    class="max-w-48 flex flex-col items-center justify-center p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-md transform transition-all duration-200 hover:scale-105 hover:border-indigo-500 hover:shadow-indigo-500/10 cursor-pointer aspect-square select-none"
  >
    <!-- emoji container -->
    <div
      class="text-4xl sm:text-5xl md:text-6xl filter drop-shadow-sm representation-emoji"
    >
      {{ emoji }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  emoji: string;
}>();
</script>
