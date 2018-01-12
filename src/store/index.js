import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  showDrawer: false,
  colorArray: [
    'red', '#2bad20', 'yellow', 'green', 'blue', '#77e9ff', 'purple','#e757ff'
  ],
  themeColor:'red'
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
