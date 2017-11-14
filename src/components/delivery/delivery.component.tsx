import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'

import commonService from '../../services/common.service'
import deliveryService from '../../services/delivery.service'

import './delivery.component.styl'

@Component
export default class DeliveryComponent extends Vue {
  //<template></template>
  render(h: CreateElement) {
    return (
      <div delivery-component>
        <div class="component-header">
         	<i-select class="search-exchange search-ipt" value={this.status} placeholder='请选择发货状态' on-input={(val: string) => {this.status = val}} on-on-enter = {this.searchByStatus}>
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
    title: '用户昵称',
		key: 'name',
		render: (h:CreateElement,params:ColumnRenderParams) => {
			return(
				<div class="opt-column">
					{params.row.name}
				</div>
			)
		}
  }, {
    title: '兑换物品名',
		key: 'dollName',
		render: (h:CreateElement,params:ColumnRenderParams) => {
			return(
				<div class="opt-column">
					{params.row.dollName}
				</div>
			)
		}
  },{
  //   title: '兑换时间',
	// 	key: 'exchangeTime',
	// 	render: (h: CreateElement, params: ColumnRenderParams) => {
  //     return (
  //       <div class="opt-column">
  //         {commonService.dateTime(params.row.exchangeTime)}
  //       </div>
  //     )
  //   }
  // }, {
    title: '充值总金额',
		key: 'recharge',
		render: (h:CreateElement,params:ColumnRenderParams) => {
			return(
				<div class="opt-column">
					{params.row.recharge}
				</div>
			)
		}
  }, {
    title: '物流信息',
		key: 'status',
		render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row.status}
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
          <i-button type="text" class="opt-col-btn" on-click={() => {}}>修改物流信息</i-button>
        </div>
      )
    }
  }]
	searchByStatus(){
		deliveryService.searchByStatus(this.status);
	}
	pageIndexChanged(val:string){
		store.user.currentIndex = parseInt(val, 10)
    deliveryService.getDeliverys()
  }
  get tableHeight() {
    return document.body.clientHeight - 200;
  }

	created() {		
    store.common.activeIndex = 'delivery'
		deliveryService.getDeliverys()
  }
}