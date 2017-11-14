import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'


@Component
export default class UserInfoComponent extends Vue{
	render(h:CreateElement){
		return(
			<div user-info-component>
				<div class="component-header">
					<i-button type="primary" icon="chevron-left" class="search-btn" on-click={()=>{this.$router.go(-1)}}>返回</i-button>
				</div>
			</div>
		)
	}
	userId:number = -1
	created() {
		this.userId = parseInt(this.$route.params.userId,10)
		UserService.getUser(this.userId)
	}
}