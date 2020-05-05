<template>
  <div class="game-header">
    <h1 class="game-title">2048</h1>
    <game-score></game-score>
    <p class="game-rules">Get 2048 by joining the numbers</p>
  </div>
</template>

<script>
import GameScore from "@/components/GameScore";
export default {
  name: "gameHeader",
  components: {
      GameScore
  }
};
</script>

<style lang="scss" scoped>
.game-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas: "game-title game-score" "game-rules game-rules";
}

.game-title {
  grid-area: game-title;
  font-size: 72px;
}

.game-score {
  grid-area: game-score;
}

.game-rules {
  grid-area: game-rules;
}
</style>
