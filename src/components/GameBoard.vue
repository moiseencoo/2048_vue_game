<template>
  <div class="game-board"></div>
</template>

<script>
export default {
  name: "gameBoard",
  data: () => ({
      
  }),
};
</script>

<style lang="scss" scoped>
.game-board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 1px 1px;
}
</style>
