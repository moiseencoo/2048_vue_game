<template>
    <div class="game-score">
        <p class="game-score-current">
            Score <span>2048</span>
        </p>
        <p class="game-score-best">
            Best Score <span>4096</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'gameScore'
    }
</script>

<style lang="scss" scoped>
    .game-score {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
    }

    p {
        font-size: 14px;
        text-transform: uppercase;
        text-align: center;
        background-color: #324B4A;
        color: #fff;
        padding: 5px 20px;
        border-radius: 5px;
        margin: 5px;

        span {
            display: block;
            font-size: 20px;
        }
    }

</style>