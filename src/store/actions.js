//公共函数，用于

export default {
  openDrawer({commit}) {
    commit('OPEN_DRAWER')
  },
  closeDrawer({commit}) {
    commit('CLOSE_DRAWER')
  }
}