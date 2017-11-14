import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import store from '../../stores/store'
import commonService from '../../services/common.service'

import './app.component.styl'

@Component
export default class AppComponent extends Vue {

  render(h: CreateElement) {
    let navMenu
    if (this.showMenu) {
      navMenu = <div class="nav-menu">
        <em></em>
        <span></span>
        <div class="nav-menu-item">修改密码</div>
      </div>
    }
    return (
      <div app-component>
        <div class="app-header">
          <div class="header-left">
            娃娃乐后台管理
          </div>
          <div class="header-right">
            <span class="nav-username">admin</span>
            <div class="logout">退出</div>
            <div class="user-avatar">
              {/* <i class="icon-user-img-down-arrow" /> */}
              <div class="user-img"></div>
              {navMenu}
            </div>
          </div>
        </div>
        <div class="app-nav">
          <i-menu theme="dark" on-on-select={this.handleSelect} active-name={store.common.activeIndex} open-names={['operation', 'finance', 'systemSet']}>
            <menu-item name="dolls">
              <icon type="android-apps"></icon>
              doll管理
            </menu-item>
            <menu-item name="boxes">
              <icon type="ios-list"></icon>
              娃娃机管理
            </menu-item>
            <menu-item name="skus">
              <icon type="ios-box"></icon>
              商品管理
            </menu-item>
            <menu-item name="user">
              <icon type="android-people"></icon>
              用户管理
            </menu-item>
            <menu-item name="order">
              <icon type="ios-cart"></icon>
              订单管理
            </menu-item>
            <menu-item name="delivery">
              <icon type="android-bus"></icon>
              发货管理
            </menu-item>
          </i-menu>
        </div>
        <div class="app-content">
          <router-view></router-view>
        </div>
      </div>
    )
  }

  showMenu: boolean = false

  handleSelect(name: string | number) {

    if (name == 'partner' || name == 'groundSell') {
      this.$router.push('/sells/' + name)
    } else {
      this.$router.push('/' + name)
    }
    
  }


  created() {

  }

  mounted() {
    document.addEventListener('click', () => {
      this.showMenu = false
    })
  }
}