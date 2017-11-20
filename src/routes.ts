import { RouteConfig } from 'vue-router'
import DollsComponent from './components/doll/dolls.component'
import EditDoll from './components/doll/edit-doll'
import EditBox from './components/boxes/edit-box'
import BoxesComponent from './components/boxes/box.component'
import skusComponent from './components/skus/skus.component'
import UserComponent from './components/user/user.component'
import OrderComponent from './components/order/order.component'
import DeliveryComponent from './components/delivery/delivery.component'
import UserInfoComponent from './components/user/userInfo.component'
import OrderInfoComponent from './components/order/orderInfo.component'
import orderComponent from './components/order/order.component';

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
  path: '/box/:boxId',
  component: EditBox
}, {
  path: '/user',
  component: UserComponent
}, {
  path: '/order',
  component: OrderComponent
}, {
  path: '/delivery',
  component: DeliveryComponent
}, {
  path: '/userInfo/:userId',
  component: UserInfoComponent
}, {
  path: '/order/:orderid',
  component: OrderInfoComponent
}]

export default routes