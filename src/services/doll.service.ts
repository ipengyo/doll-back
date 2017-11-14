import httpService from './http.service'
import { CreateDollRequest } from '../types/request'
import { CommonResponse } from '../types/response'
import store from '../stores/store'

class DollService {

  addDoll(dollObj: CreateDollRequest) {
    dollObj.api = 'createDoll'
    return new Promise((resolve, reject) => {
      httpService.post<CommonResponse>({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify(dollObj)
        }
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  editDoll() {
    let dollObj = store.doll.dollInfo
    dollObj.api = 'editDoll'
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify(dollObj)
        }
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  getDolls() {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'getDollList',
            begin: 0,
            limit: 1000
          })
        }
      }).then(result => {
        store.doll.dollList = (result as any).dolls
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  getDoll(id: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'getDoll',
            dollid: id
          })
        }
      }).then(result => {
        store.doll.dollInfo = (result as any).doll
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  dollOpen(id: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'dollOpen',
            dollid: id
          })
        }
      }).then(result => {
        store.doll.dollInfo.status = 'open'
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  dollClose(id: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'dollClose',
            dollid: id
          })
        }
      }).then(result => {
        store.doll.dollInfo.status = 'close'
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  setDollCount(id: number, count: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'setDollCount',
            dollid: id,
            count: count
          })
        }
      }).then(result => {
        store.doll.dollInfo.count = count
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  setDollName(id: number, name: string) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'setDollName',
            dollid: id,
            name: name
          })
        }
      }).then(result => {
        store.doll.dollInfo.name = name
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  setDollPrice(id: number, price: string) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'setDollPrice',
            dollid: id,
            price: price
          })
        }
      }).then(result => {
        store.doll.dollInfo.price = price
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
let dollService = new DollService()
export default dollService