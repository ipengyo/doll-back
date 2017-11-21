import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'

import commonService from '../../services/common.service'
import deliveryService from '../../services/delivery.service'

import EditStatusComponent from '../delivery/edit-status.component'


@Component
export default class UserGiftsComponent extends Vue {
  //<template></template>
  render(h: CreateElement) {
    return (
      <div userGifts-component>
        <modal
          value={this.visible}
          title={this.title}
          mask-closable={false}
          on-on-hidden={this.close}
          loading={true}
        >
          <div class="component-table">
            <i-table columns={this.columns} height={400} data={store.delivery.deliveryInfo} />
          </div>
          <div slot="footer">
            <i-button type="text" on-click={this.cancel}>关闭</i-button>
          </div>
        </modal>
      </div>
    )
  }

  @Prop()
  title: string
  @Prop()
	uid: number

	visible: boolean = false

	name: string = ''

	close() {

		this.$el.parentNode.removeChild(this.$el)
	}

	cancel() {
		this.visible = false
	}


  columns: ColumnOption[] = [{
    title: '序号',
    width: 60,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {params.row._rowKey}
        </div>
      )
    }
  // }, {
  //   title: '兑换物品名',
  //   key: 'dollName',
  //   render: (h: CreateElement, params: ColumnRenderParams) => {
  //     return (
  //       <div class="opt-column">
  //         {params.row.dollName}
  //       </div>
  //     )
  //   }
    }, {
    title: '兑换时间',
    key: 'createTime',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          {commonService.dateTime(params.row.createTime)}
        </div>
      )
    }
  },{
    title: '物流信息',
    key: 'status',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      let deliveryStatus = { exist: '未发货', sending: '送货中', recieved: '已收货' }
      return (
        <div class="opt-column">
          {deliveryStatus[params.row.status]}
        </div>
      )
    }
  }, {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 180,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={(giftId:number,status:string) => {this.setGiftStatus(params.row.id,params.row.status)}}>修改物流信息</i-button>
        </div>
      )
    }
  }]

 
  setGiftStatus(giftId: number, status: string) {
    let component = new EditStatusComponent().$mount()
    document.body.appendChild(component.$el)
    component.$props.title = '修改物流信息'
    component.$props.status = status
    
    component.$on('ok', (status: string) => {
      deliveryService.setGiftStatus(giftId,status).then((data: any) => {
        if (data.status === 200) {
          this.$Message.success('设置成功')
          deliveryService.getGiftInfoByUid(this.uid).then(data => {
            if(data.status === 200) {
              store.delivery.deliveryInfo = data.gifts
            }
          })
        } else {
          this.$Message.error(data.stat)
        }
      })
    })
  }
  mounted() {
		this.visible = true
	}
}