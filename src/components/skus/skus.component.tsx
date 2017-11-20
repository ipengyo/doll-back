import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'
import { SkuInfo } from '../../types/model'
import { AddProductRequest } from '../../types/request'

import commonService from '../../services/common.service'
import skuService from '../../services/sku.service'

import './skus.component.styl'
import AddDolStulComponent from './add-sku.component'
import EditDolStulComponent from './edit-sku.component'

@Component
export default class SkusComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div skus-component>
        <div class="component-header">
          <i-button type="primary" icon="plus-round" class="search-btn" on-click={this.addsku}>添加商品</i-button>
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
    gameCount: null,
    price: null
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
    title: '商品id',
    key: 'id',
    align: 'center',
    width: 100
  }, {
    title: '商品名称',
    key: 'name'
  }, {
    title: '商品描述',
    key: 'description'
  }, {
    title: '兑换次数',
    key: 'gameCount'
  }, {
    title: '支付金额',
    key: 'price'
  }, {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 180,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleEdit(params.row.id) }}>编辑</i-button>
          <poptip
            confirm
            title="您确认删除该商品吗？"
            width={200}
            on-on-ok={(id: number) => { this.ok(params.row.id) }}>
            <i-button type="text" class="opt-col-btn">删除</i-button>
          </poptip>
        </div>
      )
    }
  }]

  ok(id: number) {
    this.handleDelete(id);
  }
  pageIndexChanged(pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex
  }

  pageSizeChanged(pageSize: number) {
    this.pageInfo.pageSize = pageSize
  }
  //添加
  addsku() {
    let component = new AddDolStulComponent().$mount()
    document.body.appendChild(component.$el)
    component.$props.title = '添加商品'
    component.$on('ok', (sku: AddProductRequest) => {
      skuService.addProduct(sku).then((data: any) => {
        if (data.status == 200) {
          this.$Message.success('添加成功')
          skuService.getProductList()
        } else {
          this.$Message.error(data.stat)
        }
      })
    })

  }
  //编辑
  handleEdit(id: number) {
    skuService.getProduct(id).then(result => {
      if (result.status === 200) {
        store.doll.product = result.product
        let component = new EditDolStulComponent().$mount()
        document.body.appendChild(component.$el)
        component.$props.title = '编辑商品'
        component.$on('ok', () => {
          skuService.editProduct(store.doll.product.id).then(data => {
            if (data.status === 200) {
              this.$Message.success("修改成功");
              skuService.getProductList()
            }
          })
        })
      }
    });
  }
  //删除
  handleDelete(id: number) {
    skuService.deleteProduct(id).then((data: any) => {
      if (data.status == 200) {
        skuService.getProductList()
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