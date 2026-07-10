<template>
  <!-- container -->
  <div
    class="sticky mx-auto w-full max-w-[min(1800px,90vw)] px-6 sm:px-10 xl:px-16 flex items-center justify-between mt-6 mb-8"
  >
    <!-- left -->
    <NuxtLink to="/">Gartic Card Game</NuxtLink>
    <!-- right -->
    <nav class="flex gap-4">
      <div v-for="navLink in navLinks" :key="navLink.label">
        <NuxtLink
          :to="navLink.to"
          class="hover:text-brand-neon hover:underline transition-all"
          >{{ navLink.label }}</NuxtLink
        >
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { label: "Classic", to: "/" },
  { label: "Category", to: "/category" },
  { label: "Rapidfire", to: "/rapidfire" },
];
</script>
