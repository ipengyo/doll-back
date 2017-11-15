import httpService from './http.service'
import { CommonResponse, OrderListsResponse, OrderInfoResponse } from '../types/response'
import store from '../stores/store'

import commonService from './common.service'
class OrderService {
  //获取列表
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

  //管理员获取订单信息
  getOrderById(orderid: number): Promise<OrderInfoResponse> {
    return new Promise((resolve,reject)=>{
      httpService.ajax<OrderInfoResponse>({
        url: '/admin/order',
        methods: 'GET',
        data: {orderid}
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
let orderService = new OrderService()

export default orderService