export type Method = 'POST' | 'GET' | 'DELETE' | 'OPTIONS' | 'PUT' | 'PATCH'

export interface AxiosRequestConfig {
    url:string,
    method:Method,
    data?:any,
    param?:any
}
export interface UserResponse  {
    userInfo:userInfo
}

export type userInfo =  {
    empl_id?: number,
    role_id?: number,
    jwt?: string,
    exp?: number,
    username?: string,
    status?: string
}