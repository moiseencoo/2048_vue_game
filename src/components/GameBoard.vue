<template>
  <div class="game-board" :class="{'game-over' : hasLost}">
    <div v-for="(row, row_index) in matrix" :key="row_index" class="game-row">
      <game-tile
        v-for="(tile, index) in row"
        :key="row_index + '_' + index"
        :value="tile"
        v-on:win="hasWon = true"
      ></game-tile>
    </div>
    <h2 v-if="hasWon">You Win!</h2>
    <button @click="initializeGame">New Game</button>
  </div>
</template>

<script>
import GameTile from "@/components/GameTile";
import { game_helpers } from "@/mixins/helpers.js";

export default {
  name: "gameBoard",
  data: () => ({
    matrix: null,
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
      // Create Empty Matrix
      this.matrix = Array(4)
        .fill()
        .map(() => Array(4).fill(0));

      // Fill with 2 numbers on random cell
      this.addNumber();
      this.addNumber();

      // Clear Score
      this.$store.dispatch("clearScore");

      this.hasLost = false;
    },
    addNumber() {
      let randomCol = this.generateRandomNumber();
      let randomRow = this.generateRandomNumber();

      if (this.matrix[randomCol][randomRow] === 0) {
        this.matrix[randomCol][randomRow] = 2;
      } else {
        try {
          this.addNumber();
        } catch {
          this.hasLost = true;
        }
      }
    },
    userPressedKey(event) {
      if (!this.hasLost) {
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
      }
    },
    slideLeft() {
      this.matrix = this.matrix.map((row) => {
        let merged = this.mergeTiles(row.filter((num) => num > 0));
        return merged.concat(row.fill(0).slice(merged.length, 4));
      });

      this.isGameOver();
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

      this.isGameOver();
    },
    slideTop() {
      let newMatrix = this.rotateMatrix(this.matrix).map((row) => {
        let merged = this.mergeTiles(row.filter((num) => num > 0));
        return merged.concat(row.fill(0).slice(merged.length, 4));
      });

      this.matrix = this.rotateMatrix(newMatrix);

      this.isGameOver();
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

      this.isGameOver();
    },
    isGameOver() {
      let hasEmpty = this.matrix.some((row) => {
        return row.some((el) => el === 0);
      });

      if (!hasEmpty) {
          let rowCanMove = this.matrix.some((row) => {
            return this.isNextTileTheSame(row);
          });

          let colCanMove = this.rotateMatrix(this.matrix).some((row) => {
            return this.isNextTileTheSame(row);
          });

          if (!rowCanMove && !colCanMove) {
            this.hasLost = true;
            this.$store.dispatch('setBestScore');
          }

      } else {
        this.addNumber();
      }

    },
    isNextTileTheSame(array) {
      return array.some((element, index, arr) => {
        if (element === arr[++index]) {
          return true;
        }
      });
    },
  },
  components: {
    GameTile,
  },
};
</script>

<style lang="scss" scoped>
.game-board {
  position: relative;
  background-color: #d5d5f4;
  border-radius: 5px;
  padding: 1px;
}

.game-row {
  display: flex;
  margin: 15px;
  margin-right: 0;
}

button {
  position: relative;
  display: block;
  width: 70%;
  outline: none;
  background: #545479;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 5px;
  margin: 15px auto;
  padding: 7px;
  border: 0;
  cursor: pointer;
  z-index: 20;
}

.game-over::after {
  content: 'Game Over';
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  font-size: 72px;
}
</style>
