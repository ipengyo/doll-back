import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'
import { UserNew } from '../../types/model'

import './user.component.styl'
import { CreateBoxRequest } from '../../types/request';
import { ColorAxisOptions } from 'highcharts';

@Component
export default class UserComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div user-component>
        <div class="component-header">
          <i-input class="search-ipt"
            placeholder="输入用户名搜索用户"
            value={this.name}
            on-input={(val: string) => { this.name = val }}
            on-on-enter={this.searchByName}
          ></i-input>
          <i-button type="primary" icon="ios-search" class="search-btn" on-click={this.searchByName}>查询</i-button>
          {/* <i-button type="primary" on-click={() => this.addUser(this.data)}><icon type="plus-round"></icon>添加用户信息</i-button> */}
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.user.getUsers} />
        </div>
        <div class="page-wrap">
          <page class="pager" current={store.user.currentIndex} total={store.user.total} page-size={store.user.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }

  name: string = ''

  columns: ColumnOption[] = [{
    title: '用户id',
    key: 'uid',
    align: 'center',
    width: 100
  }, {
    title: '用户名',
    key: 'name'
  }, {
    title: '渠道号',
    key: 'channel'
  }, {
    title: '用户状态',
    key: 'status',
    render: (h:CreateElement, params:ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button v-show={params.row.status === 1} type="success" size="small">正常</i-button>
          <i-button v-show={params.row.status === 4} type="error" size="small">禁止</i-button>
        </div>
      )
    }
  },{
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 180,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleEdit(params.row.uid) }}>查看详情</i-button>
        </div>
      )
    }
  }]
  handleEdit(id: number) {
    this.$router.push("/userInfo/" + id)
  }
  pageIndexChanged(val: string) {
    store.user.currentIndex = parseInt(val, 10)
    UserService.getUsers()
  }

  searchByName() {
    UserService.searchUserByName(this.name)
  }

  get tableHeight() {
    return document.body.clientHeight - 200;
  }
  //adduser test
  // data = {
  //   name: 'xiaofeiji',
  //   password: 'userobjpassword',
  //   openid: 'sjhdjsjabo',
  //   ch: 'userobjch',
  //   image: 'userobjimage'
  // }
  // addUser(data: UserNew) {
  //   console.log(111)
  //   UserService.addUser(this.data)
  // }

  created() {
    store.common.activeIndex = 'user'
    UserService.getUsers()
  }
}