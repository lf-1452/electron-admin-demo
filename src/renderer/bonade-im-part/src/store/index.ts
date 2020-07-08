import Vue from 'vue'
import Vuex from 'vuex'

import { commonState } from './modules/common'


Vue.use(Vuex)

export interface StoreModules {
    common: commonState
}

 const store = new Vuex.Store<StoreModules>({})

 export default store
