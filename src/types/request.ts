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

export class CreateDollRequest extends RequestInfo {
  name: string = ''
  status: number = -1
  count: number = 0
  pieceCount: string = ''
  rarePieces: string[] = []
  price: string = ''
}

export class AddProductRequest extends RequestInfo {
  productName: string = ''
  description: string = ''
  gameCount: number = 0
  price: string = ''
}
export interface CreateBoxRequest extends RequestInfo{
  name:string
  status:string
  dollIds:string[]
}