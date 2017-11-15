import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import { DollInfo, BoxInfo } from '../../types/model'

import commonService from '../../services/common.service'
import boxService from '../../services/box.service'
import dollService from '../../services/doll.service'

import './box.component.styl'
import AddBoxComponent from './add-box.component'

@Component
export default class BoxsComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div boxs-component>
        <div class='component-header'>
          <i-button type="primary" icon="plus-round" class="search-btn" on-click={this.addBox}>添加娃娃机</i-button>
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.doll.boxesList} />
        </div>
      </div>
    )
  }

  columns: ColumnOption[] = [{
    title: '娃娃机名称',
    key: 'name'
  }, {
    title: '娃娃机状态',
    key: 'status',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      let statusObj = { open: '直接上架', close: '添加到仓库' }
      return (
        statusObj[params.row.status]
      )
    }
  }, {
    title: '娃娃机id',
    key: 'boxid'
  }, {
    title: '娃娃ID',
    key: 'dolls',
    align: 'center',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      let dollIdArr: number[] = [];
      params.row.dollIds.map((doll: DollInfo) => {
        dollIdArr.push(doll.id)
      })
      return (
        dollIdArr.join(',')
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

  addBox() {
    let component = new AddBoxComponent().$mount()
    document.body.appendChild(component.$el)
    component.$props.title = '添加娃娃'
    component.$on('ok', (boxInfo: BoxInfo) => {
      boxService.createBox(boxInfo).then(data => {
        if (data.status === 200) {
          this.$Message.success('添加成功')
          boxService.getBoxes()
        } else {
          this.$Message.error(data.message)
        }
      })
    })
  }

  handleEdit(id: number) {
    this.$router.push('box/' + id)
  }

  get tableHeight() {
    return document.body.clientHeight - 150;
  }

  created() {
    store.common.activeIndex = 'boxes'
    boxService.getBoxes()
    dollService.getAllDolls()
  }
}