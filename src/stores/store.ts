import common from './common'
import doll from './doll'
import user from './user'
import order from './order'
import delivery from './delivery'
class Store {
  common = common
  doll = doll
  user = user
  order = order
  delivery = delivery
}

const store = new Store()

export default store