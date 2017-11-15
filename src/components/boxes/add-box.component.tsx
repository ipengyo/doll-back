import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Form, FormRule } from 'iview'

import store from '../../stores/store'
import { BoxInfo } from '../../types/model'

import commonService from '../../services/common.service'
import dollService from '../../services/doll.service'

@Component
export default class AddBoxComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div addBox-component>
				<modal
					value={this.visible}
					title={this.title}
					mask-closable={false}
					on-on-hidden={this.close}
				>
					<div class="add-box">
						<i-form ref="box" rules={this.ruleBox} model={this.box} label-width={100}>
							<form-item label="娃娃机名称" prop="name" >
								<i-input type="text" value={this.box.name} placeholder='填写名称' on-input={(val: string) => this.box.name = val} />
							</form-item>
							<form-item label="娃娃机状态" prop="status">
								<i-select value={this.box.status} placeholder='选择娃娃机状态' on-input={(val: string) => { this.box.status = val }} >
									<i-option value='open'>直接上架</i-option>
									<i-option value='close'>添加到仓库</i-option>
								</i-select>
							</form-item>
							<form-item label="选择娃娃" prop="dollIds">
								<i-select value={this.box.dollIds} placeholder='选择娃娃机中的娃娃' multiple on-input={(val: number[]) => this.handleSelect(val)} >
									{store.doll.dollList.map((item: any) => {
										return <i-option value={item.id}>{item.name}</i-option>
									})}
								</i-select>
							</form-item>
						</i-form>
					</div>
					<div slot="footer">
						<i-button type="text" on-click={this.cancel}>取消</i-button>
						<i-button type="primary" on-click={() => this.ok('box')}>确定</i-button>
					</div>
				</modal>
			</div>
		)
	}

	box: BoxInfo = {
		name: '',
		status: '',
		dollIds: []
	}
	handleSelect(val: number[]) {
		this.box.dollIds = val
	}

	ruleBox: FormRule = {
		name: [
			{ required: true, message: "娃娃机名称不能为空", trigger: 'blur' }
		],
		status: [
			{ required: true, message: "状态不能为空", trigger: 'blur' }
		],
		dollIds: [
			{ type: "array", required: true, message: '请选择娃娃', trigger: 'change' }
		]
	}
	@Prop()
	title: string

	visible: boolean = false

	name: string = ''

	close() {
		this.$destroy()
		this.$el.parentNode.removeChild(this.$el)
	}

	cancel() {
		this.visible = false
	}

	ok(name: string) {
		(this.$refs[name] as Form).validate((valid: boolean) => {
			if (valid) {
				let dollInfo = {
					name: this.box.name,
					status: this.box.status,
					dollIds: this.box.dollIds
				}
				setTimeout(this.cancel, 2000);
				this.$emit('ok', dollInfo)
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
