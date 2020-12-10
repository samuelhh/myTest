import Vue from 'vue'
import Vuex from 'vuex'
import storeModules from '@/utils/storeModules'
import getters from './getters'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer(value) {
        return {
          user: {
            userName: value.user.userName
          }
        }
      }
    })
  ],
  modules: {
    ...storeModules
  },
  getters
})
