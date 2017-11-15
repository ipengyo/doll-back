import { DollsInfo, ProductsInfo, BoxInfo, orderInfo } from './model'
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
export class SkuListsResponse extends CommonResponse {
  products: ProductsInfo[]
}
//商品信息
export class SkuResponse extends CommonResponse {
  product: ProductsInfo
}
//订单列表
export class OrderListsResponse extends CommonResponse {
  orders: orderInfo[]
}
//订单信息
export class OrderInfoResponse extends CommonResponse {
  order: orderInfo
  product: ProductsInfo
}
//用户信息列表
export class UserListsResponse extends CommonResponse {

}
/**
 * 娃娃机列表
 */
export class BoxListsResponse extends CommonResponse {
  boxs: BoxInfo[]
}
/**
 * 娃娃机
 */
export class BoxInfoResponse extends CommonResponse {
  box: BoxInfo
  dolls: DollsInfo[]
  url: string
}


