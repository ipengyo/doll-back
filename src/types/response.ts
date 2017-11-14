import { DollsInfo,ProductsInfo } from './model'
/**
 * 通用接口返回
 */
export class CommonResponse {
  stat: string
  errText?: string
  [propName: string]: any
}
/**
 * 登录接口返回
 */
export class LoginResponse extends CommonResponse {
  token: string
}
/**
 * 娃娃列表
 */
export class DollListsResponse extends CommonResponse {
  dolls: DollsInfo
}
//商品列表
export class SkuListsResponse extends CommonResponse{
  products: ProductsInfo
}
//订单列表
export class OrderListsResponse extends CommonResponse{

}
//用户信息列表
export class UserListsResponse extends CommonResponse{

}
/**
 * 娃娃机列表
 */
export class BoxListsResponse extends CommonResponse {
  
}


