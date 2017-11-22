import { DollsInfo, ProductsInfo, BoxInfo, orderInfo, Order, gift, giftInfo, UserInfo, getUser, coinInfo } from './model'
import UserGiftsComponent from '../components/user/userGifts.component';
/**
 * 通用接口返回
 */
export class CommonResponse {
  status: number
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
  order: Order
  product: ProductsInfo
  user: UserInfo
}
//用户信息列表
export class UserListsResponse extends CommonResponse {
  users:{
    content: getUser[]
    totalElements: number
  }
}
/**
 * 用户详情
 */
export class UserInfoResponse extends CommonResponse {
  gifts?: giftInfo[]
  coin: coinInfo
  user: getUser
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

/**
 * 发货列表
 */
export class DeliverysResponse extends CommonResponse {
  gifts : giftInfo[]
  totalElements: number
  totalPages: number
}
/**
 * 发货详情
 */
export class DeliveryInfoResponse extends CommonResponse {
  gifts : gift[]
}


