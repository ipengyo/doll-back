class Doll {
  dollList: any = []
  boxesList: any = []
  dollInfo: any = {
    name: '',
    status: '',
    count: null,
    pieceCount: null,
    rarePieces: [],
    price: ''
  }
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