// 全局通用
import store from '@/store'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { hasValue } from '@/utils'


export interface commonState {
    menuList: any[]
    menuTags: any[]
}


@Module({ dynamic: true, store, namespaced: true, name: 'common' })

class Common extends VuexModule implements commonState {
    public menuList = []  // 左侧菜单
    public menuTags = []  // 横向菜单导航页 [{name:'tab-1',title:'标签-1',icon:''}]

    @Mutation
    public ADD_MenuTags(tabInfo: any) {
        if (!hasValue('name', tabInfo, this.menuTags)) {
            let a = []
            a.push(tabInfo)
        }
    }
}


export const commonModule = getModule(Common)
