export type Method = 'POST' | 'GET' | 'DELETE' | 'OPTIONS' | 'PUT' | 'PATCH'

export interface AxiosRequestConfig {
    url:string,
    method:Method,
    data?:any,
    param?:any
}
