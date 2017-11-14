import Vue, { VNode } from 'vue'
import iView from 'iview'

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      'a': any
      'h1': any
      'div': any
      'table': any
      'tr': any
      'td': any
      'h2': any
      'h3': any
      'h4': any
      'code': any
      'span': any
      'button': any
      'img': any
      'input': any
      'i': any
      'label': any
      'select': any
      'option': any
      'strong': any
      'iframe': any
      'ul': any
      'li': any
      'br': any
      'p': any
      'em': any
      'svg': any
      'address': any
      'article': any
      'circle': any
      'textarea': any
      'template': any
      'transition': any
      'keep-alive': any
      'router-link': any
      'router-view': any
      'canvas': any
      'row': iView.Row
      'i-col': iView.Col
      'i-button': iView.Button
      'button-group': iView.ButtonGroup
      'icon': iView.Icon
      'i-input': iView.Input
      'radio': iView.Radio
      'radio-group': iView.RadioGroup
      'checkbox': iView.Checkbox
      'checkbox-group': iView.CheckboxGroup
      'i-switch': iView.Switch
      'i-table': iView.Table
      'i-select': iView.Select
      'i-option': iView.Option
      'option-group': iView.OptionGroup
      'slider': iView.Slider
      'date-picker': iView.DatePicker
      'time-picker': iView.DatePicker
      'cascader': iView.Cascader
      'transfer': iView.Transfer
      'input-number': iView.InputNumber
      'rate': iView.Rate
      'upload': iView.Upload
      'i-form': iView.Form
      'form-item': iView.FormItem
      'alert': iView.Alert
      'card': iView.Card
      'modal': iView.Modal
      'i-progress': iView.Progress
      'badge': iView.Badge
      'collapse': iView.Collapse
      'panel': iView.Panel
      'timeline': iView.Timeline
      'timeline-item': iView.TimelineItem
      'tag': iView.Tag
      'tooltip': iView.Tooltip
      'poptip': iView.Poptip
      'carousel': iView.Carousel
      'carousel-item': iView.CarouselItem
      'tree': iView.Tree
      'i-menu': iView.Menu
      'menu-item': iView.MenuItem
      'menu-group': iView.MenuGroup
      'submenu': iView.Submenu
      'tabs': iView.Tabs
      'tab-pane': iView.TabPane
      'dropdown': iView.Dropdown
      'dropdown-menu': iView.DropdownMenu
      'dropdown-item': iView.DropdownItem
      'page': iView.Page
      'breadcrumb': iView.Breadcrumb
      'breadcrumb-item': iView.BreadcrumbItem
      'steps': iView.Steps
      'step': iView.Step
      'i-circle': iView.Circle
      'affix': iView.Affix
      'back-top': iView.BackTop
      'spin': iView.Spin
    }
  }
}