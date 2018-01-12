const OPEN_DRAWER = 'OPEN_DRAWER'
const CLOSE_DRAWER = 'CLOSE_DRAWER'
const CHANGE_BGCOLOR='CHANGE_BGCOLOR'

export default {
  [OPEN_DRAWER](state) {
    state.showDrawer = true
  },
  [CLOSE_DRAWER](state) {
    state.showDrawer = false
  },
  [CHANGE_BGCOLOR](state,index){
    state.themeColor=state.colorArray[index]
  }
}
