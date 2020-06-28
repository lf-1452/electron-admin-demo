
import FdInput from '../modules/basic/input/input.vue'
import FdTextarea from '../modules/basic/textarea/textarea.vue'

import FdSelect from '../select/select.vue'
import FdRadioGroup from '../radio/radio-group.vue'
import FdCheckboxGroup from '../checkbox-group/checkbox-group.vue'
import FdTimePicker from '../time-picker/time-picker.vue'
import FdDateTimePicker from '../date-time-picker/date-time-picker.vue'
import FdUpload from '../upload/upload.vue'
import FdMoneyInput from '../moneyinput/moneyinput.vue'
import FdNumber from '../number/number.vue'
import FdColumn from '../Charts/ColumnMaker.vue'
import FdLine from '../Charts/LineMarker.vue'
import FdPie from '../Charts/PieMaker.vue'

const allComponents = [
  FdInput,
  FdTextarea,
  FdSelect,
  FdRadioGroup,
  FdCheckboxGroup,
  FdTimePicker,
  FdDateTimePicker,
  FdUpload,
  FdMoneyInput,
  FdNumber,
  FdColumn,
  FdLine,
  FdPie
]

const components = {}
allComponents.forEach((Component) => {
  components[Component.name] = Component
})

export default components
