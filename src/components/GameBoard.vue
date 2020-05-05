<template>
  <div class="game-board">
    <div v-for="(row, row_index) in matrix" :key="row_index" class="game-row">
      <game-tile
        v-for="(tile, index) in row"
        :key="row_index + '_' + index"
        :value="tile"
      ></game-tile>
    </div>
  </div>
</template>

<script>
import GameTile from "@/components/GameTile";

export default {
  name: "gameBoard",
  data: () => ({
    matrix: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  }),
  created() {
    this.initializeGame();
  },
  mounted() {
    window.addEventListener("keydown", this.userPressedKey.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.userPressedKey.bind(this));
  },
  methods: {
    initializeGame() {
      this.addNumber();
      this.addNumber();
    },
    addNumber() {},
    userPressedKey(event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        this.slideLeft();
      }
    },

    slideLeft() {
      let merged = this.mergeTiles([2, 2, 4, 2]);
      console.log(merged);
    },
    slideTop() {},
    slideRight() {},
    slideBottom() {},
    mergeTiles(array) {
      return array
        .map((element, index, arr) => {
          if (element == arr[++index]) {
            arr[index] = 0;
            return element * 2;
          } else {
            return element;
          }
        })
        .filter((element) => element > 0);
    },
  },
  components: {
    GameTile,
  },
};
</script>

<style lang="scss" scoped>
.game-board {
  background-color: #d5d5f4;
  border-radius: 5px;
  padding: 1px;
}

.game-row {
  display: flex;
  margin: 15px;
  margin-right: 0;
}
</style>
