import { IntegralInfo, LogisticsInfo, ShipperInfo, DistributionRecordInfo, OrderInfo, DistributionInfo, OrderAllType, OrderStatistics, ReportInfo, SkuInfo, ToDealLists, UserInfo, DataStatistics } from './model'
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



