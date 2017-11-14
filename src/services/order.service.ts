import httpService from './http.service'
import { CommonResponse,OrderListsResponse } from '../types/response'
import store from '../stores/store'

import commonService from './common.service'
class OrderService {

  // getOrders() {
  //   let start = (store.order.currentIndex - 1) * store.order.pageSize
  //   return new Promise((resolve, reject) => {
  //     httpService.post<CommonResponse>({
  //       url: '/doll/api/admin',
  //       data: {
  //         params: JSON.stringify({
  //           api: 'getOrders',
  //           start: start,
  //           size: store.order.pageSize
  //         })
  //       }
  //     }).then(result => {
  //       if (result.stat === 'OK') {
  //         store.order.orderLists = result.orders
  //         store.order.total = result.total
  //       }
  //       resolve(result)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }

//更改后
//获取列表
  getOrders(){
    let start = (store.order.currentIndex - 1) * store.order.pageSize
    return new Promise((resolve, reject) => {
      httpService.ajax({
        url: '/admin/orders',
        methods: 'GET',
        data: { 
          start, 
          size:store.order.pageSize 
        }
      }).then(result => {
        //if (result.status === 200) 
          store.order.orderLists = (result as any).orders
          store.order.total = (result as any).total
        
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
let orderService = new OrderService()

export default orderService