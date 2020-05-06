<template>
  <div class="game-tile" :style="{ background: getColor }">
    {{ getValue }}
  </div>
</template>

<script>
export default {
  name: "gameTile",
  props: {
    value: Number,
  },
  data: () => ({
    colors: [
      "#00C9C6",
      "#00B4DD",
      "#0099E4",
      "#7078D1",
      "#A14FA1",
      "#AE2660",
      "#9F0049",
      "#BD0060",
      "#003A3B",
      "#B275DD",
    ],
  }),
  computed: {
    getValue() {
      if (this.value == 2048) {
        this.$emit("win");
      }

      return this.value > 0 ? this.value : null;
    },
    getColor() {
      let color;
      if (this.value > 0 && (this.value & (this.value - 1)) == 0) {
        let binar = this.value.toString(2);
        color = this.colors[(binar.length - 2) % this.colors.length];
      }
      return color || "#99B2FF";
    },
  },
};
</script>

<style lang="scss" scoped>
.game-tile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106.25px;
  height: 106.25px;
  margin-right: 15px;
  border-radius: 5px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
}
</style>
