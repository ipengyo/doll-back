/**
 * 用户信息类型定义
 */
export class UserInfo {
  uid: number
  name: string
  openid: string
  channel: string
  address: string
  phone?: string
}
/**
 * 今日订单统计信息类型定义
 */
export class DataStatistics {
  today_orderNumber: number = 0
  today_orderPay: number = 0
  yesterday_orderPay: number = 0
  week_orderPay: number = 0
}
/**
 * 管理员获取待处理订单列表类型定义
 */
export class ToDealLists {
  order_stat: number = 0
  type: string = ''
  number: number = 0
}

/**
 * 商品信息
 */
export class SkuInfo {
  ctime?: number = 0
  id?: number = 0
  name: string = ''
  manufacturer: string = ''
  approvalNumber: string = ''
  packaging: string = ''
  productType: string = ''
  inventory: number = 0
  price: number = 0
  integral: number = 0
  image: string[]
  sku_html: string = ''
  detailed: string = ''
  stat?: number = 0
}

export class AddSkuInfo {
  name: string = ''
  manufacturer: string = ''
  approvalNumber: string = ''
  packaging: string = ''
  productType: string = ''
  inventory: number = 0
  price: number = 0
  vipPrice: number = 0
  image: string[] = []
  sku_html: string = ''
  detailed: string = ''
}

/**
 * 检查报告类型定义
 */
export class ReportInfo {
  id: number = 0
  ctime: number = 0
  mtime: number = 0
  name: string = ''
  stat: number = 0
  comment: string = ''
  images: string[]
  oper: string = ''
  user: UserInfo = new UserInfo()
}
export class AddressInfo {
  id: number = 0
  location: string = ''
  phone: string = ''
  receiver: string = ''
  zipCode: string = ''
}
export class OrderInfo {
  id: number = 0
  addIntegral: number = 0
  channel: string = ''
  address: AddressInfo = new AddressInfo()
  number: string = ''
  price: number = 0
  pay_integral: number = 0
  freight: number = 0
  isUseIntegral: number = 0
  discount: number = 0
  pay: number = 0
  count: number = 1
  stat: number = 0
  ctime: number = 0
  isSetLogitics: boolean = false
  items: SkuInfo[]
  logistics: LogisticsInfo = new LogisticsInfo()
  user: UserInfo = new UserInfo()
}

export class OrderAllType {
  number: number = 0
  order_stat: number = 0
  type: string = ''
}

export class OrderOption {
  type: string = 'Week'
  start_time: number = -1
  end_time: number = -1
  isShowWeek: boolean = false
}

export class OrderStatistics {
  data: number[] = []
  keys: string[] = []
  name: string = ''
}

/**
 * 物流信息
 */
export class LogisticsItemInfo {
  AcceptStation: string = ''
  AcceptTime: string = ''
}
export class LogisticsInfo {
  ctime: number = 0
  id: number = 0
  shipperCode: string = ''
  logisticsCode: string = ''
  logisticsName: string = ''
  stat: number = 0
  info: LogisticsItemInfo[] = []
}
export class ShipperInfo {
  label: string = ''
  value: string = ''
}
/**
 * 分销商信息
 */
export class DistributionInfo {
  balance: number = 0
  channelId: string = ''
  codeUrl: string = ''
  ctime: number = 0
  id: number = 0
  income: number = 0
  name: string = ''
  orderCash: number = 0
  phone: string = ''
  pwd: string = ''
  rebateRatio: number = 0
  remark: string = ''
  sex: string = '男'
  stat: number = 0
  type: string = ''
  pay_code: PayCodeInfo = null
}
export class DistributionRecordInfo {
  ctime: number = 0
  income: number = 0
  name: string = ''
  nickName: string = ''
  orderCash: number = 0
  pay: number = 0
  pay_integral: number = 0
  rebateRatio: number = 0
  remark: string = ''
  sex: string = ''
  src_channelId: string = ''
  src_channelType: string = ''
  order: OrderInfo = null
  type: string = ''
}
/**
 * 积分
 */
export class IntegralInfo {
  change: string = ''
  content: string = ''
  ctime: number = 0
  id: number = 0
  type: string = ''
}

export interface SetCodeInfo {
  token?: string
  skuId: number
  number: number
  distributionId: number
}

export interface PayCodeInfo {
  codeUrl: string
  id: number
  number: number
  price: number
  sku: SkuInfo
}

export interface SignInfo {
  api?: string
  token?: string
  ctime?: string
  [propName: string]: any
}

export class orderInfo {
  order = new Order()
  product = new Product()
  user = new UserInfo()
}

export class Order {
  createTime: number
  id: number
  orderNumber: string
  price: number
  status: number
  productId: number
  uid: number
}

export class Product {
  createTime: number
  id: number
  price: number
  name: string
  gameCount: number
  description: string
}

//添加商品
export class AddSku {
  productName: string
  description: string
  gameCount: number
  price: number
}
//商品信息
export class ProductsInfo {
  createTime: string
  description: string
  gameCount: number
  id: number
  name: string
  price: number
}
//修改用户信息
export class EditUser {
  uid: number
  channel?: string
  name?: string
  phone?: string
  address?: string
  image?: string
}
/**
 * 娃娃模型
 */
export class DollInfo {
  name: string
  status: string
  count: string | number
  pieceCount: string
  rarePieces: string[]
  price: string
  url?: string
  [propName: string]: any
}
/**
 * 娃娃列表
 */
export class DollsInfo {
  content: DollInfo[] = []
  first: true
  last: true
  number: 0
  numberOfElements: 0
  size: 1000
  totalElements: 0
  totalPages: 0
}
/**
 * 娃娃机
 */
export class BoxInfo {
  id?: number
  name: string
  status: string
  dollIds?: number[]
  url?: string
}
//创建用户
export class UserNew {
  name: string
  password: string
  openid: string
  ch: string
  image: string
}
//获取用户信息
export class getUser {
  address: string
  channel: string
  email: string
  imageUrl: string
  name: string
  openId: string
  password: string
  phone: string
  status: number
  uid: number
  image: string
  totalPrice:number
}

//coin信息
export class coinInfo {
  coin: number
  id: number
  lifeCoin: number
  lifeScore: number
  price: number
  score: number
  uid: number
}

//收货地址
export class addressInfo {
  name: string
  phone: number
  address: string
}

/**
 * 兑换的礼品
 */
export class gift {
  createTime: number
  dollId: number
  id: number
  status: string
  uid: number
}

/**
 * 发货信息
 */
export class giftInfo {
  gift: gift
  user: UserInfo
}
