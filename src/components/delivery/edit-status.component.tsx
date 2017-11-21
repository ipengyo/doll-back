import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, Form, FormRule } from 'iview'

import store from '../../stores/store'


@Component
export default class EditStatusComponent extends Vue {
	render(h: CreateElement) {
		return (
			<div EditStatus-component>
				<modal
					value={this.visible}
					title={this.title}
					mask-closable={false}
					on-on-hidden={this.close}
					loading={true}
				>
          <div class="edt-status" >
            <i-form ref="giftStatus" rules={this.ruleEidtStatus} label-width={100} >
              <form-item label="物流状态：" prop="status">
                <i-select value={this.status} placeholder='选择娃娃状态' on-input={(val: string) => { this.status = val }} >
                  <i-option value='exist'>未发货</i-option>
                  <i-option value='sending'>发送中</i-option>
                  <i-option value='recieved'>已收货</i-option>
                </i-select>
              </form-item>
            </i-form>
          </div>
					<div slot="footer">
						<i-button type="text" on-click={this.cancel}>取消</i-button>
						<i-button type="primary" on-click={() => this.ok('giftStatus')}>确定</i-button>
					</div>
				</modal>
			</div>
		)
	}

	ruleEidtStatus: FormRule = {
		productName: [
			{ required: true, message: "请输入商品名称", trigger: 'blur' }
		],
	}
	@Prop()
  title: string
  @Prop()
  status: string

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
        setTimeout(this.cancel,2000)
        this.$emit('ok',this.status)
			} else {
				this.$Modal.warning({
					content: '请设置物流状态'
				})
			}
		})
	}
	mounted() {
    this.visible = true
	}
}