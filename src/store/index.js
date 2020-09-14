import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 页面列表
    tabMenu: [],
    // tabContent内容
    tabContent: [],
    // 选中页面
    tabSelected: {},
  },
  mutations: {
    // 新增tab页面 若已在tabMenu里面则只切换tab，若不在需要新增tab
    addtabMenu(state, pageObj) {
      let index = state.tabMenu.findIndex(obj => {
        return obj.id == pageObj.id
      })
      if (index == -1) {
        state.tabMenu.push(pageObj)
      }
      state.tabSelected = pageObj
    },
    // 选择tab页面
    selectPage(state, tabObj) {
      state.tabSelected = state.tabMenu.find(obj => {
        return obj.id == tabObj.id
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
