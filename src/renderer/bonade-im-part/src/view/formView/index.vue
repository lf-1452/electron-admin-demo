<template>
  <div class="form-container">
    <!-- all 表单编辑 -->
    <fd-form-create
      :model="model"
      :schema="schema"
      @submit="submitHandler"
      @reset="resetHandler"
    />
    <!-- 水平详情展示 -->
    <!-- <fd-form-create
      :model="model"
      :schema="schema"
      :edit="false"
    /> -->
    <br>
    <br>
    <br>

    <!-- 竖直详情展示 -->
    <!-- <fd-form-create
      :model="model"
      :schema="schema"
      :edit="false"
      direction="horizontal"
    /> -->
    <!-- 水平单独进行编辑 -->
    <!-- <fd-form-create
      :model="model"
      :schema="schema"
      :edit="false"
      :value="valueEdit"
      :options="options"
      @change="changeHandler"
      @input="inputHandler"
    /> -->
    <!-- 竖直单独进行编辑 -->
    <!-- <fd-form-create
      :model="model"
      :schema="schema"
      :edit="false"
      :value="valueEdit"
      :options="options"
      direction="horizontal"
      @change="changeHandler"
      @input="inputHandler"
    /> -->
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    {{ model }}
  </div>
</template>

<script>
import columnData from '@/components/Charts/column'
import lineData from '@/components/Charts/line'
import pieData from '@/components/Charts/pie'

