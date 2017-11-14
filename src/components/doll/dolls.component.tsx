import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams, Modal } from 'iview'

import store from '../../stores/store'
import { CreateDollRequest } from '../../types/request'
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
      </div>
    )
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
    key: 'dollid'
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
        ((params.row) as any).rarePieces.join(',')
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
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleEdit(params.row.dollid) }}>编辑</i-button>
        </div>
      )
    }
  }]

  addDoll() {
    /**
   * 实例化组件
   */
    let component = new AddDollComponent().$mount()
    /**
     * 将组件添加到body
     */
    document.body.appendChild(component.$el)
    /**
     * 给组件实例传递prop参数
     */
    component.$props.title = '添加娃娃'
    /**
     * 监听组件实例的自定义事件
     */
    component.$on('ok', (dollInfo: CreateDollRequest) => {
      dollService.addDoll(dollInfo).then((data: any) => {
        if (data.stat === 'OK') {
          this.$Message.success('添加成功')
          dollService.getDolls()
        } else {
          this.$Message.error(data.stat)
        }
      })
    })
  }

  handleEdit(id: number) {
    this.$router.push('editDoll/' + id)
  }

  created() {
    store.common.activeIndex = 'dolls'
    dollService.getDolls()
  }

  get tableHeight() {
    let cHeight = document.body.clientHeight;
    return cHeight-150;
  }
}