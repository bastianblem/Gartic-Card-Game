<template>
  <!-- outer container -->
  <div>
    <!-- container within -->
    <div>
      <!-- Header -->
      <div>
        <div>
          <h1>Classic Mode</h1>
          <p>
            Choose the 4 correct cards that the artist has and is drawing for
            you to guess them correctly.
          </p>
        </div>
        <button
          @click="startNewRound"
          class="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-600/20"
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
