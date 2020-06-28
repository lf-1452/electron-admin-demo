
import { layerOpenWindow } from '@/common/utils/common.js'
export default {
  components: {},
  methods: {
    // 三个 template = '1'
    TEMPLATE_FROM_OR_TABLE_ADD(dialog = '1', bizkey = '', dealmark = 'add') {
      const _this = this
      const URL = `#/templateFormTableAddPopup?dealmark=${dealmark}&bizkey=${bizkey}&dialog=${dialog}`
      layerOpenWindow('新增', URL, '1000px', '600px', function() {
        const {
          page,
          limit
        } = _this.pages
        _this.getTableData(limit, page)
      })
    },
    TEMPLATE_FROM_OR_TABLE_EDIT(bizkey = '', dialog = '1', dealmark = 'update') {
      const _this = this
      const URL = `#/templateFormTableAddPopup?dealmark=${dealmark}&bizkey=${bizkey}&dialog=${dialog}`
      layerOpenWindow('编辑', URL, '1000px', '600px', function() {
        const {
          page,
          limit
        } = _this.pages
        _this.getTableData(limit, page)
      })
    },
    // TEMPLATE_FROM_ADD(a = '1', Popup = false) {
    //   const URL = `#/templateFormAddPopup?type=${a}`
    //   if (Popup) {
    //     layerOpenWindow('新增', URL, '1000px', '600px', function() {
    //     // _self.$emit('search-new', _self.formObj)
    //     })
    //     return
    //   }
    //   this.$router.push({
    //     name: 'FdTemplateFormAdd',
    //     params: {
    //       type: a
    //     }
    //   })
    // },
    // TEMPLATE_FROM_EDIT() {
    //   this.$router.push({
    //     name: 'FdTemplateFormEdit'
    //   })
    // },
    TEMPLATE_FROM_VIEW() {
      this.$router.push({
        name: 'FdTemplateFormView'
      })
    }
  }
}
