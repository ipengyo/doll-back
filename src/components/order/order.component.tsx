import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'
import commonService from '../../services/common.service'
import orderService from '../../services/order.service'

@Component
export default class orderComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div order-component>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.order.orderLists} />
        </div>
        <div class="page-wrap">
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
          {params.row.order.orderStatus}
        </div>
      )
    }
  }, {
    title: '订单金额',
    key: 'orderPrice',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.order.orderPrice}
        </div>
      )
    }
  }, {
    title: '订单状态',
    key: 'orderStatus',
    align: 'center',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.order.orderStatus === 2 ? <tag color="green">已完成</tag> : <tag color="red">用户已取消</tag> }
        </div>
      )
    }
  }, {
    title: '用户昵称',
    key: 'name',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.user.name}
        </div>
      )
    }
  }, {
    title: '用户渠道',
    key: 'ch',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.user.ch}
        </div>
      )
    }
  }, {
    title: '联系方式',
    key: 'phone',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.user.phone}
        </div>
      )
    }
  }, {
    title: '用户id',
    key: 'uid',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.user.uid}
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
    key: 'productName',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.product && params.row.product.productName}
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

  get tableHeight() {
    return document.body.clientHeight - 150;
  }

  created() {
    store.common.activeIndex = 'order'
    orderService.getOrders()
  }
}