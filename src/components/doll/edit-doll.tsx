import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Upload } from 'iview'

import store from '../../stores/store'
import { SkuInfo } from '../../types/model'

import commonService from '../../services/common.service'
import dollService from '../../services/doll.service'

import './dolls.component.styl'

interface UploadItem {
  status?:string
  url:string
  name:string
  showProgress?:boolean
  percentage?:number
}

@Component
export default class SkusComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div skus-component>
        <div class='add-doll'>
          娃娃名称
          <i-input type="text" value={store.doll.dollInfo.name} placeholder = '填写名称' on-input={(val: string) => store.doll.dollInfo.name = val} />
          娃娃状态
          <i-select value={store.doll.dollInfo.status} placeholder='选择娃娃状态' style='margin-bottom: 20px' on-input={(val: string) => {store.doll.dollInfo.status = val}} >
            <i-option value='open'>直接上架</i-option>
            <i-option value='close'>添加到仓库</i-option>
          </i-select>
          娃娃数量
          <i-input type="text" value={store.doll.dollInfo.count} placeholder = '商品数量' on-input={(val: string) => store.doll.dollInfo.count = val} />
          碎片数量
          <i-input type="text" value={store.doll.dollInfo.pieceCount} placeholder = '碎片数量' on-input={(val: string) => store.doll.dollInfo.pieceCount = val} />
          稀有碎片序号
          <i-input type="text" value={store.doll.dollInfo.rarePieces ? store.doll.dollInfo.rarePieces.join(',') : ''} placeholder = '稀有碎片序号1-2个，用英文‘,’隔开' on-input={(val: string) => store.doll.dollInfo.rarePieces = val.split(',')} />
          娃娃稀有值
          <i-input type="text" value={store.doll.dollInfo.price} placeholder = '娃娃稀有度，填数值' on-input={(val: string) => store.doll.dollInfo.price = val} />
        </div>
        <div class="component-header">
          <i-button type="primary" class="search-btn" on-click={this.edit}>确认修改</i-button>
        </div>
        <div class="info-item">
        <p class="item-title">娃娃图片</p>
          <img src={store.doll.dollInfo.url} alt=""/>
        </div>
        <div class="info-item">
          <p class="item-title">请上传娃娃图片</p>
          <div class="item-content">
            <upload
              ref="upload"
              show-upload-list={true}
              format={['jpg','jpeg','png']}
              max-size={5120}
              type="drag"
              action={`/picture/doll/${this.dollID}`}
              style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <icon type="camera" size="20"></icon>
                </div>
            </upload>
          </div>
        </div>
      </div>
    )
  }


  dollID: number = -1

  edit() {
    dollService.editDoll(this.dollID)
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