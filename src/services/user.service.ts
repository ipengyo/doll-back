import httpService from './http.service'
import { CommonResponse } from '../types/response'
import store from '../stores/store'
import { Message } from 'iview'
import { EditUser, UserNew } from '../types/model'

import commonService from './common.service'

class DollService {
  //获取所有用户信息
  getUsers(): Promise<CommonResponse> {
    let start = (store.doll.currentPage - 1), size = store.doll.pageSize
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/user/all',
        methods: 'GET',
        data: { start, size }
      }).then(result => {
        if (result.status === 200) {
          store.user.getUsers = result.users.content
          store.user.total = result.totalElements
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //搜索用户
  searchUserByName(name: string): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/user',
        methods: 'GET',
        data: {
          keyword: name,
          start: 0,
          size: 100,
          match: false
        }
      }).then(result => {
        if(result.status===200){
          store.user.getUsers = result.users.content
          store.user.total = result.totalElements
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
        data: { name, password },
        unsign: true
      }).then(result => {
        if (result.status === 200) {
          commonService.setCookie('token', result.token, 1 * 60 * 60)
        }
        resolve(result as CommonResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //获取用户详细信息
  getUser(id: number): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: `/admin/user/${id}`,
        data: { uid: id },
        methods: 'GET'
      }).then(result => {
        store.user.getUser = result.user
        store.user.coinInfo = result.coin
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //设置用户为禁用状态
  illegalUser(id: number): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/user/illegal',
        data: { uid: id },
        methods: 'POST'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //删除用户
  deleteUser(id: number): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/user',
        data: { uid: id },
        methods: 'DELETE'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //修改用户硬币数
  editCoins(id: number, coin: number): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/coin',
        data: {
          uid: id,
          coinChange: coin
        },
        methods: 'PUT'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //修改用户信息
  editUser(userobj: EditUser): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/user',
        data: userobj,
        methods: 'PUT'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //创建用户
  addUser(userobj: UserNew): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/user',
        data: userobj,
        methods: 'POST'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}


let dollService = new DollService()

export default dollService