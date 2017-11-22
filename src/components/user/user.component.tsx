import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'
import store from '../../stores/store'
import commonService from '../../services/common.service'
import UserService from '../../services/user.service'
import Delivery from '../../services/delivery.service'
import { UserNew, giftInfo } from '../../types/model'

import './user.component.styl'
import UserGiftsComponent from './userGifts.component'


@Component
export default class UserComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div user-component>
        <div class="component-header">
          <i-input class="search-ipt"
            placeholder="输入用户名搜索用户"
            value={this.name}
            on-input={(val: string) => { this.name = val }}
            on-on-enter={this.searchByName}
          ></i-input>
          <i-button type="primary" icon="ios-search" class="search-btn" on-click={this.searchByName}>查询</i-button>
        </div>
        <div class="component-table">
          <i-table height={this.tableHeight} columns={this.columns} data={store.user.getUsers} />
        </div>
        <div class="page-wrap">
          <page class="pager" current={store.user.currentIndex} total={store.user.total} page-size={store.user.pageSize} show-total show-elevator on-on-change={this.pageIndexChanged} ></page>
        </div>
      </div>
    )
  }

  name: string = ''

  columns: ColumnOption[] = [{
    title: '用户id',
    key: 'uid',
    align: 'center',
    width: 100
  }, {
    title: '用户名',
    key: 'name'
  }, {
    title: '渠道号',
    key: 'channel'
  }, {
    title: '充值总金额',
    key: 'totalPrice'
  },{
    title: '用户状态',
    key: 'status',
    align: 'center',
    render: (h:CreateElement, params:ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button v-show={params.row.status === 1} type="success" size="small">正常</i-button>
          <i-button v-show={params.row.status === 2} type="primary" size="small" disabled>已删除</i-button>
          <i-button v-show={params.row.status === 4} type="error" size="small">禁止</i-button>
        </div>
      )
    }
  },{
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 300,
    render: (h: CreateElement, params: ColumnRenderParams) => {
      return (
        <div class="opt-column">
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleEdit(params.row.uid, params.row.totalPrice) }}>查看详情</i-button>
          <i-button type="text" class="opt-col-btn" on-click={() => { this.handleGift(params.row.uid) }}>礼物兑换列表</i-button>
          <poptip
            confirm
            title="您确认删除该商品吗？"
            width={200}
            on-on-ok={(id: number) => { this.handleDelete(params.row.uid) }}>
            <i-button v-show={params.row.status != 2} type="text" class="opt-col-btn">删除</i-button>
          </poptip> 
        </div>
      )
    }
  }]

  handleGift(id: number) {
    Delivery.getGiftInfoByUid(id).then(data => {
      if (data.status === 200) {
        if(data.gifts.length === 0){
          this.$Message.info("该用户还未兑换任何商品")
        }else{
          store.delivery.deliveryInfo = data.gifts
          let component = new UserGiftsComponent().$mount()
          document.body.appendChild(component.$el)
          component.$props.title = '用户礼物列表'
          component.$props.uid = id
        }
      }
    });
  }

  handleEdit(id: number, totalPrice: number) {
    this.$router.push("/userInfo/" + id + "/totalPrice/" + totalPrice)
  }

  handleDelete(id:number) {
    UserService.deleteUser(id).then(result=>{
      if(result.status === 200){
        this.$Message.info("删除成功")
        UserService.getUsers()
      }
    })
  }

  pageIndexChanged(val: string) {
    store.user.currentIndex = parseInt(val, 10)
    UserService.getUsers()
  }

  searchByName() {
    UserService.searchUserByName(this.name)
  }

  get tableHeight() {
    return document.body.clientHeight - 200;
  }

  created() {
    store.common.activeIndex = 'user'
    UserService.getUsers()
  }
}