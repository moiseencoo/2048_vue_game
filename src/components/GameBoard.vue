<template>
  <div class="game-board">
      <div v-for="(row, row_index) in matrix" :key="row_index" class="game-row">
          <game-tile v-for="(tile, index) in row" :key="row_index + '_' + index" :value="tile"></game-tile>
      </div>
  </div>
</template>

<script>
import GameTile from '@/components/GameTile';

export default {
  name: "gameBoard",
  data: () => ({
      matrix: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
  }),
  created() {
      this.initializeGame();
  },
  methods: {
    initializeGame() {
        this.addNumber();
        this.addNumber();
    },
    addNumber() {

    }
  },
  components: {
      GameTile
  }
};
</script>

<style lang="scss" scoped>
.game-board {
    background-color: #d5d5f4;
    border-radius: 5px;
    padding: 1px;;
}

.game-row {
    display: flex;
    margin: 15px;
    margin-right: 0;
}
</style>
