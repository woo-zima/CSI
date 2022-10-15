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
        getUser(state){
            return state.userInfo;
        }
    },
    actions:{
        GenerateRoutes() {
            return new Promise(resolve => {
                getRouters().then((res) => {
                    
                    const sdata = JSON.parse(JSON.stringify(res))
                    const rdata = JSON.parse(JSON.stringify(res))
                    const defaultData = JSON.parse(JSON.stringify(res))
                    // const sidebarRoutes = filterAsyncRouter(sdata)
                    const rewriteRoutes = filterAsyncRouter(rdata)
                    // const defaultRoutes = filterAsyncRouter(defaultData)
                    // this.addRoutes = rewriteRoutes
                    // this.routes = constantRoutes.concat(routes)
                    console.log(rewriteRoutes);
            
                    resolve(rewriteRoutes);
                })
            })
        }
    }
})

function filterAsyncRouter(asyncRouterMap:Array<RoutersType>){
    return asyncRouterMap.filter((route: RoutersType ) =>{
        // if (route.children) {
        //     route.children = filterChildren(route.children,null)
        //     // console.log(route.children);
            
        // }
        if(route.component){
            if(route.component === 'Layout'){
                route.component = Layout;
            }else{
                // console.log(route.component);
                route.component = loadView(route.component)
                // console.log(route.component);                
            } 
        }
        if (route.children != null && route.children ) {
            route.children = filterAsyncRouter(route.children)
        } else {
            delete route['children']
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
