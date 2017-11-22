import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'

import commonService from '../../services/common.service'
import deliveryService from '../../services/delivery.service'

import './delivery.component.styl'
import EditStatusComponent from './edit-status.component'


@Component
export default class DeliveryComponent extends Vue {
  //<template></template>
  render(h: CreateElement) {
    return (
      <div delivery-component>
        <div class="component-header">
          <i-select class="search-exchange search-ipt" value={this.status} placeholder='请选择发货状态' on-input={(val: string) => { this.status = val }} on-on-enter={this.searchByStatus}>
            <i-option value='sending'>发货中</i-option>
            <i-option value='exist'>未发货</i-option>
            <i-option value='recieved'>已接收</i-option>
          </i-select>
          <i-button type="primary" icon="ios-search" class="search-btn" on-click={this.searchByStatus}>查询</i-button>
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.delivery.deliveryLists} />
        </div>
        <div class="page-wrap">
          <page class="pager" current={store.delivery.currentIndex} total={store.delivery.total} page-size={store.delivery.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }

  status = ''

  columns: ColumnOption[] = [{
    title: '序号',
    width: 60,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row._rowKey}
        </div>
      )
    }
  }, {
    title: '用户昵称',
    key: 'name',
    width: 100,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.user.name}
        </div>
      )
    }
  }, {
    title: '兑换物品名',
    key: 'dollName',
    width: 100,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.doll.name}
        </div>
      )
    }
  }, {
    title: '兑换时间',
    key: 'exchangeTime',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {commonService.dateTime(params.row.gift.createTime)}
        </div>
      )
    }
  }, {
    title: '收货信息',
    key: 'recharge',
    width: 400,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.user.address}
        </div>
      )
    }
  }, {
    title: '物流信息',
    key: 'status',
    width: 100,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      let deliveryStatus = { exist: '未发货', sending: '送货中', recieved: '已收货' }
      return (
        <div class="opt-column">
          <tag color="green" v-show={params.row.gift.status === 'recieved'}>{deliveryStatus[params.row.gift.status]}</tag>
          <tag color="blue" v-show={params.row.gift.status === 'sending'}>{deliveryStatus[params.row.gift.status]}</tag>
          <tag color="red" v-show={params.row.gift.status === 'exist'}>{deliveryStatus[params.row.gift.status]}</tag>
        </div>
      )
    }
  }, {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 180,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={(giftId:number,status:string) => {this.setGiftStatus(params.row.gift.id,params.row.gift.status)}}>修改物流信息</i-button>
        </div>
      )
    }
  }]

  get tableHeight() {
    return document.body.clientHeight - 200;
  }

  searchByStatus() {
    deliveryService.searchByStatus(this.status)
  }

  pageIndexChanged(val: string) {
    store.delivery.currentIndex = parseInt(val, 10)
    deliveryService.getDeliverys()
  }

  setGiftStatus(giftId: number, status: string) {
    let component = new EditStatusComponent().$mount()
    document.body.appendChild(component.$el)
    component.$props.title = '修改物流信息'
    component.$props.status = status
  
    component.$on('ok', (status: string) => {
      deliveryService.setGiftStatus(giftId,status).then((data: any) => {
        if (data.status === 200) {
          this.$Message.success('设置成功')
          deliveryService.getDeliverys()
        } else {
          this.$Message.error(data.stat)
        }
      })
    })
  }

  created() {
    store.common.activeIndex = 'delivery'
    deliveryService.getDeliverys()
  }
}