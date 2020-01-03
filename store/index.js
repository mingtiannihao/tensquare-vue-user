import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      activemenu:'index',
      managermenu:'index'
    },
    mutations: {
        active(state, menu) {
          state.activemenu = menu          
        },
        manager(state,menu){
          state.managermenu = menu
        }
    }
  })
}

export default createStore