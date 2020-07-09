// 全局通用
import store from '@/store'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { hasValue, hasChild } from '@/utils'
import { routes } from '@/router'


export interface commonState {
    menuList: any[]
    menuTags: any[]
}


@Module({ dynamic: true, store, namespaced: true, name: 'common' })

class Common extends VuexModule implements commonState {
    public menuList = []  // 左侧菜单
    public menuTags = []  // 横向菜单导航页 [{name:'tab-1',title:'标签-1',icon:''}]
    private whritRouterList = []  // 白名单

    // Mutation
    @Mutation
    public ADD_MenuTags(tabInfo: any) {
        if (!hasValue('name', tabInfo, this.menuTags)) {

            // this.menuTags.push(tabInfo)
        }
    }

    // getters
    public get createRouteMenus() {
        const list = _createRouteMenus(routes, this.whritRouterList)
        return list
    }
}






/**
 * @param {Array} routersList 全部路由列表
 * @param {Array} whritRouterList 白名单
 * @description 创建左侧路由
 */
function _createRouteMenus(routersList: any[], whritRouterList: any[]): [] {
    let list: any = [];

    interface obj {
        name: string,
        meta: any,
        path: string,
        children?: any[]
    }

    routersList.forEach((item, index) => {
        const { name, meta, path } = item

        // 必须有数据元&&不隐藏的菜单
        if (meta && !meta.hidden) {
            let obj: obj = {
                name,
                meta,
                path
            }

            // 若当前有子级并且可访问显示则继续添加
            if (hasChild(item)) {
                obj.children = _createRouteMenus(item.children, whritRouterList)
            }

            list.push(obj)
        }
    })
    console.log(list)
    return list
}


export const commonModule = getModule(Common)
