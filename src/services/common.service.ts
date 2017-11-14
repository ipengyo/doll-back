import MD5 from 'crypto'
import jsSHA from 'jssha'

import { SignInfo } from '../types/model'

class CommonService {

  /**
   * 格式化显示日期时间
   * @param value 
   */
  dateTime(date: number, format?: string) {
    // yyyy-MM-dd hh:mm
    if (!date) return '';
    var d = new Date();
    if ((date + '').length == 10) d.setTime(date * 1000);
    else d.setTime(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    if (!format) format = 'yyyy-MM-dd hh:mm';
    return format.replace('yyyy', year + '').replace('MM', month + '').replace('dd', day + '').replace('hh', hour + '').replace('mm', min + '').replace('ss', second + '')
  }

  /**
   * 将字符串转换为cookie键值对，默认为当前域cookie
   * @param key cookie名
   * @param str cookie字符串
   */
  getCookie(key: string, str: string = document.cookie) {
    let arrs = str.split('; ')
    let cookie = {}
    arrs.forEach(arr => {
      let tmp = arr.split('=')
      cookie[tmp[0]] = tmp[1]
    })

    if (cookie[key]) {
      return cookie[key]
    } else {
      window.location.href = './login.html'
    }
  }

  /**
   * 设置cookie，expire不传代表关闭浏览器cookie过期
   * @param key cookie的名字
   * @param value cookie的值
   * @param expire 生存时长（单位秒）
   */
  setCookie(key: string, value: string, expire?: number): string {
    if (expire !== undefined) {
      let date = new Date()
      date.setTime(date.getTime() + expire * 1000)
      return document.cookie = `${key}=${value};expires=${date.toDateString()};path=/`
    }
    return document.cookie = `${key}=${value};path=/`
  }

  sha1Sign(params: SignInfo) {
    let keys = Object.keys(params).sort()
    let arr: string[] = []
    keys.forEach(item => {
      if (typeof params[item] === 'object') {
        params[item] = JSON.stringify(params[item])
      }
      arr.push(`${item}=${params[item]}`)
    })
    let str = arr.join('&')
    let shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(str);
    let ret = shaObj.getHash('HEX').toUpperCase();

    return ret;
  }

  md5Sign(params: SignInfo) {
    let keys = Object.keys(params).sort()
    let arr: string[] = []
    keys.forEach(item => {
      if (typeof params[item] === 'object') {
        params[item] = JSON.stringify(params[item])
      }
      arr.push(`${item}=${params[item]}`)
    })
    let str = arr.join('&')
    let md5 = MD5.createHash('md5')
    md5.update(str)
    let result = md5.digest('hex').toUpperCase()
    return result
  }

  createTimestamp() {
    return parseInt(new Date().getTime() / 1000 + '', 10) + '';
  }

  /**
   * 请求参数加密，并加上时间戳以及token
   * @param params 
   */
  getSignParams(params: SignInfo) {

    params['ctime'] = this.createTimestamp()
    params['token'] = this.getCookie('token')

    let sha1Obj: SignInfo = { api: '', token: '', ctime: '' },
      keys = ['api', 'token', 'ctime'],
      md5Obj: SignInfo = {},
      sha1Str: string = '',
      md5Str: string = ''

    keys.forEach(key => {
      if (params.hasOwnProperty(key)) {
        sha1Obj[key] = params[key]
      }
    })
    sha1Str = this.sha1Sign(sha1Obj)

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        md5Obj[key] = params[key]
      }
    }
    md5Obj.sha1 = sha1Str
    md5Str = this.md5Sign(md5Obj)
    params['sign'] = md5Str

    return params
  }
}

let commonService = new CommonService()

export default commonService