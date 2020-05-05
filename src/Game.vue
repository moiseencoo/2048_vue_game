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
  name: 'Game',
  components: {
    GameHeader,
    GameBoard
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #E8F3F1;
}

#game {
  width: 100%;
  max-width: 500px;
  min-height: 300px;
  font-family: 'Poppins', sans-serif;
}
</style>
