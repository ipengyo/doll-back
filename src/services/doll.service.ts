import httpService from './http.service'
import { CommonResponse, DollListsResponse } from '../types/response'
import { DollInfo } from '../types/model'
import store from '../stores/store'

class DollService {
  /**
   * 获取娃娃列表,分页
   */
  getDolls(): Promise<DollListsResponse> {
    let start = (store.doll.currentPage - 1), size = store.doll.pageSize
    return new Promise((resolve, reject) => {
      httpService.ajax<DollListsResponse>({
        url: '/admin/dolls',
        methods: 'GET',
        data: { start, size }
      }).then(result => {
        if (result.status === 200) {
          store.doll.dollList = result.dolls.content
          store.doll.total = result.dolls.totalElements
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 获取娃娃列表中所有娃娃
   */
  getAllDolls(): Promise<DollListsResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<DollListsResponse>({
        url: '/admin/dolls',
        methods: 'GET',
        data: { start: 0, size: 100 }
      }).then(result => {
        if (result.status === 200) {
          store.doll.dollList = result.dolls.content
          store.doll.total = result.dolls.totalElements
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 添加娃娃
   * @param dollObj 
   */
  addDoll(dollObj: DollInfo): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/doll',
        methods: 'POST',
        data: dollObj
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 根据id获取娃娃信息
   * @param id 
   */
  getDoll(id: number): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: `/admin/doll/${id}`,
        data: { dollid: id },
        methods: 'GET'
      }).then(result => {
        store.doll.dollInfo = result.doll
        store.doll.dollInfo.url = result.url
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 修改娃娃详细信息
   * @param id
   */
  editDoll(id: number): Promise<CommonResponse> {
    let dollObj = store.doll.dollInfo
    let params = {
      dollId: id,
      status: dollObj.status,
      price: dollObj.price,
      count: dollObj.count,
      pieceCount: dollObj.pieceCount,
      inventory: dollObj.count
    }
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/doll',
        data: params,
        methods: 'PUT'
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