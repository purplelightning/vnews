const OPEN_DRAWER = 'OPEN_DRAWER'
const CLOSE_DRAWER = 'CLOSE_DRAWER'

export default {
  [OPEN_DRAWER](state) {
    state.showDrawer = true
  },
  [CLOSE_DRAWER](state) {
    state.showDrawer = false
  }
}
