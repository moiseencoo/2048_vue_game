import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: 0
  },
  mutations: {
    setScore(state, score) {
      state.score += score
    },
    clearScore(state) {
      state.score = 0
    }
  },
  actions: {
    setScore({ commit }, score) {
      commit('setScore', score);
    },
    clearScore({ commit }) {
      commit('clearScore')
    }
  },
  getters: {
    getScore(state) {
      return state.score
    }
  }
})
