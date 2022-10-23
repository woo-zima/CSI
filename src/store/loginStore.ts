import {defineStore} from 'pinia'
import { getRouters } from '@/api';
import { UserResponse} from "@/api/apiTypes"


export const loginStore = defineStore('login',{
    state:(): UserResponse => {
        return{
            userInfo: JSON.parse(localStorage.getItem("user")!) || {},
        }
    },
    getters:{
        getUser(state){
            return state.userInfo;
        }
    },
    actions:{
        login:()=>{
            return new Promise((resolve,reject)=>{
                const data = {
                    code:200,
                    msg:'success'
                }
               resolve(data)
            })
        },
        setUserInfo(info:any){
           this.userInfo = info
        }
    }
})