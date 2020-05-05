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
      [0, 2, 4, 2],
      [2, 4, 4, 0],
      [0, 16, 0, 16],
      [8, 0, 2, 2],
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
  computed: {
    getNumbersFromRows() {
        // return this.matrix.map((row) => {

        // })
    },
    getNumbersFromColumns() {

    }
  },
  methods: {
    initializeGame() {
      this.addNumber();
      this.addNumber();
    },
    addNumber() {},
    userPressedKey(event) {
      switch (event.keyCode) {
        case 37:
          this.slideLeft();
          break;
        case 38:
          this.slideTop();
          break;
        case 39:
          this.slideRight();
          break;
        case 40:
          this.slideBottom();
          break;
      }
    },
    slideLeft() {
      this.matrix = this.matrix.map((row) => {
          let merged =  this.mergeTiles(row.filter((num) => num > 0))        
          return merged.concat(row.fill(0, merged.length, 4).slice(merged.length, 4))
      })
    },
    slideTop() {

    },
    slideRight() {
      this.matrix = this.matrix.map((row) => {
          let merged =  this.mergeTiles(row.filter((num) => num > 0))  
          return row.fill(0, merged.length, 4).slice(merged.length, 4).concat(merged);
      })
    },
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
