import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'

import './user.component.styl'

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
            on-on-enter = {this.searchByName}
          ></i-input>
          <i-button type="primary" icon="ios-search" class="search-btn" on-click={this.searchByName}>查询</i-button>
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.user.userLists} />
        </div>
        <div class="page-wrap">
          <page class="pager" current={store.user.currentIndex} total={store.user.total} page-size={store.user.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }

  name: string = ''

  columns: ColumnOption[] = [{
    title: '用户名',
    key: 'name'
  }, {
    title: '渠道号',
    key: 'ch'
  }, {
    title: '用户id',
    key: 'uid'
  }, {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 180,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn">查看详情</i-button>
        </div>
      )
    }
  }]

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

  created() {
    store.common.activeIndex = 'user'
    UserService.getUsers()
  }
}