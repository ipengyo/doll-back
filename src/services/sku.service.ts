import httpService from './http.service'
import { CommonResponse,SkuListsResponse } from '../types/response'
import store from '../stores/store'
import {AddSku } from '../types/model'

class DollService {
  //添加商品
  addProduct(skuInfo: AddSku): Promise<CommonResponse> {

    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/product',
        data: skuInfo,
        methods: "POST"
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //获取商品信息列表
  getProductList():Promise<SkuListsResponse>{

    return new Promise((resolve, reject) => {
      httpService.ajax<SkuListsResponse>({
        url: '/game/products',
        methods: "GET"
      }).then(result => {
        store.doll.productList = result.products
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
  //删除商品
  deleteProduct(id: number) {

    return new Promise((resolve, reject) => {
      httpService.ajax({
        url: '/admin/product',
        data: {productId: id},
        methods: 'DELETE'
      }).then(result => {
        dollService.getProductList()
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
let dollService = new DollService()

export default dollService