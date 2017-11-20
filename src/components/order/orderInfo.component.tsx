import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import commonService from '../../services/common.service'
import orderService from '../../services/order.service'
import { orderInfo, Order } from '../../types/model'


@Component
export default class OrderInfoComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div OrderInfo-component>
				<div class="component-header">
					<i-button type="primary" icon="chevron-left" class="search-btn" on-click={() => { this.$router.go(-1) }}>返回</i-button>
				</div>
				<div class="component-list">
					<div class="list-item">
						<label>订单编号:</label>{/*{store.order.orderInfo.order.orderNumber} */} {this.orderInfo.orderNumber}
					</div>
					<div class="list-item">
						<label>订单金额：</label>{/*{store.order.orderInfo.order.orderNumber}*/} {this.orderInfo.price}
					</div>
					<div class="list-item">
						<label>订单状态：</label>{/*{store.order.orderInfo.order.status}*/} {this.orderInfo.status}
					</div>
          <div class="list-item">
						<label>商品名称：</label>{/*{store.order.orderInfo.product.name}*/} {this.orderInfo.productId}
					</div>
          <div class="list-item">
						<label>用户昵称：</label>{/*{store.order.orderInfo.user.name}*/} {this.orderInfo.uid}
					</div>
					<div class="list-item">
						<label>用户渠道：</label>{/*{store.order.orderInfo.user.ch}*/} {this.orderInfo.uid}
					</div>
					<div class="list-item">
						<label>收货地址：</label>{/*{store.order.orderInfo.user.address}*/} {this.orderInfo.uid}
					</div>
					<div class="list-item">
						<label>创建时间：</label>{/*{store.order.orderInfo.order.createTime}*/} {this.orderInfo.createTime}
					</div>
				</div>
				
				<div class="component-footer">
					
				</div>
			</div>
		)
	}

  orderId: number = -1

  get orderInfo() {
    return store.order.orderx
  }

	created() {
    this.orderId = parseInt(this.$route.params.orderid, 10)
    orderService.getOrderById(this.orderId)
	}
}