import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'

import './user.component.styl'

@Component
export default class SkusComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div skus-component>
        <div class="component-table">
          <i-table columns={this.columns} data={store.user.userLists} />
        </div>
        <div class="page-wrap">
          <page class="pager" current={store.user.currentIndex} total={store.user.total} page-size={store.user.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }
 
  columns: ColumnOption[] = [{
    title: '用户名',
    key: 'name'
  }, {
    title: '渠道号',
    key: 'ch'
  }, {
    title: 'openid',
    key: 'openid'
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

  created() {
    store.common.activeIndex = 'user'
    UserService.getUsers()
  }
}