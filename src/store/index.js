import Vue from 'vue'
import Vuex from 'vuex'
import storeModules from '@/utils/storeModules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ...storeModules
  },
  getters
})
