<template>
    <div class="game-score">
        <p class="game-score-current">
            Score <span>{{ getScore }}</span>
        </p>
        <p class="game-score-best">
            Best Score <span>{{ getBestScore }}</span>
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

    export default {
        name: 'gameScore',
        computed: {
            ...mapGetters(['getScore', 'getBestScore'])
        }
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