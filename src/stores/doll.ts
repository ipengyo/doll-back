import { DollInfo, BoxInfo ,ProductsInfo } from '../types/model'
class Doll {
  dollList: DollInfo[] = []
  dollInfo = new DollInfo()
  total = 0
  currentPage = 1
  pageSize = 15
  boxesList: BoxInfo[] = []
  boxInfo: BoxInfo = {
    name: '',
    dollIds: [],
    id: null,
    status: ''
  }
  product:ProductsInfo
  productList: ProductsInfo[] = []
}
let doll = new Doll()
export default doll