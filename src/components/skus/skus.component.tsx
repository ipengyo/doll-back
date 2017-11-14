import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import { SkuInfo } from '../../types/model'
import {AddProductRequest} from '../../types/request'

import commonService from '../../services/common.service'
import skuService from '../../services/sku.service'

import './skus.component.styl'
import AddDolStulComponent from './add-sku.component'

@Component
export default class SkusComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div skus-component>
        <div class="component-header">
          <i-button type="primary" icon="plus-round" class="search-btn" on-click={this.addsku}>添加商品</i-button>
          {/* <i-input class="search-ipt" type="text" value={this.sku.productName} placeholder = '商品名称' on-input={(val: string) => this.sku.productName = val} />
          <i-input class="search-ipt" type="text" value={this.sku.description} placeholder = '商品描述' on-input={(val: string) => this.sku.description = val} />
          <i-input class="search-ipt" type="text" value={this.sku.gameCount} placeholder = '可兑换的抓娃娃次数' on-input={(val: string) => this.sku.gameCount = val} />
          <i-input class="search-ipt" type="text" value={this.sku.price} placeholder = '需要支付的金额' on-input={(val: string) => this.sku.price = val} /> */}
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.doll.productList} />
        </div>
      </div>
    )
  }

  sku: any = {
    productName: '',
    description: '',
    gameCount: '',
    price: ''
  }
  
  pageInfo = {
    pageIndex: 1,
    pageSize: 15
  }

  searchOption = {
    skuproductNameKey: '',
    manufacturerKey: ''
  }
  columns: ColumnOption[] = [{
    title: '商品名称',
    key: 'productName'
  }, {
    title: '商品描述',
    key: 'description'
  }, {
    title: '商品id',
    key: 'id'
  }, {
    title: '数量',
    key: 'gameCount'
  }, {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 180,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleDelete(params.row.id) }}>删除</i-button>
        </div>
      )
    }
  }]


  pageIndexChanged(pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex
  }

  pageSizeChanged(pageSize: number) {
    this.pageInfo.pageSize = pageSize
  }

  addsku() {
    let component = new AddDolStulComponent().$mount()
    document.body.appendChild(component.$el)
    component.$props.title = '添加商品'
    component.$on('ok', (sku: AddProductRequest) => {
      skuService.addProduct(sku).then((data: any) => {
        if (data.stat == 'OK') {
          this.$Message.success('添加成功')
          skuService.getProductList()
        } else {
          this.$Message.error(data.stat)
        }
      })
    })

  }

  handleEdit(id: number) {
    this.$router.push('editSku/'+id)
  }
  handleDelete(id: number) {
    skuService.deleteProduct(id).then((data: any) => {
      if (data.stat == 'OK') {
        this.$Message.success('删除成功')
      } else {
        this.$Message.error(data.stat)
      }
    })
  }

  get tableHeight() {
    return document.body.clientHeight - 200;
  }

  created() {
    store.common.activeIndex = 'skus'
    skuService.getProductList()
  }
}