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
    }
  },
  actions: {
    setScore({ commit }, score) {
      commit('setScore', score);
    }
  },
  getters: {
    getScore(state) {
      return state.score
    }
  }
})
