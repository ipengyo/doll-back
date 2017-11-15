import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Form, FormRule } from 'iview'

import store from '../../stores/store'
import getUser from '../../stores/user'
import { EditUser } from '../../types/model'

import commonService from '../../services/common.service'
import UserService from '../../services/user.service'


@Component
export default class EditUserComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div editUser-component>
				<modal
					value={this.visible}
					title={this.title}
					mask-closable={false}
					on-on-hidden={this.close}
					loading={true}
				>
					<div class="add-doll" >
						<i-form ref="doll" model={this.user} label-width={120} >
							<form-item label="用户名称：" prop="name">
								<i-input type="text" value={this.userInfo.name} placeholder='填写名称' on-input={(val: string) => this.userInfo.name = val} />
							</form-item>
							<form-item label="用户电话：" prop="phone">
								<i-input type="text" value={this.userInfo.phone} placeholder="填写电话" on-input={(val: string) => this.userInfo.phone = val} />
							</form-item>
							<form-item label="用户地址：" prop="address">
								<i-input type="text" value={this.userInfo.address} placeholder='商品数量' on-input={(val: string) => this.userInfo.address = val} />
							</form-item>
							<form-item label="用户图片：" prop="pieceCount">
								<img />
								<upload
									ref="upload"
									show-upload-list={true}
									format={['jpg', 'jpeg', 'png']}
									max-size={5120}
									type="drag"
									action={`/picture/user/{this.userId}`}
									style="display: inline-block;width:58px;">
									<div style="width: 58px;height:58px;line-height: 58px;">
										<icon type="camera" size="20"></icon>
									</div>
								</upload>
							</form-item>
						</i-form>
					</div>
					<div slot="footer">
						<i-button type="text" on-click={this.cancel}>取消</i-button>
						<i-button type="primary" on-click={() => this.ok('doll')}>确定</i-button>
					</div>
				</modal>
			</div>
		)
	}

	user: EditUser = {
		uid: null,
		name: '',
		phone: '',
		address: '',
		image: '',
		channel: 'ch'
	}
	get userInfo(): EditUser {
		return store.user.getUser
	}
	userId: number = -1

	@Prop()
	title: string

	visible: boolean = false

	name: string = ''

	close() {

		this.$el.parentNode.removeChild(this.$el)
	}

	cancel() {
		this.visible = false
	}

	ok(name: string) {
		(this.$refs[name] as Form).validate((valid: boolean) => {
			if (valid) {
				setTimeout(this.cancel, 2000)
				this.$emit('ok', this.userInfo)
			} else {
				this.$Modal.warning({
					content: '请将内容填写完整'
				})
			}
		})
	}

	created() {
		this.userId = store.user.getUser.uid;
	}
	mounted() {
		this.visible = true
	}
}
