import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);



const state = {
    main: {
        state: '未初始化'
    }
}
const getters = {
    mainFlowState: state => state.main.state,
}
const mutations = {
    UPDATE_MAIN_PROCESS(state, payload) {
        Object.assign(state.main, payload);
    }
}

// 创建 store 实例
export default new Vuex.Store({
    state,
    getters,
    mutations,
    strict: false
})
