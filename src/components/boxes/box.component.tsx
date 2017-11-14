import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams,Modal } from 'iview'
import { CreateBoxRequest } from '../../types/request'

import store from '../../stores/store'

import commonService from '../../services/common.service'
import boxService from '../../services/box.service'
import dollService from '../../services/doll.service'
import AddBoxComponent from './add-box.component'

import './box.component.styl'

@Component
export default class BoxsComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div boxs-component>
        <div class="component-header">
          <i-button type="primary" icon="plus-round" class="search-btn" on-click={this.addBox}>添加娃娃机</i-button>
        </div>
        <div class="component-table">
          <i-table columns={this.columns} data={store.doll.boxesList} />
        </div>
      </div>
    )
  }

  doll: any = {
    name: '',
    status: '',
    count: null,
    pieceCount: null,
    rarePieces: null,
    price: ''
  }

  name: string
  status: string

  dollIds: string[] = []
  
  pageInfo = {
    pageIndex: 1,
    pageSize: 15
  }

  searchOption = {
    skuNameKey: '',
    manufacturerKey: ''
  }
  columns: ColumnOption[] = [{
    title: '娃娃机名称',
    key: 'name'
  }, {
    title: '娃娃机状态',
    key: 'status'
  }, {
    title: '娃娃机id',
    key: 'boxid'
  }, {
    title: '娃娃ID',
    key: 'dolls',
    align: 'center',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        ((params.row) as any).dolls.join(',')
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
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleEdit(params.row.boxid) }}>编辑</i-button>
        </div>
      )
    }
  }]

  handleSelect(val: string[]) {
    this.dollIds = val
  }

  addBox() {
    /**
   * 实例化组件
   */
    let component = new AddBoxComponent().$mount()
    /**
     * 将组件添加到body
     */
    document.body.appendChild(component.$el)
    /**
     * 给组件实例传递prop参数
     */
    component.$props.title = '添加娃娃机'
    /**
     * 监听组件实例的自定义事件
     */
    component.$on('ok', (box: CreateBoxRequest) => {
      this.dollIds = [...this.dollIds]
      let data = {
        name: box.name,
        status: box.status,
        dolls: box.dollIds
      }
      boxService.createBox(data).then((data: any) => {
        if (data.stat === 'OK') {
          this.$Message.success('添加成功')
          this.name = ''
          this.status = ''
          this.dollIds = []
          boxService.getBoxes()
        } else {
          this.$Message.error(data.stat)
        }
      })
    })
  }
  
  handleEdit(id: number) {
    this.$router.push('editBox/'+id)
  }

  created() {
    store.common.activeIndex = 'boxes'
    boxService.getBoxes()
    dollService.getDolls()
  }
}