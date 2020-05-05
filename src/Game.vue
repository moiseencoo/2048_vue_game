<template>
  <div id="game">
    <game-header></game-header>
    <game-board></game-board>
  </div>
</template>

<script>
import GameHeader from "@/components/GameHeader"
import GameBoard from "@/components/GameBoard"

export default {
  name: 'App',
  components: {
    GameHeader,
    GameBoard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
