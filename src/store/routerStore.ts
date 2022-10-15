import {defineStore} from 'pinia'
import { getRouters,RoutersType } from '@/api';


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
                    const sidebarRoutes = filterAsyncRouter(sdata)
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                    const defaultRoutes = filterAsyncRouter(defaultData)
                    // this.addRoutes = rewriteRoutes
                    // this.routes = constantRoutes.concat(routes)
                    console.log(rdata);
            
                    resolve(rewriteRoutes);
                })
            })
        }
    }
})

function filterAsyncRouter(asyncRouterMap:[],la = false,type=false){
    return asyncRouterMap.filter(route =>{
        // console.log(route);
        
    })
}