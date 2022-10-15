import {defineStore} from 'pinia'


export const layoutStore = defineStore('layout',{
    state:()=> ({
            sidebarType:true
    }),
    getters:{
        // CHANGE_SIDERTYPE(state){
        //     state.sidebarType = !state.sidebarType
        // }
    },
    actions:{
        CHANGE_SIDERTYPE() {
            this.sidebarType = !this.sidebarType
          },
    }
})