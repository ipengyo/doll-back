import httpService from './http.service'
import { CommonResponse, SkuListsResponse, SkuResponse } from '../types/response'
import store from '../stores/store'
import { AddSku, ProductsInfo } from '../types/model'

class SkuService {

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
  getProductList(): Promise<SkuResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<SkuResponse>({
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

  //获取商品信息
  getProduct(id: number): Promise<SkuResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<SkuResponse>({
        url: `/admin/product/${id}`,
        data: { productId: id },
        methods: 'GET'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  //删除商品
  deleteProduct(id: number): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/product',
        data: { productId: id },
        methods: 'DELETE'
      }).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  //修改商品
  editProduct(id: number): Promise<CommonResponse> {
    let productObj = store.doll.product
    let params = {
      productId: id,
      productName: store.doll.product.name,
      description: store.doll.product.description,
      price: store.doll.product.price,
      gameCount: store.doll.product.gameCount
    }
    return new Promise((resolve, reject) => {
      httpService.ajax<CommonResponse>({
        url: '/admin/product',
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
let skuService = new SkuService()

export default skuService