import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

import './login.component.styl'
import userService from '../../services/user.service'
import commonService from '../../services/common.service'

@Component
export default class LoginComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div login-component>
        <div class="login-box">
          <div class="logo-wrap">娃娃乐后台业务管理系统</div>
          <i-input type="text" size="large" class="login-input" placeholder="用户名" on-on-enter={this.login} on-input={(val: string) => this.name = val}></i-input>
          <i-input type="password" size="large" class="login-input" placeholder="密码" on-on-enter={this.login} on-input={(val: string) => this.pwd = val} />
          <i-button type="info" disabled={this.disabled} class="login-button" on-click={this.login}>{this.loginText}</i-button>
        </div>
      </div>
    )
  }
  /**
   * 用户名
   */
  name: string = ''

  /**
   * 密码
   */
  pwd: string = ''

  /**
   * 登录状态
   */
  state: string = 'waiting'

  /**
   * 登录按钮提示文字
   */
  get loginText(): string {
    if (this.state === 'processing') {
      return '正在登录'
    } else {
      return '登录'
    }
  }

  /**
   * 登录按钮禁用状态
   */
  get disabled(): boolean {
    return (this.name === '' || this.pwd === '' || this.state === 'processing')
  }

  /**
   * 执行登陆操作
   */
  login() {
    this.state = 'processing'
    userService.login(this.name, this.pwd).then((result) => {
      if (result.status === 200) {
        this.state = 'waiting'
        window.location.href="./index.html"
      } else {
        this.$Message.warning(result.message)
      }
    })

  }

  mounted() {
    userService.test('heh')
  }
}