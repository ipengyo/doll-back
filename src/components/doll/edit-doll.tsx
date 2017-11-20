import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Upload, FormRule } from 'iview'

import store from '../../stores/store'
import { DollInfo } from '../../types/model'

import commonService from '../../services/common.service'
import dollService from '../../services/doll.service'

import './dolls.component.styl'

interface UploadItem {
  status?: string
  url: string
  name: string
  showProgress?: boolean
  percentage?: number
}

@Component
export default class EditDollComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div editDoll-component>
        <div class='add-doll'>
          <div class="component-header">
            <i-button type="primary" icon="chevron-left" class="search-btn" on-click={() => { this.$router.go(-1) }}>返回</i-button>
          </div>
          <div class="component-form">
            <i-form label-width={150} ref="doll" model={store.doll.dollInfo} rules={this.ruleEidtDoll}>
              <form-item label="娃娃名称" prop="name">
                <i-input type="text" value={store.doll.dollInfo.name} placeholder='填写名称' on-input={(val: string) => store.doll.dollInfo.name = val} />
              </form-item>
              <form-item label="娃娃状态" prop="status">
                <i-select value={store.doll.dollInfo.status} placeholder='选择娃娃状态' style='margin-bottom: 20px' on-input={(val: string) => { store.doll.dollInfo.status = val }} >
                  <i-option value='open'>直接上架</i-option>
                  <i-option value='close'>添加到仓库</i-option>
                </i-select>
              </form-item>
              <form-item label="娃娃数量" prop="count">
                <i-input type="text" value={store.doll.dollInfo.count} placeholder='商品数量' on-input={(val: string) => store.doll.dollInfo.count = val} />
              </form-item>
              <form-item label="碎片数量" prop="pieceCount">
                <i-input type="text" value={store.doll.dollInfo.pieceCount} placeholder='碎片数量' on-input={(val: string) => store.doll.dollInfo.pieceCount = val} />
              </form-item>
              <form-item label="稀有碎片序号" prop="rarePieces">
                <i-input type="text" value={store.doll.dollInfo.rarePieces ? store.doll.dollInfo.rarePieces.join(',') : ''} placeholder='稀有碎片序号1-2个，用英文‘,’隔开' on-input={(val: string) => store.doll.dollInfo.rarePieces = val.split(',')} />
              </form-item>
              <form-item label="娃娃稀有值" prop="price">
                <i-input type="text" value={store.doll.dollInfo.price} placeholder='娃娃稀有度，填数值' on-input={(val: string) => store.doll.dollInfo.price = val} />
              </form-item>
              <form-item>
                <i-button type="primary" class="search-btn" on-click={this.edit}>确认修改</i-button>
              </form-item>
              <form-item label="娃娃图片">
                <img src={store.doll.dollInfo.url} alt="" />
              </form-item>
              <form-item label="请上传娃娃图片">
                <upload
                  ref="upload"
                  show-upload-list={true}
                  format={['jpg', 'jpeg', 'png']}
                  max-size={5120}
                  type="drag"
                  action={`/picture/doll/${this.dollID}`}    
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <icon type="camera" size="20"></icon>
                  </div>
                </upload>
              </form-item>
            </i-form>
          </div>
        </div>
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

  dollID: number = -1
  ruleEidtDoll: FormRule = {
		name: [
			{ required: true, message: "娃娃名称不能为空", trigger: 'blur' }
		],
		status: [
			{ required: true, message: "请选择娃娃状态", trigger: 'blur' }
		],
		count: [
			{type: 'number', required: true, message: "请输入娃娃数量", trigger: 'blur' }
		],
		pieceCount: [
			{type: 'number', required: true, message: "请输入碎片数量", trigger: 'blur' }
		],
		rarePieces: [
			{ pattern: /^[\d,]+$/, message: '请输入正确格式的稀有碎片序号', trigger: 'blur' }			
		],
		price: [
			{ type: 'number',required: true, message: "请输入稀有值", trigger: 'blur' },
		]
  }
  
  edit() {
    dollService.editDoll(this.dollID).then((data:any) => {
      if(data.status === 200) {
        this.$Message.success("修改成功");
      }
    })
  }

  created() {
    this.dollID = parseInt(this.$route.params.dollId, 10)
    dollService.getDoll(this.dollID)
    store.common.activeIndex = 'dolls'
  }

  @Watch('$route')
  routeChange() {
    if (this.$route.fullPath.startsWith('/editDoll/')) {
      this.dollID = parseInt(this.$route.params.dollId, 10)
      dollService.getDoll(this.dollID)
      store.common.activeIndex = 'dolls'
    }
  }
}