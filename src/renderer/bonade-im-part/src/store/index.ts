import Vue from 'vue'
import Vuex from 'vuex'

import { commonModule } from './modules/common'


Vue.use(Vuex)

export interface StoreModules {
    // commonModule: commonModule
}

 const store = new Vuex.Store<StoreModules>({})

 export default store
