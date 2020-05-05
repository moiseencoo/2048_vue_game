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
  computed: {},
  methods: {
    initializeGame() {
      this.addNumber();
      this.addNumber();
    },
    addNumber() {
      let randomCol = this.generateRandomNumber();
      let randomRow = this.generateRandomNumber();
      
      if (this.matrix[randomCol][randomRow] == 0) {
        this.matrix[randomCol][randomRow] = 2
      } else {
        this.addNumber();
      }

    },
    generateRandomNumber() {
      return Math.floor(Math.random() * 4);
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
    },
    slideTop() {
      let newMatrix = this.rotateMatrix(this.matrix).map((row) => {
        let merged = this.mergeTiles(row.filter((num) => num > 0));
        return merged.concat(row.fill(0).slice(merged.length, 4));
      });

      this.matrix = this.rotateMatrix(newMatrix);

      // let result = this.matrix.forEach((row, r_index, array) => {
      //   return array.map((column, c_index) => {
      //     return array[c_index][r_index]
      //   })
      // })
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
    },
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
    rotateMatrix(mtr) {
      let rotatedMatrix = [];
      for (let i = 0; i < 4; i++) {
        let rotatedRow = [];
        for (let j = 0; j < 4; j++) {
          rotatedRow.push(mtr[j][i]);
        }
        rotatedMatrix.push(rotatedRow);
      }
      return rotatedMatrix;
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
