import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'
import commonService from '../../services/common.service'
import orderService from '../../services/order.service'
import { CreateBoxRequest } from '../../types/request';

@Component
export default class orderComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div order-component>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.order.orderLists} />
        </div>
        <div class="component-footer">
          <page class="pager" current={store.order.currentIndex} total={store.order.total} page-size={store.order.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }

  name: string = ''

  columns: ColumnOption[] = [{
    title: '序号',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row._rowKey}
        </div>
      )
    }
  }, {
    title: '订单金额',
    key: 'price',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.order.price}
        </div>
      )
    }
  }, {
    title: '订单状态',
    key: 'status',
    align: 'center',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.order.status === 2 ? <tag color="green">已完成</tag> : <tag color="red">用户已取消</tag> }
        </div>
      )
    }
  }, {
    title: '用户昵称',
    key: 'name',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {/* {params.row.user.name} */}
          {(params.row.hasOwnProperty('user'))?params.row.user.name:'nameTest'}
        </div>
      )
    }
  }, {
    title: '用户渠道',
    key: 'ch',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {/* {params.row.user.ch} */}
          {(params.row.hasOwnProperty('user'))?params.row.user.ch:'chTest'}
        </div>
      )
    }
  }, {
    title: '联系方式',
    key: 'phone',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {/* {params.row.user.phone} */}
          {(params.row.hasOwnProperty('user'))?params.row.user.phone:'phoneTest'}
        </div>
      )
    }
  }, {
    title: '用户id',
    key: 'uid',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {/* {params.row.user.uid} */}
          {(params.row.hasOwnProperty('user'))?params.row.user.uid:'uidTest'}
        </div>
      )
    }
  }, {
    title: '创建时间',
    key: 'createTime',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {commonService.dateTime(params.row.order.createTime)}
        </div>
      )
    }
  }, {
    title: '订单号',
    key: 'orderNumber',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.order.orderNumber}
        </div>
      )
    }
  }, {
    title: '商品名称',
    key: 'name',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {(params.row.hasOwnProperty('prodcut'))?params.row.prodcut.name:'productTest'}
        </div>
      )
    }
  }, {
    title: '操作',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={(orderId:number)=>{this.getOrder(params.row.order.id)}}>订单详情</i-button>
        </div>
      )
    }
  }]
  pageIndexChanged(val: string) {
    store.order.currentIndex = parseInt(val, 10)
    orderService.getOrders()
  }

  searchByName() {
    // orderService.searchorderByName(this.name)
  }

  getOrder(orderId: number) {
    this.$router.push("/order/" + orderId)
  }

  get tableHeight() {
    return document.body.clientHeight - 150;
  }

  created() {
    store.common.activeIndex = 'order'
    orderService.getOrders()
  }
}