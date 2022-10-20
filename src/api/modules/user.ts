import instance  from "../base";


export function login(name:string,pass:string){
    return instance({
        url: '/login',
        method: 'post',
        data:{
            username:name,
            password:pass
        }
    })
}

export function getAllMenu(uid:number){
    return instance({
        url:`/MenuApi/selectAllMenu/${uid}`,
        method:'get'
    })
}
