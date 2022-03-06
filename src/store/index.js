import Vue from 'vue'
import Vuex from 'vuex'
import teb from './teb'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    teb,
    user
  }
})
