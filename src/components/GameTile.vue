<template>
    <div class="game-tile">
        {{ value }}
    </div>
</template>

<script>
    export default {
        name: "gameTile",
        props: {
            value: Number
        }
    }
</script>

<style lang="scss" scoped>
.game-tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 106.25px;
    height: 106.25px;
    margin-right: 15px;
    background: #95B1AF;
    // background: #4D7DDB;
    border-radius: 5px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
}
</style>