export default {
  components: {
    fdFormCreate: () => import('@/components/form/form')
  },
  data() {
    return {
      valueEdit: '',
      ss: [
        {
          inputValue: '222',
          ss: '',
          sf: ''
        },
        {

        }
      ],
      model: {
        inputValue: '222',
        tel: '',
        OFFICE_TEL: '',
        inputValue1: '',
        inputValue3: '',
        check_item1: [], // 复选框
        radio_item1: '', // 单选框
        selectValue: '',
        uploadToken: '',
        money1: 2.05,
        money2: 3.00,
        num1: 1.22,
        column1: columnData,
        line1: lineData,
        pie1: pieData,
        pie2: pieData

      },
      schema: {
        groups: [
          {
            legend: '',
            fields: [
              {
                type: 'upload',
                modelKey: 'uploadToken',
                label: '上传',
                props: {},
                template: { type: 'upload' },
                rules: [
                  { required: true, message: '请上传', trigger: 'change' }
                ]
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'select',
                modelKey: 'selectValue',
                label: 'select',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '1H'
                    }, {
                      value: '2',
                      label: '2H'
                    }
                  ],
                  fileType: {
                    value: 'value',
                    label: 'label'
                  },
                  placeholder: '请选择',
                  disabled: false,
                  clearable: true,
                  dataSourcesType: '0',
                  parentId: '266',
                  filterable: true
                },
                relationList: [
                  {
                    label: '1H',
                    value: '1',
                    relationValueShow: ['inputValue'],
                    relationValueNoShow: []
                  },
                  {
                    label: '2H',
                    value: '2',
                    relationValueShow: [],
                    relationValueNoShow: ['inputValue']
                  }
                ],
                template: { type: 'select' },
                rules: [
                  { required: true, message: '请选择', trigger: 'change' }
                ],
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: 'Input',
                props: {
                  placeholder: '请输入'
                },
                template: { type: 'email' },
                isRequired: true,
                rules: [],
                trigger: 'blur'
              },
              {
                type: 'input',
                modelKey: 'tel',
                label: '电话',
                props: {
                  placeholder: '请输入'
                },
                template: { type: 'tel' },
                isRequired: true,
                rules: [],
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'input',
                modelKey: 'OFFICE_TEL',
                label: '座机',
                props: {
                  placeholder: '请输入'
                },
                template: { type: 'landLine' },
                isRequired: true,
                rules: [],
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue1',
                label: '单行输入框',
                props: {
                  placeholder: '请输入'
                },
                template: { type: 'text' },
                rules: [
                  { required: true, message: '请输入', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                isRequired: true,
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'textarea',
                modelKey: 'inputValue3',
                label: '多行文本输入框',
                props: {
                  placeholder: '请输入',
                  autosize: true
                },
                template: { type: 'text' },
                isRequired: [
                  { required: true, message: '请输入', trigger: 'blur' }
                ],
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'checkbox-group',
                modelKey: 'check_item1',
                label: 'checkgroup',
                template: { type: 'checkbox' },
                props: {
                  options: [{
                    value: 1,
                    label: '选项1'
                  }, {
                    value: 2,
                    label: '选项2'
                  }, {
                    value: 3,
                    label: '选项3'
                  }],
                  dataSourcesType: '0', // 0: options 1: code 2: custom
                  parentId: '266'
                },
                isRequired: true,
                rules: [],
                component: 'fd-checkbox-group'
              },
              {
                type: 'radio-group',
                modelKey: 'radio_item1',
                label: 'radiogroup',
                template: { type: 'radiobox' },
                props: {
                  options: [{
                    value: 1,
                    label: '选项1'
                  }, {
                    value: 2,
                    label: '选项2'
                  }, {
                    value: 3,
                    label: '选项3'
                  }],
                  dataSourcesType: '0', // 0: options 1: code 2: custom
                  parentId: '266'
                },
                isRequired: true,
                rules: [],
                component: 'fd-radio-group'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'money-input',
                modelKey: 'money1',
                label: '金额选择',
                template: { type: 'moneyInput' },
                props: {
                  placeholder: '请输入金额',
                  dot: 2, // 保留小数位
                  categary: 1, // 币种 1人民币2美元3日元4英镑
                  showCategary: true, // 展示币种
                  showChinese: true, // 展示中文
                  min: 0,
                  max: 999999999
                },
                isRequired: true,
                rules: [
                  { required: true, message: '请输入金额', trigger: 'blur' }
                ],
                component: 'fd-money-input'
              },
              {
                type: 'number',
                modelKey: 'num1',
                label: '数值',
                template: { type: 'number' },
                props: {
                  placeholder: '请输入数值',
                  dot: 2, // 保留小数位
                  unit: 3, // 单位 1张2只3双4个
                  hasUnit: false,
                  categary: 2, // 1代表数值,2代表百分比
                  min: 0,
                  max: 999999999,
                  status: 2 // 1普通 2只读 3隐藏
                },
                isRequired: true,
                rules: [
                  { required: true, message: '请输入数值', trigger: 'blur' }
                ],
                component: 'fd-money-input'
              }

            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'column',
                modelKey: 'column1',
                label: '柱状图',
                template: { type: 'column' },
                props: {
                  width: '500px',
                  height: '400px',
                  id: 'column1',
                  canSave: false
                },
                rules: [

                ],
                component: 'fd-column'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'line',
                modelKey: 'line1',
                label: '折线图',
                template: { type: 'line' },
                props: {
                  width: '500px',
                  height: '400px',
                  id: 'line1',
                  canSave: false
                },
                rules: [

                ],
                component: 'fd-line'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'pie',
                modelKey: 'pie1',
                label: '饼图',
                template: { type: 'pie' },
                props: {
                  width: '400px',
                  height: '400px',
                  id: 'pie1',
                  canSave: false
                },
                rules: [

                ],
                component: 'fd-pie'
              },
              {
                type: 'pie',
                modelKey: 'pie2',
                label: '饼图',
                template: { type: 'pie' },
                props: {
                  width: '400px',
                  height: '400px',
                  id: 'pie2',
                  canSave: true
                },
                rules: [

                ],
                component: 'fd-pie'
              }

            ]
          }
        ]
      },
      schema1: {
        groups: [
          {
            legend: '',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: 'Input',
                props: {
                  placeholder: '请输入'
                },
                template: { type: 'email' },
                rules: [
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],

                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'input',
                modelKey: 'tel',
                label: '电话',
                props: {
                  placeholder: '请输入'
                },
                template: { type: 'tel' },
                rules: [],
                // validating when blur
                trigger: 'blur'
              },
              {
                type: 'input',
                modelKey: 'inputValue1',
                label: 'Input1',
                props: {
                  placeholder: '请输入'
                },
                rules: [
                  { required: true, message: '请输入', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'textarea',
                modelKey: 'aaaa',
                label: 'Input2',
                props: {
                  placeholder: '请输入',
                  autosize: true
                },
                rules: [
                  { required: true, message: '请输入', trigger: 'blur' }
                ],
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'select',
                modelKey: 'selectValue',
                label: 'select',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '黄金糕'
                    }, {
                      value: '2',
                      label: '双皮奶'
                    }
                  ],
                  fileType: {
                    value: 'value',
                    label: 'label'
                  },
                  placeholder: 'xx',
                  disabled: false,
                  clearable: true
                },
                rules: [
                  { required: true, message: '请选择', trigger: 'change' }
                ],
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'textarea',
                modelKey: 'inputValue3',
                label: 'Input3',
                props: {
                  placeholder: '请输入',
                  autosize: true
                },
                rules: [
                  { required: true, message: '请输入', trigger: 'blur' }
                ],
                // validating when blur
                trigger: 'blur'
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'select',
                modelKey: 'selectValue1',
                label: 'select',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '黄金糕'
                    }, {
                      value: '2',
                      label: '双皮奶'
                    }
                  ],
                  fileType: {
                    value: 'value',
                    label: 'label'
                  },
                  placeholder: 'xx',
                  disabled: false,
                  clearable: true
                },
                rules: [
                  { required: true, message: '请选择', trigger: 'change' }
                ],
                // validating when blur
                trigger: 'blur'
              },
              {
                type: 'radio-group',
                modelKey: 'radioValue',
                label: 'radioGroup',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '黄金糕'
                    }, {
                      value: '2',
                      label: '双皮奶'
                    }
                  ]
                },
                rules: [
                  { required: true, message: '请选择活动资源', trigger: 'change' }
                ]
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'select',
                modelKey: 'selectValue',
                label: 'select',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '黄金糕'
                    }, {
                      value: '2',
                      label: '双皮奶'
                    }
                  ],
                  fileType: {
                    value: 'value',
                    label: 'label'
                  },
                  placeholder: 'xx',
                  disabled: false,
                  clearable: true
                },
                rules: [
                  { required: true, message: '请选择', trigger: 'change' }
                ],
                // validating when blur
                trigger: 'blur'
              },
              {
                type: 'checkbox-group',
                modelKey: 'checkboxValue',
                label: 'checkboxGroup',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '黄金糕'
                    }, {
                      value: '2',
                      label: '双皮奶'
                    }
                  ]
                },
                rules: []
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'time-picker',
                modelKey: 'timePickerValue',
                label: 'timePicker',
                props: {},
                rules: []
              },
              {
                type: 'checkbox-group',
                modelKey: 'checkboxValue',
                label: 'checkboxGroup',
                props: {
                  options: [
                    {
                      value: '1',
                      label: '黄金糕'
                    }, {
                      value: '2',
                      label: '双皮奶'
                    }
                  ]
                },
                rules: []
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'date-time-picker',
                modelKey: 'dateTimePicker',
                label: 'dateTimePicker',
                props: {},
                rules: []
              }
            ]
          },
          {
            legend: '',
            fields: [
              {
                type: 'upload',
                modelKey: 'uploadToken',
                label: '上传',
                props: {},
                rules: [
                  { required: true, message: '请上传首图', trigger: 'change' }
                ]
              }
            ]
          }
        ]
      },
      options: {
        editButtonRole: ['edit', 'view']
      }
    }
  },
  methods: {
    submitHandler() {
      // obj
      console.log('submit')
    },
    resetHandler() {
      console.log('reset')
    },
    changeHandler(obj) {
      console.log('o:', obj)
    },
    inputHandler(val) {
      this.valueEdit = val
    }
  }
}

</script>

<style lang="scss" scoped>
.form-container{
  padding: 40px;
  background-color: #fff;
}
::v-deep .fd-form_standard .fd-form-group .fd-form-group-content .fd-form-item .fd-form-item-row .el-form-item__label{
    height:100%;
}
</style>

