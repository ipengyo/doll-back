import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, Form, FormRule } from 'iview'

import store from '../../stores/store'
import { SkuInfo } from '../../types/model'

import commonService from '../../services/common.service'
import skuService from '../../services/sku.service'

import './skus.component.styl'

@Component
export default class AddSkuComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div addSkus-component>
				<modal
					value={this.visible}
					title={this.title}
					mask-closable={false}
					on-on-hidden={this.close}
					loading={true}
				>
					<div class="add-sku" >
						<i-form ref="sku" model={this.sku} rules={this.ruleAddSku} label-width={100} >
							<form-item label="商品名称：" prop="productName">
								<i-input type="text" value={this.sku.productName} placeholder='商品名称' on-input={(val: string) => this.sku.productName = val} />
							</form-item>
							<form-item label="商品描述：" prop="description">
								<i-input type="text" value={this.sku.description} placeholder='商品描述' on-input={(val: string) => this.sku.description = val} />
							</form-item>
							<form-item label="支付金额：" prop="price">
								<i-input type="text" number={true} value={this.sku.price} placeholder='需要支付的金额' on-input={(val: string) => this.sku.price = val} />
							</form-item>
							<form-item label="兑换次数：" prop="gameCount">
								<i-input type="text" number={true} value={this.sku.gameCount} placeholder='可兑换的抓娃娃次数' on-input={(val: string) => this.sku.gameCount = val} />
							</form-item>	
						</i-form>
					</div>
					<div slot="footer">
						<i-button type="text" on-click={this.cancel}>取消</i-button>
						<i-button type="primary" on-click={() => this.ok('sku')}>确定</i-button>
					</div>
				</modal>
			</div>
		)
	}
	rarePieces: string = ''
	sku: any = {
		productName: '',
		description: '',
		gameCount: null,
		price: ''
	}

	ruleAddSku: FormRule = {
		productName: [
			{ required: true, message: "请输入商品名称", trigger: 'blur' }
		],
		description: [
			{ required: true, message: "请输入商品描述", trigger: 'blur' }
		],
		gameCount: [
			{ type: "number", required: true, message: "请输入娃娃数量", trigger: 'blur' }
		],
		price: [
			{ type: "number", required: true, message: "请输入碎片数量", trigger: 'blur' }
		]
	}
	@Prop()
	title: string

	visible: boolean = false

	name: string = ''

	//关闭弹窗后销毁
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
				setTimeout(this.cancel, 2000);
				this.$emit('ok', this.sku)
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
