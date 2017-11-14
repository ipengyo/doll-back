import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'

import iView from 'iview'
import * as _promise from 'bluebird'
window['Promise'] = _promise

Vue.use(VueRouter)
Vue.use(iView)

import 'iview/dist/styles/iview.css'
import './assets/css/style.styl'
import AppComponent from './components/app/app.component'
import store from './stores/store'
import routes from './routes'
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  data: store,
  router,
  render(h: CreateElement) {
    return (
      <AppComponent />
    )
  }
})