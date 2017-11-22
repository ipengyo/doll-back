import httpService from './http.service'
import { CommonResponse, DeliverysResponse, DeliveryInfoResponse } from '../types/response'
import store from '../stores/store'
import { reject, resolve } from 'bluebird';

class DeliveryService {
	/**
	 * 获取发货列表
	 */
	getDeliverys(): Promise<DeliverysResponse> {
		let start = (store.delivery.currentIndex - 1), size = store.delivery.pageSize
		return new Promise((resolve, reject) => {
			httpService.ajax<DeliverysResponse>({
				url: '/admin/gifts',
				methods: 'GET',
				data: { start, size }
			}).then(result => {
				if (result.status === 200) {
					store.delivery.deliveryLists = result.gifts;
					store.delivery.total = result.totalElements;
				}
				resolve(result)
			}).catch(error => {
				reject(error)
			})
		})
	}

	/**
	 * 根据发货状态查询
	 * @param status 
	 */
	searchByStatus(status: string) {
		store.delivery.deliveryLists = [];
		return new Promise((resolve, reject) => {
			httpService.ajax<CommonResponse>({
				url: `/admin/gift/`,
				methods: 'GET',
				data:{status}
			}).then(result => {
				if (result.status === 200) {
					store.delivery.deliveryLists = result.gifts;
				}
				resolve(result)
			}).catch(error => {
				reject(error)
			})
		})
	}

	/**
	 * 管理员通过礼物id更新礼物状态
	 * @param giftId 
	 */
	setGiftStatus(giftId: number, status: string) {
		return new Promise((resolve, reject) => {
			httpService.ajax({
				url: '/admin/gift',
				methods: 'PUT',
				data: { giftId: giftId, status: status }
			}).then(result => {
				resolve(result)
			}).catch(error => {
				reject(error)
			})
		})
	}

	/**
	 * 管理员通过用户id获取礼物列表
	 * @param uid 
	 */
	getGiftInfoByUid(uid: number): Promise<DeliveryInfoResponse> {
		return new Promise((resolve, reject) => {
			httpService.ajax<DeliveryInfoResponse>({
				url: `/admin/gift/${uid}`,
				methods: 'GET'
			}).then(result => {
				resolve(result)
			}).catch(err => [
				reject(err)
			])
		})
	}
}
let deliveryService = new DeliveryService()

export default deliveryService