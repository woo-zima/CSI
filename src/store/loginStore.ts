import {defineStore} from 'pinia'
import { getRouters } from '@/api';


export const loginStore = defineStore('login',{
    state:()=>{
        return{
            userInfo:{},

        }
    },
    getters:{
        getUser(state){
            return state.userInfo;
        }
    },
    actions:{
        login:()=>{
            // const username =userInfo.username.trim();
            // const password = userInfo.password;
            // const code =userInfo.code;
            // const uuid = userInfo.uuid;
            return new Promise((resolve,reject)=>{
                const data = {
                    code:200,
                    msg:'success'
                }
               resolve(data)
            })
        }
    }
})