import httpService from './http.service'
import { CommonResponse, BoxListsResponse, DollListsResponse } from '../types/response'
import { BoxInfo } from '../types/model'
import store from '../stores/store'

class DollService {
  /**
   * 获取娃娃机列表
   * @param id 
   */
  getBoxes(): Promise<BoxListsResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<BoxListsResponse>({
        url: '/game/boxs',
        methods: 'GET',
      }).then(result => {
        if (result.status === 200) {
          store.doll.boxesList = result.boxs
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  /**
   * 获取所有娃娃
   * @param  
   */
  getDolls(): Promise<DollListsResponse> {
    let size = store.doll.total?store.doll.total:100;
    let start = 0;
    return new Promise((resolve, reject) => {
      httpService.ajax<DollListsResponse>({
        url: '/admin/dolls',
        methods: 'GET',
        data: { start, size }
      }).then(result => {
        if (result.status === 200) {
          store.doll.dollList = result.dolls.content
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  getBox(id: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'getBox',
            boxid: id
          })
        }
      }).then(result => {
        store.doll.boxInfo = (result as any).box
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  boxOpen(id: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'boxOpen',
            boxid: id
          })
        }
      }).then(result => {
        store.doll.boxInfo.status = 'open'
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  boxClose(id: number) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'boxClose',
            boxid: id
          })
        }
      }).then(result => {
        store.doll.boxInfo.status = 'close'
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }


  setBoxName(id: number, name: string) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'setBoxName',
            boxid: id,
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

  // getBoxes() {
  //   return new Promise((resolve, reject) => {
  //     httpService.post({
  //       url: '/doll/api/admin',
  //       data: {
  //         params: JSON.stringify({
  //           api: 'getBoxList',
  //           begin: 0,
  //           limit: 1000
  //         })
  //       }
  //     }).then(result => {
  //       store.doll.boxesList = (result as any).boxes
  //       resolve(result)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }

  addBoxDolls(id: number, dolls: string[]) {
    return new Promise((resolve, reject) => {
      httpService.post({
        url: '/doll/api/admin',
        data: {
          params: JSON.stringify({
            api: 'addBoxDolls',
            boxid: id,
            dolls: dolls
          })
        }
      }).then(result => {
        store.doll.boxesList.dolls = (result as any).dolls
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
let dollService = new DollService()

export default dollService