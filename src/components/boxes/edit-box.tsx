import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, UploadFileList, Form, FormRule } from 'iview'

import store from '../../stores/store'
import { BoxInfo } from '../../types/model'

import commonService from '../../services/common.service'
import boxService from '../../services/box.service'
import dollService from '../../services/doll.service'

import './box.component.styl'

@Component
export default class EditBoxComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div boxs-component>
        <div class='add-doll'>
          <div class="component-header">
            <i-button type="primary" icon="chevron-left" class="search-btn" on-click={() => { this.$router.go(-1) }}>返回</i-button>
          </div>
          <div class="component-form">
            <i-form ref="box" label-width={150} rules={this.ruleBox} model={store.doll.boxInfo} >
              <form-item label="娃娃机名称：" prop="name">
                <i-input type="text" value={store.doll.boxInfo.name} placeholder='填写名称' on-input={(val: string) => store.doll.boxInfo.name = val} />
              </form-item>
              <form-item label="娃娃机状态：" prop="status">
                <i-select value={store.doll.boxInfo.status} on-input={(val: string) => store.doll.boxInfo.status = val}>
                  <i-option value='open'>直接上架</i-option>
                  <i-option value='close'>添加到仓库</i-option>
                </i-select>
              </form-item>
              <form-item label="已有娃娃id:" prop="dollIds">
                <i-input type="text" value={store.doll.boxInfo.dollIds.join(',')}  readonly/>
              </form-item>
              <form-item label="修改娃娃机娃娃：" prop="dolls">
                <i-select value={store.doll.boxInfo.dollIds} placeholder='选择娃娃机' multiple on-input={(val: number[]) => this.handleSelect(val)} >
                  {store.doll.dollList.map((item: any) => {
                    return <i-option value={item.id}>{item.name}</i-option>
                  })}
                </i-select>
              </form-item>
              <form-item>
                <i-button type="primary" class="search-btn" on-click={() => { this.editBox(store.doll.boxInfo.id) }}>确认修改娃娃机娃娃</i-button>
              </form-item>
              <form-item label="娃娃机图片">
                <img src={store.doll.boxInfo.url} alt="" />
              </form-item>
              <form-item label="请上传娃娃机图片">
                <upload
                  ref="upload"
                  show-upload-list={true}
                  format={['jpg', 'jpeg', 'png']}
                  max-size={5120}
                  type="drag"
                  action={`/picture/box/${this.boxID}`}
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

  
  formItem: any = {
    input: ''
  }

  boxID: number = -1
  submit: boolean = true

  handleSelect(val: number[]) {
    store.doll.boxInfo.dollIds = val
  }

  editBox(val: number) {
    boxService.editBox(val).then(result=>{
      if(result.status === 200){
        this.$Message.success("修改成功")
        boxService.getBox(this.boxID)
      }else {
        this.$Message.error(result.message)
      }
    })
  }
  //表单验证
  ruleBox: FormRule = {
    name: [
      { required: true, message: "娃娃机名称不能为空", trigger: 'blur' }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: 'blur' }
    ],
    dolls: [
      { required: true, message: "娃娃id不能为空", trigger: 'blur' }
    ]

  }

  created() {
    this.boxID = parseInt(this.$route.params.boxId, 10)
    boxService.getBox(this.boxID)
    store.common.activeIndex = 'boxes'
  }

  @Watch('$route')
  routeChange() {
    if (this.$route.fullPath.startsWith('/box/')) {
      this.boxID = parseInt(this.$route.params.boxId, 10)
      boxService.getBox(this.boxID)
      store.common.activeIndex = 'boxes'
    }
  }
}