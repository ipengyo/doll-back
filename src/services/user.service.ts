import httpService from './http.service'
import { CommonResponse } from '../types/response'
import store from '../stores/store'
import { Message } from 'iview'

import commonService from './common.service'

class DollService {

  getUsers() {
    let start = (store.user.currentIndex - 1) * store.user.pageSize
    return new Promise((resolve, reject) => {
      httpService.post<CommonResponse>({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'getUsers',
            start: start,
            size: store.user.pageSize
          })
        }
      }).then(result => {
        if (result.stat === 'OK') {
          store.user.userLists = result.users
          store.user.total = result.total
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  searchUserByName(name: string) {
    store.user.userLists = []
    return new Promise((resolve, reject) => {
      httpService.post<CommonResponse>({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'searchUserByName',
            keyword: name
          })
        }
      }).then(result => {
        if (result.stat === 'OK') {
          store.user.userLists = result.users
          store.user.total = result.total
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  login(name: string, password: string): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/user',
        data: {name, password},
        unsign: true
      }).then(result => {
        if (result.status === 200) {
          commonService.setCookie('token', result.token, 1*60*60)
        }
        resolve(result as CommonResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
let dollService = new DollService()

export default dollService