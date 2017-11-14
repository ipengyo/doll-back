import { DollsInfo } from './model'
/**
 * 通用接口返回
 */
export class CommonResponse {
  stat: string
  errText?: string
  [propName: string]: any
}
/**
 * 登录接口返回
 */
export class LoginResponse extends CommonResponse {
  token: string
}
/**
 * 娃娃列表
 */
export class DollListsResponse extends CommonResponse {
  dolls: DollsInfo
}


