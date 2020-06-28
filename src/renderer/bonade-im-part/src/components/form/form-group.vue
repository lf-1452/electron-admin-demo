<template>
  <div class="fd-form-group">
    <div class="fd-form-group-content">
      <slot>
        <fd-form-item
          v-for="(field, index) in fields"
          :key="field.key || index"
          :field="field"
          :edit-text="editText"
          v-bind="$attrs"
          v-on="$listeners"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import FdFormItem from './form-item.vue'
const COMPONENT_NAME = 'fd-form-group'
export default {
  name: COMPONENT_NAME,
  components: {
    FdFormItem
  },
  inheritAttrs: false,
  props: {
    fields: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      }
    },
    editText: {
      type: String,
      default: ''
    }
  }
}
</script>
