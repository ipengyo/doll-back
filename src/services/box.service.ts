import httpService from './http.service'
import { CommonResponse, BoxListsResponse, DollListsResponse, BoxInfoResponse } from '../types/response'
import { BoxInfo } from '../types/model'
import store from '../stores/store'

class DollService {
  /**
   * 获取娃娃机列表
   * @param id 
   */
  getBoxes(): Promise<BoxListsResponse> {
    store.doll.boxesList = [];
    return new Promise((resolve, reject) => {
      httpService.ajax<BoxListsResponse>({
        url: '/game/boxs',
        methods: 'GET',
      }).then(result => {
        if (result.status === 200) {
          result.boxs.map((row: any) => {
            let box: any = {
              boxid: row.box.id,
              name: row.box.name,
              status: row.box.status,
              dollIds: row.dolls
            }
            store.doll.boxesList.push(box);
          })
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 根据id获取娃娃机信息
   * @param id 
   */
  getBox(id: number): Promise<BoxInfoResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<BoxInfoResponse>({
        url: `/admin/box/${id}`,
        data: { boxid: id },
        methods: 'GET'
      }).then(result => {
        let dollIds = result.dolls.map((row: any) => {
          return row.id;
        })
        store.doll.boxInfo = {
          id: result.box.id,
          name: result.box.name,
          status: result.box.status,
          dollIds: dollIds,
          url: result.url
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 修改娃娃机详细信息
   * @param id
   */
  editBox(id: number): Promise<BoxInfoResponse> {
    let boxObj = store.doll.boxInfo
    let params = {
      boxId: id,
      status: boxObj.status,
      dollIds: boxObj.dollIds
    }
    return new Promise((resolve, reject) => {
      httpService.ajax<BoxInfoResponse>({
        url: '/admin/box',
        data: params,
        methods: 'PUT'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * 添加娃娃机
   * @param boxObj 
   */
  createBox(boxObj: BoxInfo): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/box',
        methods: 'POST',
        data: boxObj
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