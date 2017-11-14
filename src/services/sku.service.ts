import httpService from './http.service'
import { CommonResponse } from '../types/response'
import store from '../stores/store'

class DollService {

  addProduct(data: any) {

    data.api = 'addProduct'
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify(data)
        }
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  getProductList() {

    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'getProductList'
          })
        }
      }).then(result => {
        store.doll.productList = (result as any).productList
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  deleteProduct(id: number) {

    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'deleteProduct',
            productId: id
          })
        }
      }).then(result => {
        dollService.getProductList()
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
let dollService = new DollService()

export default dollService