import httpService from './http.service'
import { CommonResponse } from '../types/response'
import store from '../stores/store'

import commonService from './common.service'

class OrderService {

  getOrders() {
    let start = (store.order.currentIndex - 1) * store.order.pageSize
    return new Promise((resolve, reject) => {
      httpService.post<CommonResponse>({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'getOrders',
            start: start,
            size: store.order.pageSize
          })
        }
      }).then(result => {
        if (result.stat === 'OK') {
          store.order.orderLists = result.orders
          store.order.total = result.total
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