import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Upload, Form, FormRule } from 'iview'

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
      <div dolls-component>
        <div class="component-header">
          <i-button type="primary" icon="chevron-left" class="search-btn" on-click={()=>{this.$router.go(-1)}}>返回</i-button>
        </div>
        <div class='component-form'>
          <i-form label-width={150} ref="doll" model={this.doll} rules={this.ruleDoll}>
            <form-item label="娃娃名称" prop="name">
              <i-input type="text" value={this.doll.name} placeholder = '填写名称' on-input={(val: string) => this.doll.name = val} />
            </form-item>
            <form-item>
              <i-button type="primary" class="search-btn" on-click={()=>{this.editName(this.doll.name)}}>修改名称</i-button>
            </form-item>
            <form-item label="娃娃状态" prop="status">
              <i-input type="text" value={this.doll.status} placeholder = '填写open或者close' on-input={(val: string) => this.doll.status = val} />
            </form-item>
            <form-item>
              <i-button type="primary" class="search-btn" on-click={()=>{this.editStatus(this.doll.status)}}>修改状态</i-button>
            </form-item>
            <form-item label="娃娃数量" prop="count">
              <i-input type="text" value={this.doll.count} placeholder = '商品数量' on-input={(val: string) => this.doll.count = val} />
            </form-item>
            <form-item>
              <i-button type="primary" class="search-btn" on-click={()=>{this.handleCount(this.doll.count)}}>修改数量</i-button>
            </form-item>
            <form-item label="碎片数量" prop="pieceCount">
              <i-input type="text" value={this.doll.pieceCount} placeholder = '碎片数量' on-input={(val: string) => this.doll.pieceCount = val} />
            </form-item>
            <form-item label="稀有碎片序号" prop="rarePieces">
              <i-input type="text" value={this.doll.rarePieces?this.doll.rarePieces.join(','):this.doll.rarePieces} placeholder = '稀有碎片序号1-2个，用英文‘,’隔开' on-input={(val: string) => this.doll.rarePieces = val} />
            </form-item>
            <form-item label="娃娃稀有值" prop="price">
              <i-input type="text" value={this.doll.price} placeholder = '娃娃稀有度，填数值' on-input={(val: number) => this.doll.price = val} />
            </form-item>
            <form-item>
              <i-button type="primary" class="search-btn" on-click={()=>this.handlePrice(store.doll.dollInfo.price)}>修改稀有值</i-button>
            </form-item>
            <form-item label="娃娃图片">
              <img src={store.doll.dollInfo.url} alt=""/>
            </form-item>
            <form-item label="请上传娃娃图片">
              <upload
                ref="upload"
                show-upload-list={true}
                default-file-list={this.defaultList}
                format={['jpg','jpeg','png']}
                max-size={5120}
                type="drag"
                action={`/doll/api/setDollPicture?dollid=${this.dollID}`}
                style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <icon type="camera" size="20"></icon>
                  </div>
              </upload>
            </form-item>
          </i-form>
        </div>
      </div>
    )
  }

  doll: any = {
    name: '',
    status: '',
    count: null,
    pieceCount: null,
    rarePieces: [],
    price: ''
  }

  dollID: number = -1

  uploadList: UploadItem[] = []
  defaultList:UploadFileList[] =  []

  editStatus(val: string) {
    if(val === ''){
      this.$Modal.warning({
        content:'请将内容填写完整'
      })
      return
    }
    if(val === 'open') {
      dollService.dollOpen(this.dollID).then((data: any) => {
        if (data.stat == 'OK') {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(data.stat)
        }
      })
    } else if (val === 'close') {
      dollService.dollClose(this.dollID).then((data: any) => {
        if (data.stat == 'OK') {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(data.stat)
        }
      })
    }else{
      this.$Message.error('请输入open或者close')
    }
  }
  editName(val: string) {
    if(val === ''){
      this.$Modal.warning({
        content:'请将内容填写完整'
      })
      return
    }
    dollService.setDollName(this.dollID, val).then((data: any) => {
      if (data.stat == 'OK') {
        this.$Message.success('修改成功')
      } else {
        this.$Message.error(data.stat)
      }
    })
  }

  handleCount(val: number) {
    if(!val){
      this.$Modal.warning({
        content:'请将内容填写完整'
      })
      return
    }
    dollService.setDollCount(this.dollID, val).then((data: any) => {
      if (data.stat == 'OK') {
        this.$Message.success('修改成功')
      } else {
        this.$Message.error(data.stat)
      }
    })
  }
  handlePrice(val: string) {
    if(!val){
      this.$Modal.warning({
        content:'请将内容填写完整'
      })
      return
    }
     dollService.setDollPrice(this.dollID, val).then((data:any) => {
      if(data.stat == 'OK') {
        this.$Message.success('修改成功')
      } else {
        this.$Message.error(data.stat)
      }
    })  
  }

  //表单验证
  get getDoll():string[]{
    return store.doll.dollInfo
  }
  dollInfo() {
    this.doll = this.getDoll 
  }
  ruleDoll:FormRule={
    name:[
      { required: true, message: "娃娃名称不能为空", trigger: 'blur' }
    ],
    status:[
      { required: true, message: "状态不能为空", trigger: 'blur' }
    ],
    // count:[
    //   { required: true, type:"number", message: "数量不能为空，且只能为数字", trigger: 'blur' }
    // ],
    // rarePieces:[
    //   { required: true, type:"number",message:"稀有碎片序号不能为空，", trigger: 'blur' }
    // ],
    // pieceCount:[
    //   { required: true, type:"number", message: "碎片不能为空，且只能为数字", trigger: 'blur' }
    // ],
    // price:[
    //   { required: true, type:'number', message: "稀有值不能为空,且只能为数字", trigger: 'blur' }
    // ]
  }

  created() {
    this.dollID = parseInt(this.$route.params.dollId, 10)
    dollService.getDoll(this.dollID).then(
      this.dollInfo
    )
    store.common.activeIndex = 'dolls'
  }

  @Watch('$route')
  routeChange() {
    if (this.$route.fullPath.startsWith('/editDoll/')) {
      this.dollID = parseInt(this.$route.params.dollId, 10)
      dollService.getDoll(this.dollID).then(
        this.dollInfo
      )
      store.common.activeIndex = 'dolls'
    }
  }
}