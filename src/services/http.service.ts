import commonService from './common.service'
import { RequestInfo } from '../types/request'
import { SignInfo } from '../types/model'

import { Message, Modal } from 'iview'

interface HeaderOption {
  [propName: string]: string
}

class HttpService {

  post<T, U = {}>(option: { url: string, data?: U, headers?: HeaderOption, checkLogin?: boolean }): Promise<T> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', option.url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('X-Device', 'Web')
      for (let key in (option.headers || {})) {
        xhr.setRequestHeader(key, option[key])
      }
      xhr.onload = () => {
        try {
          let data = JSON.parse(xhr.responseText)
          resolve(data as T)
        } catch (error) {
          reject(error)
        }
      }
      xhr.onerror = error => {
        reject(error)
      }
      xhr.send(JSON.stringify(option.data))
    })
  }

  // TODO
  ajax<T>(option: { url: string, data?: SignInfo, headers?: HeaderOption, methods?: string, unsign?: boolean }): Promise<T> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      let methods = option.methods || 'POST'
      let params = null
      let signObj = option.data || {}
      signObj.api = encodeURIComponent(option.url)

      if (option.unsign) {
        params = signObj
      } else {
        params = commonService.getSignParams(signObj)
      }

      // 设置请求方法
      switch (methods) {
        case 'get':
        case 'GET':
          let url = option.url + '?';
          let arr: string[] = []
          for (let key in params) {
            if (params.hasOwnProperty(key)) {
              arr.push(`${key}=${encodeURIComponent(params[key])}`)
            }
          }
          let query = arr.join('&')
          url = url + query
          xhr.open('GET', url)
          break;
        case 'DELETE':
        case 'PUT':
        case 'POST':
          xhr.open(methods, option.url)
          break
        default:
          xhr.open('POST', option.url)
          break
      }

      xhr.setRequestHeader('Content-Type', 'application/json')
      for (let key in (option.headers || {})) {
        xhr.setRequestHeader(key, option[key])
      }

      xhr.onload = () => {
        try {
          let data = JSON.parse(xhr.responseText)
          if (data.status === 200) {
            resolve(data as T)
          } else {
            if (data.error === 'TOKEN_NOT_FOUND') {
              window.location.href = './login.html'
            }
            (Modal as any).error({
              title: '请求出错',
              content: `${data.message}: ${data.error}`
            })
            resolve(data as T)
          }
        } catch (error) {
          reject(error)
        }
      }

      xhr.onerror = error => {
        Message.destroy()
        reject(error)
      }

      if (methods === 'GET') {
        xhr.send(null)
      } else {
        xhr.send(JSON.stringify(params))
      }
    })
  }

}

let httpService = new HttpService()

export default httpService