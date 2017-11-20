import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Form, FormRule } from 'iview'

import store from '../../stores/store'
import getUser from '../../stores/user'
import { addressInfo } from '../../types/model'

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
						<i-form ref="doll" model={this.addressInfo} rules={this.ruleUsers} label-width={120} >
							<form-item label="收货人姓名：" prop="name">
								<i-input type="text" value={this.addressInfo.name} placeholder="请输入收货人姓名" on-input={(val: string) => this.addressInfo.name = val} />
							</form-item>
							<form-item label="收货电话：" prop="phone">
								<i-input type="text" value={this.addressInfo.phone} placeholder="请输入收货人电话" on-input={(val: number) => this.addressInfo.phone = val} />
							</form-item>
							<form-item label="收货地址：" prop="address">
								<i-input type="text" value={this.addressInfo.address} placeholder='请输入收货地址' on-input={(val: string) => this.addressInfo.address = val} />
							</form-item>
							{/* <form-item label="用户图片：" prop="imgurl">
								<img />
								<upload
									ref="upload"
									show-upload-list={true}
									format={['jpg', 'jpeg', 'png']}
									max-size={5120}
									type="drag"
									action={`/picture`}
									on-on-success={(response: object, file: File, fileList: FileList) => {alert(111)}}
									style="display: inline-block;width:58px;">
									<div style="width: 58px;height:58px;line-height: 58px;">
										<icon type="camera" size="20"></icon>
									</div>
								</upload>
							</form-item> */}
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

	ruleUsers: FormRule = {
		name: [
			{ required: true, message: '请输入用户地址', trigger: 'blur' }
		],
		phone: [
			{ required: true, message: '请输入手机号码', trigger: 'blur' },
			{ pattern: /^0?(13|14|15|17|18)[0-9]{9}$/, message: '手机格式不正确', trigger: 'blur' }
		],
		address: [
			{ required: true, message: '请输入用户地址', trigger: 'blur' }
		]
	}
	//收货信息
	get addressInfo(): addressInfo {
		if (store.user.getUser.address) {
			return JSON.parse(store.user.getUser.address)
		} else {
			let addressJson = {
				name: '',
				phone: '',
				address: ''
			}
			store.user.getUser.address = JSON.stringify(addressJson);
			return JSON.parse(store.user.getUser.address)
		}
	}

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
				store.user.getUser.address = JSON.stringify(this.addressInfo)
				setTimeout(this.cancel, 2000)
				this.$emit('ok', store.user.getUser)
			} else {
				this.$Modal.warning({
					content: '请将内容填写完整'
				})
			}
		})
	}

	mounted() {
		this.visible = true
	}
}
