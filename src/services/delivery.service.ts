import httpService from './http.service'
import { CommonResponse } from '../types/response'
import store from '../stores/store'

class DeliveryService {
	deliveryStatus:any;
	constructor(){
		this.deliveryStatus = {exist:'未发货',sending:'送货中',recieved:'已收货'}
	}
	getDeliverys() {
		return new Promise((resolve, reject) => {
			httpService.post<CommonResponse>({
				url: '/doll/api/admin',
				data: {
				params: JSON.stringify({
					api: 'getAllUserGifts',
				})
				}
			}).then(result => {
				if (result.stat === 'OK') {
					let gifts = result.gifts
					gifts.map((row:any) =>{
						let user = row.user.name;
						let uid = row.user.uid;
						let items;
						let total:number;
						this.getUserOrdes(uid).then((data:any) => {
							if(data.stat==='OK'){
								total = data.total;	
								for(let key in this.deliveryStatus){
									row[key].map((info:any) => {
										items = {
											uid : uid,
											name:user,
											dollName:info.doll.name,
											// exchangeTime:,
											recharge:total,
											status:this.deliveryStatus[key],
										}
										store.delivery.deliveryLists.push(items);
									})
								}
							}
						}).catch(error => {
							reject(error)
						});
					})
				}
				resolve(result)
			}).catch(error => {
				reject(error)
			})
		})
	}
	//根据发货状态查询
	searchByStatus(status:string) {
		store.delivery.deliveryLists = [];
		return new Promise((resolve,reject)=>{
			httpService.post<CommonResponse>({
				url: '/doll/api/admin',
				data: {
					params:JSON.stringify({
						api:'searchGiftByStatus',
						status:status
					})
				}
			}).then(result => {
				if (result.stat === 'OK') {
					let gifts = result.gifts;
					gifts.map((row:any) => {
						let user = row.user.name;
						let uid = row.user.uid;
						let items;
						let total:number;
						this.getUserOrdes(uid).then((data:any) => {
							if(data.stat==='OK'){
								total = data.total;
								row[status].map((info:any) => {
									items = {
										uid : uid,
										name:user,
										dollName:info.doll.name,
										// exchangeTime:,兑换时间
										recharge:total,
										status:this.deliveryStatus[status],
									}
									store.delivery.deliveryLists.push(items);
								});
							}
						}).catch(error => {
							reject(error)
						})
					})
				}
				resolve(result)
			}).catch(error =>{
				reject(error)
			})
		})
	}
	//获取用户订单接口
	getUserOrdes(uid:number) {
		return new Promise((resolve,reject)=>{
			httpService.post<CommonResponse>({
				url: '/doll/api/admin',
				data: {
					params: JSON.stringify({
						api: 'getUserOrdes',
						uid: uid
					})
				}
			}).then(result => {
				resolve(result)
			}).catch(error => {
				reject(error)
			})
		})
	}
}
let deliveryService = new DeliveryService()

export default deliveryService