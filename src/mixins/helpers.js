export const game_helpers = {
  methods: {
    generateRandomNumber() {
      return Math.floor(Math.random() * 4);
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
};
