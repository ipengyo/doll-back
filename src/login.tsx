import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'

import iView from 'iview'
import * as _promise from 'bluebird'
window['Promise'] = _promise

Vue.use(VueRouter)
Vue.use(iView)

import 'iview/dist/styles/iview.css'
import './assets/css/style.styl'
import LoginComponent from './components/login/login.component'
import store from './stores/store'

new Vue({
  el: '#app',
  data: store,
  render(h: CreateElement) {
    return (
      <LoginComponent />
    )
  }
})