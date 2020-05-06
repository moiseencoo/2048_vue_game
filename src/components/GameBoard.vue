<template>
  <div class="game-board">
    <div v-for="(row, row_index) in matrix" :key="row_index" class="game-row">
      <game-tile
        v-for="(tile, index) in row"
        :key="row_index + '_' + index"
        :value="tile"
        v-on:win="hasWon = true"
      ></game-tile>
    </div>
    {{ hasLost }}
    <h2 v-if="hasWon">You Win!</h2>
  </div>
</template>

<script>
import GameTile from "@/components/GameTile";
import { game_helpers } from "@/mixins/helpers.js";

export default {
  name: "gameBoard",
  data: () => ({
    matrix: [
      [16, 256, 16, 256],
      [0, 16, 0, 16],
      [0, 256, 16, 0],
      [0, 16, 0, 16],
    ],
    hasWon: false,
    hasLost: false,
  }),
  mixins: [game_helpers],
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
    addNumber() {
      let randomCol = this.generateRandomNumber();
      let randomRow = this.generateRandomNumber();

      if (this.matrix[randomCol][randomRow] === 0) {
        this.matrix[randomCol][randomRow] = 2;
      } else {
        this.addNumber();
      }
    },
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
        let merged = this.mergeTiles(row.filter((num) => num > 0));
        return merged.concat(row.fill(0).slice(merged.length, 4));
      });

      if (!this.isGameOver()) {
        this.addNumber();
      } else {
        this.hasLost = true;
      }
    },
    slideRight() {
      this.matrix = this.matrix.map((row) => {
        let merged = this.mergeTiles(
          row.filter((num) => num > 0).reverse()
        ).reverse();
        return row
          .fill(0)
          .slice(merged.length, 4)
          .concat(merged);
      });

      if (!this.isGameOver()) {
        this.addNumber();
      } else {
        this.hasLost = true;
      }
    },
    slideTop() {
      let newMatrix = this.rotateMatrix(this.matrix).map((row) => {
        let merged = this.mergeTiles(row.filter((num) => num > 0));
        return merged.concat(row.fill(0).slice(merged.length, 4));
      });

      this.matrix = this.rotateMatrix(newMatrix);

      if (!this.isGameOver()) {
        this.addNumber();
      } else {
        this.hasLost = true;
      }
    },
    slideBottom() {
      let newMatrix = this.rotateMatrix(this.matrix).map((row) => {
        let merged = this.mergeTiles(
          row.filter((num) => num > 0).reverse()
        ).reverse();
        return row
          .fill(0)
          .slice(merged.length, 4)
          .concat(merged);
      });

      this.matrix = this.rotateMatrix(newMatrix);

      if (!this.isGameOver()) {
        this.addNumber();
      } else {
        this.hasLost = true;
      }
    },
    isGameOver() {
      // let hasEmpty = false;

      let hasEmpty = this.matrix.some((row) => {
        return row.some((el) => el === 0);
      });

      console.log("hasEmpty ", hasEmpty);

      // let rowCanMove = this.matrix.find((row) => {
      //   return this.isNextTileTheSame(row);
      // });

      // console.log('row move ', rowCanMove);

      if (!hasEmpty) {
        console.log("Game over");
        return true;
      }

      return false;
    },
    isNextTileTheSame(array) {
      array.forEach((element, index, arr) => {
        if (element === arr[++index]) {
          return true;
        }
      });

      return false;
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
