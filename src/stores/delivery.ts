import { giftInfo, gift } from '../types/model'

class Delivery {
	deliveryInfo: gift[] = []
	deliveryLists: giftInfo[] = []
	currentIndex = 1
	total = 0
	pageSize = 50
}

let delivery = new Delivery()

export default delivery