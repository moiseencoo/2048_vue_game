import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    score: 0,
    bestScore: 0,
  },
  mutations: {
    setScore(state, score) {
      state.score += score;
    },
    clearScore(state) {
      state.score = 0;
    },
    setBestScore(state) {
      state.bestScore =
        state.score > state.bestScore ? state.score : state.bestScore;
    },
  },
  actions: {
    setScore({ commit }, score) {
      commit("setScore", score);
    },
    clearScore({ commit }) {
      commit("clearScore");
    },
    setBestScore({ commit }) {
      commit("setBestScore");
    },
  },
  getters: {
    getScore(state) {
      return state.score;
    },
    getBestScore(state) {
      return state.bestScore
    }
  },
});
