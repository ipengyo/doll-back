import { orderInfo } from '../types/model'

class Order {
  orderInfo = new orderInfo()
  orderLists: orderInfo[] = []
  currentIndex = 1
  total = 0
  pageSize = 150
 }

let order = new Order()

export default order