<template>
  <!-- outer container -->
  <div class="flex flex-col mt-8">
    <!-- container within -->
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <h1 class="text-brand-neon font-bold text-5xl">Classic Mode</h1>
          <p>
            Choose the 4 correct cards that the artist has and is drawing for
            you to guess them correctly.
          </p>
        </div>
        <button
          @click="startNewRound"
          class="px-4 py-2 rounded-xl bg-brand-primary/80 hover:bg-brand-primary/60 active:bg-brand-primary font-medium transition-colors shadow-lg shadow-bg-brand-primary/20"
        >
          🔄New Cards
        </button>
      </div>

      <!-- Grid for Cards -->
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        <EmojiCard
          v-for="(emoji, index) in activeEmojisPerRound"
          :key="index"
          :emoji="emoji"
          @click="selectEmoji"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRandomEmojis } from "~/data/emojiPool";
import EmojiCard from "~/components/cards/EmojiCard.vue";

const activeEmojisPerRound = ref<string[]>([]);

const startNewRound = () => {
  activeEmojisPerRound.value = getRandomEmojis(24);
};

const selectEmoji = (emoji: string) => {
  console.log("Ausgewähltes Emoji:", emoji);
};

onMounted(() => {
  startNewRound();
});
</script>
