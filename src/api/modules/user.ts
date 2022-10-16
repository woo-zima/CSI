import { resolve } from "path";
import axios  from "../base";


export function login(data?:any){
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}