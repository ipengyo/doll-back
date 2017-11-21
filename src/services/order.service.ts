import httpService from './http.service'
import { CommonResponse, OrderListsResponse, OrderInfoResponse } from '../types/response'
import store from '../stores/store'

import commonService from './common.service'
import { orderInfo, Order } from '../types/model';
class OrderService {
  /**
   * 获取订单列表
   */
  getOrders(): Promise<OrderListsResponse> {
    let start = (store.order.currentIndex - 1) * store.order.pageSize
    return new Promise((resolve, reject) => {
      httpService.ajax<OrderListsResponse>({
        url: '/admin/orders',
        methods: 'GET',
        data: {
          start,
          size: store.order.pageSize
        }
      }).then(result => {
        if (result.status === 200) {
          store.order.orderLists = result.orders
          store.order.total = result.total
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 管理员获取订单信息
   * @param orderid 
   */
  getOrderById(orderid: number): Promise<OrderInfoResponse> {
    return new Promise((resolve,reject)=>{
      httpService.ajax<OrderInfoResponse>({
        url: `/admin/order/${orderid}`,
        methods: 'GET',
        data: {orderid}
      }).then((result:any) => {
        if(result.status === 200) {
          store.order.orderInfo.order = result.order
          store.order.orderInfo.product = result.prodcut
          store.order.orderInfo.user = result.user
          console.log(store.order.orderInfo);
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
let orderService = new OrderService()

export default orderService