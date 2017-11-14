import Vue, { CreateElement } from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams,UploadFileList,Form,FormRule } from 'iview'

import store from '../../stores/store'
import { SkuInfo } from '../../types/model'           

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
            <i-button type="primary" icon="chevron-left" class="search-btn" on-click={()=>{this.$router.go(-1)}}>返回</i-button>
          </div>
          <div class="component-form">
            <i-form ref="box" label-width={150} rules={this.ruleBox} model={this.box} >
                <form-item label="娃娃机名称：" prop="name">
                  <i-input type="text" value={this.box.name} placeholder = '填写名称' on-input={(val: string) => this.box.name = val} />
                </form-item>
                <form-item>
                  <i-button type="primary" class="search-btn" on-click={()=>{this.editName(this.box.name)}}>点击修改名字</i-button>
                </form-item>
                <form-item label="娃娃机状态：" prop="status">
                  <i-input type="text" value={this.box.status} placeholder = '填写open或者close' on-input={(val: string) => this.box.status = val} />
                </form-item>
                <form-item>
                  <i-button type="primary" class="search-btn" on-click={()=>{this.editStatus(this.box.status)}}>点击修改状态</i-button>
                </form-item>
                <form-item label="已有娃娃id:">
                  <i-input type="text" value={this.box.dolls?this.box.dolls.join(','):this.box.dolls} placeholder = '稀有碎片序号1-2个，用英文‘,’隔开' on-input={(val: string) => this.box.dolls = val.split(',')} />
                </form-item>
                <form-item label="修改娃娃机娃娃：" prop="dolls">
                  <i-select value={this.dollIds} placeholder='选择娃娃机' multiple on-input={(val: string[]) => this.handleSelect(val)} >
                    {store.doll.dollList.map((item: any) => {
                      return <i-option value={item.dollid}>{item.name}</i-option>
                    })}
                  </i-select>
                </form-item>
                <form-item>
                  <i-button type="primary" class="search-btn" on-click={()=>{this.editBoxDolls(this.dollIds)}}>确认修改娃娃机娃娃</i-button>
                </form-item>
                <form-item label="娃娃机图片">
                  <img src={store.doll.boxInfo.url} alt=""/>
                </form-item>
                <form-item label="请上传娃娃机图片">
                  <upload
                    ref="upload"
                    show-upload-list={true}
                    format={['jpg','jpeg','png']}
                    max-size={5120}
                    type="drag"
                    action={`/doll/api/setBoxPicture?boxid=${this.boxID}`}
                    style="display: inline-block;width:58px;">
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <icon type="camera" size="20"></icon>
                      </div>
                  </upload>
                </form-item>
                {/* <form-item>
                  <i-button type="primary" class="search-btn" on-click={()=>{this.ok('box')}}>确认修改</i-button>
                </form-item> */}
            </i-form>
          </div>
        </div>
      </div>
    )
  }

  box: any = {
    name: '',
    status: '',
    dolls:[],
    count: null,
    pieceCount: null,
    rarePieces: [],
    price: ''
  }
  formItem: any= {
    input:''
  }
  dollIds: string[] = []
 
  boxID: number = -1
  submit:boolean = true

  editStatus(val: string) {
    if(val === ''){
      this.$Modal.warning({
        content:'内容不能为空'
      })
      return
    }
    if(val === 'open') {
      boxService.boxOpen(this.boxID).then((data: any) => {
        if (data.stat == 'OK') {
         this.$Message.success('修改成功')
        } else {
          this.$Message.error(data.stat)
        }
      })
    } else if (val === 'close') {
      boxService.boxClose(this.boxID).then((data: any) => {
        if (data.stat == 'OK') {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(data.stat)
          this.submit = false
        }
      })
    }else{
      this.$Message.error("请输入open或者close")
  }
}
  editName(val: string) {
    if(val === ''){
      this.$Modal.warning({
        content:'内容不能为空'
      })
      return
    }
    boxService.setBoxName(this.boxID, val).then((data: any) => {
      if (data.stat == 'OK') {
        this.$Message.success('修改成功')
      } else {
        this.$Message.error(data.stat)
      }
    })
   // this.box = this.getBox
   //console.log(this.getBox)
    //console.log(this.box)
  }


  handleSelect(val: string[]) {
    this.dollIds = val
  }

  editBoxDolls(val: string[]) {
    if(val.length === 0){
      this.$Modal.warning({
        content:'内容不能为空'
      })
      return
    }
    boxService.addBoxDolls(this.boxID, val).then((data: any) => {
      if (data.stat == 'OK') {
        this.$Message.success('修改成功')
      } else {
        this.$Message.error(data.stat)
      }
    })
  }
//表单验证
  ruleBox:FormRule={
    name:[
      { required: true, message: "娃娃机名称不能为空", trigger: 'blur' }
    ],
    status:[
      { required: true, message: "状态不能为空", trigger: 'blur' }
    ],
    dolls:[
      { required: true, message: "娃娃id不能为空", trigger: 'blur' }
    ]

  }
  get getBox():string[]{
    return store.doll.boxInfo
  }
  boxInfo() {
    this.box = this.getBox
  }
  ok(name: string) {
		(this.$refs[name] as Form).validate((valid: boolean) => {
      if (valid) {
        this.submit = true
        this.editName(this.box.name)
        this.editStatus(this.box.status)
        this.editBoxDolls(this.dollIds)
        if(this.submit){
          this.$Message.success('修改成功！')
        }
      } else {
        this.$Modal.warning({
          content: '请将内容填写完整'
        })
      }
    })
  }

  
  created() {
    this.boxID = parseInt(this.$route.params.boxId, 10)
    boxService.getBox(this.boxID).then(
      this.boxInfo
    )
    dollService.getDolls()
    store.common.activeIndex = 'boxes'
  }

  @Watch('$route')
  routeChange() {
    if (this.$route.fullPath.startsWith('/editBox/')) {
      dollService.getDolls()
      this.boxID = parseInt(this.$route.params.boxId, 10)
      boxService.getBox(this.boxID).then(
        this.boxInfo
      )
      store.common.activeIndex = 'boxes'
    }
  }
}