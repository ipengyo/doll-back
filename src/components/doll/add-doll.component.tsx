import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Form, FormRule } from 'iview'

import store from '../../stores/store'
import { DollInfo } from '../../types/model'

import commonService from '../../services/common.service'
import dollService from '../../services/doll.service'

import './dolls.component.styl'

@Component
export default class AddDollComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div addDoll-component>
				<modal
					value={this.visible}
					title={this.title}
					mask-closable={false}
					on-on-hidden={this.close}
					loading={true}
				>
					<div class="add-doll" >
						<i-form ref="doll" model={this.doll} rules={this.ruleAddDoll} label-width={120} >
							<form-item label="娃娃名称：" prop="name">
								<i-input type="text" value={this.doll.name} placeholder='填写名称' on-input={(val: string) => this.doll.name = val} />
							</form-item>
							<form-item label="娃娃状态：" prop="status">
								<i-select value={this.doll.status} placeholder='选择娃娃状态' on-input={(val: string) => { this.doll.status = val }} >
									<i-option value='open'>直接上架</i-option>
									<i-option value='close'>添加到仓库</i-option>
								</i-select>
							</form-item>
							<form-item label="娃娃数量：" prop="count">
								<i-input type="text" value={this.doll.count} placeholder='商品数量' on-input={(val: string) => this.doll.count = val} />
							</form-item>
							<form-item label="碎片数量：" prop="pieceCount">
								<i-input type="text" value={this.doll.pieceCount} placeholder='碎片数量' on-input={(val: string) => this.doll.pieceCount = val} />
							</form-item>
							<form-item label="稀有碎片序号：" prop="rarePieces">
								<i-input type="text" value={this.doll.rarePieces ? this.doll.rarePieces.join(',') : ''} placeholder='稀有碎片序号1-2个，用英文‘,’隔开' on-input={(val: string) => this.doll.rarePieces = val.split(',')} /></form-item>
							<form-item label="娃娃稀有值：" prop="price">
								<i-input type="text" value={this.doll.price} placeholder='娃娃稀有度，填数值' on-input={(val: string) => this.doll.price = val} />
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
	doll: DollInfo = {
		name: '',
		status: '',
		count: null,
		pieceCount: null,
		rarePieces: [],
		price: ''
	}

	ruleAddDoll: FormRule = {
		name: [
			{ required: true, message: "娃娃名称不能为空", trigger: 'blur' }
		],
		status: [
			{ required: true, message: "状态不能为空", trigger: 'blur' }
		],
		count: [
			{ required: true, message: "娃娃数量不能为空", trigger: 'blur' }
		],
		pieceCount: [
			{ required: true, message: "碎片数量不能为空", trigger: 'blur' }
		],
		rarePieces: [

		],
		price: [
			{ required: true, message: "稀有值不能为空", trigger: 'blur' },
		]
	}
	@Prop()
	title: string

	visible: boolean = false

	name: string = ''

	/**
	 * 等待对话框隐藏之后，再执行销毁
	 */
	close() {
		/**
		 * 销毁组件实例
		 */
		this.$destroy()
		/**
		 * 移除组件DOM
		 */
		this.$el.parentNode.removeChild(this.$el)
	}

	cancel() {
		this.visible = false
	}

	ok(name: string) {
		(this.$refs[name] as Form).validate((valid: boolean) => {
			if (valid) {
				let rarePieces: string[] = this.doll.rarePieces
				rarePieces.forEach(row => {
					(row as any) = parseInt(row, 10)
				})
				this.doll.rarePieces = rarePieces
				setTimeout(this.cancel, 2000);
				this.$emit('ok', this.doll)
			} else {
				this.$Modal.warning({
					content: '请将内容填写完整'
				})
			}
		})
	}
	mounted() {
		this.visible = true
		this.$nextTick(() => {

		})
	}
}
