import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'
import EditUserComponent from './editUser.component'
import { EditUser, UserNew } from '../../types/model'

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
						<tag v-show={store.user.getUser.status === 1} color="green">正常</tag>
						<tag v-show={store.user.getUser.status === 4} color="red">禁止</tag>
						<i-button on-click={this.changeStatus}>更改</i-button>
					</div>
					<div class="list-item">
						<label>用户渠道：</label>{store.user.getUser.channel}
					</div>
					<div class="list-item">
						<label>用户密码：</label>{store.user.getUser.password}
					</div>
					<div class="list-item">
						<label>用户联系电话：</label>{store.user.getUser.phone}
					</div>
					<div class="list-item">
						<label>用户联系地址：</label>{store.user.getUser.address}
					</div>
					<div class="list-item">
						<label>用户图片：</label>
						<img />
					</div>
				</div>
				<div class="component-list">
					<div class="list-item">
						<label>用户硬币数量：</label>{store.user.coinInfo.coin}
					</div>
				</div>
				<div class="component-list">
					<div class="list-item">
						<label>设置硬币变更数（正数表示添加，负数表示减少）：</label>
						<i-input type="text" value={this.coinChange} placeholder='变更硬币数量，正数表示添加，负数表示减少' on-input={(val: number) => this.coinChange = val} />
						<i-button on-click={this.changeCoinNum}>修改</i-button>
					</div>
				</div>
				<div class="component-footer">
					<i-button type="primary" class="search-btn" on-click={this.editUser}>编辑用户信息</i-button>
				</div>
			</div>
		)
	}
	coinChange: number = 0;
	userId: number = -1
	editUser() {
		let component = new EditUserComponent().$mount()
		document.body.appendChild(component.$el)
		component.$props.title = '编辑用户'
		component.$on('ok', (userInfo: EditUser) => {
			UserService.editUser(userInfo).then((data: any) => {
				if (data.status === 'OK') {			
					this.$Message.success('添加成功')
				} else {
					this.$Message.error(data.stat)
				}
			})
		})
	}
	//更改状态
	changeStatus() {
		UserService.illegalUser(this.userId).then(() => {
			UserService.getUser(this.userId)
		})
	}
	//修改硬币数
	changeCoinNum() {
		UserService.editCoins(this.userId, this.coinChange).then(data => {
			if (data.status === 200) {		
				store.user.coinInfo.coin = store.user.coinInfo.coin + Number(this.coinChange)	
				this.$Message.success("硬币数量修改成功");		
			}
		})
	}
	
	created() {
		this.userId = parseInt(this.$route.params.userId, 10)
		UserService.getUser(this.userId)
	}
}