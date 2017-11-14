import { DollInfo } from '../types/model'
class Doll {
  dollList: DollInfo[] = []
  dollInfo = new DollInfo()
  total = 0
  currentPage = 1
  pageSize = 15
  boxesList: any = []
  boxInfo: any = {
    name: '',
    dolls: [],
    boxid: '',
    status: ''
  }
  productList: any = []
}
let doll = new Doll()
export default doll