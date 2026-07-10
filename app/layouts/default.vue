<script setup lang="ts">
import AppContainer from "~/components/AppContainer.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <main>
    <AppContainer>
      <slot />
    </AppContainer>
  </main>
</template>
