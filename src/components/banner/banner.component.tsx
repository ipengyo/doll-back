import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ColumnOption, ColumnRenderParams } from 'iview'

import store from '../../stores/store'

import commonService from '../../services/common.service'
import boxService from '../../services/box.service'
import dollService from '../../services/doll.service'

import './box.component.styl'

@Component
export default class BannerComponent extends Vue {
  render(h: CreateElement) {
    return (
      <div banner-component>
        <div class="info-item">
          <p class="item-title">请上传首页轮播图</p>
          <div class="item-content">
            <upload
              ref="upload"
              show-upload-list={true}
              format={['jpg', 'jpeg', 'png']}
              max-size={5120}
              type="drag"
              action={`/doll/api/uploadBanner`}
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <icon type="camera" size="20"></icon>
              </div>
            </upload>
          </div>
        </div>
      </div>
    )
  }

  created() {
    store.common.activeIndex = 'banner'
  }
}