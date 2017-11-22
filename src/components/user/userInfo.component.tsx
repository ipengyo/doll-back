import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'
import EditUserComponent from './editUser.component'
import { EditUser, UserNew, addressInfo } from '../../types/model'

import './user.component.styl'

@Component
export default class UserInfoComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div userInfo-component>
				<div class="component-header">
					<i-button type="primary" icon="chevron-left" class="search-btn" on-click={() => { this.$router.go(-1) }}>返回</i-button>
				</div>
				<div class="component-list">
					<div class="list-item">
						<label>用户名称:</label>{store.user.getUser.name}
					</div>
					<div class="list-item">
						<label>用户ID：</label>{store.user.getUser.uid}
					</div>
					<div class="list-item">
						<label>用户openID：</label>{store.user.getUser.openId}
					</div>
					<div class="list-item">
						<label>用户状态：</label>
						<i-button size="small" v-show={store.user.getUser.status === 1} type="success" on-click={this.changeIllega}>正常</i-button>
						<i-button size="small" v-show={store.user.getUser.status === 4} type="error" on-click={this.changeNormal}>禁止</i-button>
						<i-button v-show={store.user.getUser.status === 2} type="primary" size="small" disabled>已删除</i-button>
						<alert closable v-show={store.user.getUser.status != 2}>点击按钮可修改用户状态</alert>
					</div>
					<div class="list-item">
						<label>用户渠道：</label>{store.user.getUser.channel}
					</div>
					<div class="list-item">
						<label>用户充值总金额：</label>{this.totalPrice}
					</div>
					<div class="list-item">
						<label>用户联系电话：</label>{store.user.getUser.phone}
					</div>
					<div class="list-item">
						<label>收货信息：</label>{store.user.getUser.address}
					</div>
					<div class="list-item">
						<label>用户图片：</label>
						<img src={store.user.getUser.imageUrl} />
					</div>
				</div>
				<div class="component-list">
					<div class="list-item">
						<label>用户硬币数量：</label>{store.user.coinInfo.coin}
					</div>
				</div>
				<div class="component-list">
					<div class="list-item">
						<label>设置硬币变更数：</label>
						<tooltip content="变更硬币数量,正数表示添加，负数表示减少" class="number-ipt">
							<input-number value={this.coinChange} on-input={(val: number) => this.coinChange = val} />
						</tooltip>
						<i-button type="info" on-click={this.changeCoinNum} icon="edit" v-show={store.user.getUser.status != 2}>保存设置</i-button>
					</div>
				</div>
				<div class="component-footer">
					<i-button type="primary" class="search-btn" on-click={this.editUser} v-show={store.user.getUser.status != 2}>编辑用户收货信息</i-button>
				</div>
			</div>
		)
	}
	coinChange: number = 0
	userId: number = -1
	totalPrice: number = 0

	//修改用户收货信息
	editUser() {
		let component = new EditUserComponent().$mount()
		document.body.appendChild(component.$el)
		component.$props.title = '编辑用户收货信息'
		component.$on('ok', (userInfo: EditUser) => {
			UserService.editUser(userInfo).then((data: any) => {
				if (data.status === 200) {
					this.$Message.success('修改成功')
				} else {
					this.$Message.error(data.stat)
				}
			})
		})
	}
	//更改状态
	changeIllega() {
		UserService.illegalUser(this.userId).then(data => {
			if (data.status === 200) {
				UserService.getUser(this.userId)
				this.$Message.success("用户禁用成功！");
			}
		})
	}
	changeNormal() {
		UserService.normalUser(this.userId).then(data => {
			if (data.status === 200) {
				UserService.getUser(this.userId)
				this.$Message.success("用户已恢复正常！");
			}
		})
	}
	//修改硬币数
	changeCoinNum() {
		if (this.coinChange === 0) {
			this.$Message.info("变更数为0，无需修改");
		} else {
			let changeAfter = store.user.coinInfo.coin + Number(this.coinChange)
			if (changeAfter < 0) {
				this.$Message.error("用户硬币数量不能为负！");
			} else {
				UserService.editCoins(this.userId, this.coinChange).then(data => {
					if (data.status === 200) {
						store.user.coinInfo.coin = changeAfter;
						this.$Message.success("硬币数量修改成功");
						this.coinChange = 0;
					}
				})
			}
		}
	}

	created() {
		this.userId = parseInt(this.$route.params.userId, 10)
		this.totalPrice = parseInt(this.$route.params.totalPrice, 10)
		UserService.getUser(this.userId)
	}
}