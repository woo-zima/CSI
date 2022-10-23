import instance  from "../base";

//角色登录
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
//获取角色菜单
export function getAllMenu(uid:number){
    return instance({
        url:`/MenuApi/selectAllMenu/${uid}`,
        method:'get'
    })
}

//查询所有员工信息
export function getAllRole(){
    return instance({
        url:``,
        method:'get'
    })
}
//获取未授权读者信息
export function getUnRead(){
    return instance({
        url:``,
        method:'get'
    })
}

