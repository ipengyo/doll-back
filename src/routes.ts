import { RouteConfig } from 'vue-router'


import DollsComponent from './components/doll/dolls.component'
import EditDoll from './components/doll/edit-doll'
import EditBox from './components/boxes/edit-box'
import BoxesComponent from './components/boxes/box.component'
import skusComponent from './components/skus/skus.component'
import UserComponent from './components/user/user.component'
import OrderComponent from './components/order/order.component'
import DeliveryComponent from './components/delivery/delivery.component'

const routes: RouteConfig[] = [{
  path: '/',
  redirect: '/dolls'
}, {
  path: '/dolls',
  component: DollsComponent
}, {
  path: '/editDoll/:dollId',
  component: EditDoll
}, {
  path: '/skus',
  component: skusComponent
}, {
  path: '/boxes',
  component: BoxesComponent
}, {
  path: '/editBox/:boxId',
  component: EditBox
}, {
  path: '/user',
  component: UserComponent
}, {
  path: '/order',
  component: OrderComponent
},{
  path: '/delivery',
  component:DeliveryComponent
}]

export default routes