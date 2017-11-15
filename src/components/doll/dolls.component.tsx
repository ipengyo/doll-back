import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, Modal } from 'iview'

import store from '../../stores/store'
import { DollInfo } from '../../types/model'
import commonService from '../../services/common.service'
import dollService from '../../services/doll.service'

import './dolls.component.styl'
import AddDollComponent from './add-doll.component'

@Component
export default class SkusComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div dolls-component>
        <div class='component-header'>
          {<i-button type="primary" icon="plus-round" class="search-btn" on-click={this.addDoll}>添加娃娃</i-button>}
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.doll.dollList} />
        </div>
        <div class="page-wrap">
          <page class="pager" current={store.doll.currentPage} total={store.doll.total} page-size={store.doll.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }

  // 設置表格高度
  get tableHeight() {
    let cHeight = document.body.clientHeight;
    return cHeight-200;
  }

  pageInfo = {
    pageIndex: 1,
    pageSize: 15
  }

  searchOption = {
    skuNameKey: '',
    manufacturerKey: ''
  }
  columns: ColumnOption[] = [{
    title: '娃娃名称',
    key: 'name'
  }, {
    title: '娃娃状态',
    key: 'status'
  }, {
    title: '娃娃id',
    key: 'id'
  }, {
    title: '娃娃库存',
    key: 'count'
  }, {
    title: '碎片数量',
    key: 'pieceCount'
  }, {
    title: '娃娃稀有度',
    key: 'price'
  }, {
    title: '稀有碎片',
    key: 'inventory',
    align: 'rarePieces',
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        params.row.rarePieces.join(',')
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
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleEdit(params.row.id) }}>编辑</i-button>
        </div>
      )
    }
  }]

  addDoll() {

    let component = new AddDollComponent().$mount()
    document.body.appendChild(component.$el)
    component.$props.title = '添加娃娃'

    component.$on('ok', (dollInfo: DollInfo) => {
      dollService.addDoll(dollInfo).then((data: any) => {
        if (data.status === 200) {
          this.$Message.success('添加成功')
          dollService.getDolls()
        } else {
          this.$Message.error(data.stat)
        }
      })
    })
  }
  pageIndexChanged(val: string) {
    store.doll.currentPage = parseInt(val, 10)
    dollService.getDolls()
  }

  handleEdit(id: number) {
    this.$router.push('editDoll/' + id)
  }
  created() {
    store.common.activeIndex = 'dolls'
    dollService.getDolls()
  }
}