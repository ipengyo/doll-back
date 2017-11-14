interface deliveryInfo {
	uid:number,
	name:string,
	dollName:string,
	// exchangeTime:number,
	recharge:number,
	status:string
}
class Delivery {
	deliveryLists: deliveryInfo[] = []
	currentIndex = 1
	total = 0
	pageSize = 1000
}

let delivery = new Delivery()

export default delivery