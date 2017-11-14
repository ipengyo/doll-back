/**
 * 登录接口请求
 */
export interface LoginRequest {
  name: string
  pwd: string
}

export class RequestInfo {
  openid: string
  token: string
  ctime: string
  api: string
  [propName: string]: any
}

export class AddProductRequest extends RequestInfo {
  productName: string = ''
  description: string = ''
  gameCount: number = 0
  price: number = 0
}
export interface CreateBoxRequest extends RequestInfo{
  name:string
  status:string
  dollIds:string[]
}