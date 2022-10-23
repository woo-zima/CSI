import {defineStore} from 'pinia'
import { getRouters,RoutersType } from '@/api';
import { useRoute } from 'vue-router';
import Layout from '@/Layout/index.vue'

// 匹配views里面所有的.vue文件
const modules: any = import.meta.glob('@/views/**/**.vue');


export const routerStore = defineStore('router',{
    state:()=>{
        return{
            userInfo:{},
            token:'',
            routes:[],
            addRoutes:[],
            defaultRoutes: [],
            topbarRouters: [],
            sidebarRouters: []
        }
    },
    getters:{
        getUser(state):any{
            return state.userInfo;
        }
    },
    actions:{
        GenerateRoutes() {
            return new Promise((resolve) => {
                getRouters().then((res) => {
                    this.userInfo = {name:'a'}

                    const sdata = JSON.parse(JSON.stringify(res))
                    const rdata = JSON.parse(JSON.stringify(res))
                    const defaultData = JSON.parse(JSON.stringify(res))
                    const rewriteRoutes = filterAsyncRouter(rdata)
                    resolve(rewriteRoutes);
                })
            })
        }
    }
})

function filterAsyncRouter(asyncRouterMap:Array<RoutersType>){
    return asyncRouterMap.filter((route: RoutersType ) =>{
        if(route.component){
            if(route.component === 'Layout'){
                route.component = Layout;
            }else{
                route.component = loadView(route.component)             
            } 
        }
        if (route.children && route.children.length ) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
}
function filterChildren(childrenList:Array<RoutersType>,lastR:any ){
    let children : RoutersType[] = []
    childrenList.forEach((el, index) => {
        if (el.children && el.children.length) {
            if (el.component === 'ParentView' && !lastR) {
                el.children.forEach(c => {
                    c.path = el.path + '/' + c.path
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, false))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }
        if (lastR) {
            el.path = lastR.path + '/' + el.path
        }
        children = children.concat(el)
    })
    return children
}


//这一步是取出来view里面的文件找到对应文件的懒加载函数，并执行。
const loadView = (view: string | Function) => {
    let res;
    for (const path in modules) {
        const dir = path.split('views/')[1].split('.vue')[0];  
        if (dir === view) {
            res = ()=> modules[path]();  
        }
    }
    return res;
}
