import * as user from './modules/user'

//获取后台路由(动态路由)
export function getRouters(){
    return new Promise((resolve,reject)=>{
        const menuList = [
            {
                "name": "Personal",
                "path": "/personal",
                "component": "Layout",
                "alwaysShow": true,
                "meta": '',
                "children": [{
                    "name": "PersonalMsg",
                    "path": "PersonalMsg",
                    "component": "personal/personalmsg/index",
                    "meta": 'Personal'
                     ,
                    "children":[{
                            "name": "Maintain",
                            "path": "Maintain",
                            "component": "personal/personalmsg/maintain/index",
                            "meta": 'Personal/PersonalMsg',
                    }]
                }, {
                    "name": "Lookothers",
                    "path": "Lookothers",
                    "component": "personal/lookothers/index",
                    "meta": 'personal',
                },
                {
                    "name": "Planwork",
                    "path": "Planwork",
                    "component": "personal/planwork/index",
                    "meta": 'personal',
                    "children":[{
                        "name": "Setread",
                    "path": "Setread",
                    "component": "personal/planwork/setread/index",
                    "meta": 'Personal/Planwork',
                    },{
                        "name": "Setagent",
                    "path": "Setagent",
                    "component": "personal/planwork/setagent/index",
                    "meta": 'Personal/Planwork',
                    },{
                        "name": "Setwork",
                    "path": "Setwork",
                    "component": "personal/planwork/setwork/index",
                    "meta": 'Personal/Planwork',
                    },]
                },
            ]
            },
            {
                "name":"System",
                "path":"/System",
                "hidden":false,
                "redirect":"System",
                "component":"Layout",
                "meta":null,
                "children":[
                    {
                        "name":"Department",
                        "path":"Department",
                        "component":"system/department/index",
                        "meta":"System",
                    },
                    {
                        "name":"Role",
                        "path":"Role",
                        "component":"system/role/index",
                        "meta":"System",
                    },
                    {
                        "name":"Staff",
                        "path":"Staff",
                        "component":"system/staff/index",
                        "meta":"System",
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