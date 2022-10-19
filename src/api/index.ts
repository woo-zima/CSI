import { type } from "os";
import * as user from './modules/user'

//获取后台路由(动态路由)
export function getRouters(){
    return new Promise((resolve,reject)=>{
        const menuList = [
            {
                "name": "Tool",
                "path": "/Tool",
                "component": "Layout",
                "alwaysShow": true,
                "meta": {
                    "title": "系统工具",
                    "icon": "tool",
                    "link": null,
                    "Auth":true
                },
                "children": [{
                    "name": "Build",
                    "path": "Build",
                    "component": "sysTool/build/index",
                    "meta": {
                        "title": "表单构建",
                        "icon": "build",
                        "link": 'Tool',
                        "Auth":true
                    }
                }, {
                    "name": "Gen",
                    "path": "Gen",
                    "component": "sysTool/gen/index",
                    "meta": {
                        "title": "代码生成",
                        "icon": "code",
                        "noCache": false,
                        "link": 'Tool',
                        "Auth":true
                    }
                }, {
                    "name": "Swagger",
                    "path": "Swagger",
                    "component": "sysTool/swagger/index",
                    "meta": {
                        "title": "系统接口",
                        "icon": "swagger",
                        "noCache": false,
                        "link": 'Tool',
                        "Auth":true
                    }
                }]
            },
            {
                "name":"Department",
                "path":"/",
                "hidden":false,
                "redirect":"Department",
                "component":"Layout",
                "meta":{
                    "title":"部门管理",
                    "Auth":true,
                    "isSingle":true
                },
                "children":[
                    {
                        "name":"Department",
                        "path":"Department",
                        "hidden":false,
                        "component":"department/index",
                        "meta":{
                            "title":"部门管理",
                            "icon":"tool",
                            "link":"Department",
                            "Auth":true
                        }
                    }
                ]
            },
            {
                "name":"Menulist",
                "path":"/",
                "hidden":false,
                "component":"Layout",
                // "alwaysShow":"true",
                "meta":{
                    "title":"菜单管理",
                    "isSingle":true,
                    "Auth":true
                },
                "children":[
                    {
                        "name":"Menulist",
                        "path":"Menulist",
                        "hidden":false,
                        "component":"menuList/index",
                        "meta":{
                            "title":"菜单管理",
                            "icon":"tool",
                            "nocache":false,
                            "link":"Menulist",
                            "Auth":true
                        }
                    }
                ]
            },
            {
                "name":"DayRecord",
                "path":"/dayRecord",
                "hidden":false,
                "component":"Layout",
                "alwaysShow":"true",
                "meta":{
                    "title":"日志管理",
                    "icon":"tool",
                    "Auth":true
                },
                "children":[
                    {
                        "name":"LoginRecord",
                        "path":"LoginRecord",
                        "hidden":false,
                        "component":"dayRecord/loginRecord/index",
                        "meta":{
                            "title":"登录日志",
                            "icon":"tool",
                            "nocache":false,
                            "link":"dayRecord",
                            "Auth":true
                        }
                    },
                    {
                        "name":"HandleRecord",
                        "path":"HandleRecord",
                        "hidden":false,
                        "component":"dayRecord/handleRecord/index",
                        "meta":{
                            "title":"操作日志",
                            "icon":"tool",
                            "nocache":false,
                            "link":"dayRecord",
                            "Auth":true
                        }
                    },
                ]
            },
            {
                "name":"UserList",
                "path":"/",
                "hidden":false,
                "component":"Layout",
                // "alwaysShow":"true",
                "meta":{
                    "title":"用户管理",
                    "isSingle":true,
                    "Auth":true
                },
                "children":[
                    {
                        "name":"UserList",
                        "path":"UserList",
                        "hidden":false,
                        "component":"user/index",
                        "meta":{
                            "title":"用户管理",
                            "icon":"tool",
                            "nocache":false,
                            "link":"userList",
                            "Auth":true
                        }
                    }
                ]
            },

          ]
        resolve(menuList);
    })
}

export type RoutersType = {
    name: string,
    path: string,
    component: string | Function | undefined,
    alwaysShow?: boolean,
    meta?: iconType,
    children?: Array<RoutersType> | null
}

export type iconType = {
    title: string,
    icon: string,
    noCache: boolean,
    link: null | string,
    Auth:boolean,
    isSingle?:Boolean
}

const api = {
    user
}
export default api