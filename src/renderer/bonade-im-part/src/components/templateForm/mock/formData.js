export const fromData = {
  'statue': '0',
  'msg': '成功',
  'statueCode': null,
  'commonMap': {},
  'loginUser': null,
  'dataHeader': '',
  'dataContent': {
    'formGroupList': [
      {
        'formGroup': {
          'id': 4,
          'tenantId': 1,
          'groupName': '资产信息',
          'tableId': 4,
          'isNav': '0',
          'isOpen': '1',
          'groupType': '1',
          'isSingleUpdate': '1',
          'isEdit': '1',
          'propertyType': '2',
          'isTitleShow': '1',
          'operateAuth': null,
          'formId': 4,
          'tableCode': 'AI.INVESTMENT_ASSET',
          'relationList': [],
          'defaultValue': ''
        },
        'formProperties': [
          {
            'id': 10,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field1',
            'propertyName': '主键',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '0',
            'isReadonly': '1',
            'isFormView': '0',
            'isListView': '0',
            'isLock': '1',
            'helpText': null,
            'isPrimaryKey': '1',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'PK_ID',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 11,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field2',
            'propertyName': '公安栋号',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'PUBLIC_NO',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 12,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field3',
            'propertyName': '建筑编号',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'BUILD_NO',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 13,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field4',
            'propertyName': '地上建筑面积',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'FATHER_TYPE',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 14,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field5',
            'propertyName': '赠送',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '单选框',
            'componentValueType': 'RADIO-GROUP',
            'componentType': 'basic',
            'fieldExtra': '{ "template": { "type": "radio-group", "dataSourcesType": "3", "parentId": "0521", "options": [{ "value": "1", "label": "赠送" }, { "value": "2", "label": "不赠送" }] }, "validateCommand": {} }',
            'fieldCode': 'FATHER_TYPE',
            'relationList': [
              {
                label: '赠送',
                value: '1',
                relationValueShow: ['field6'],
                relationValueNoShow: []
              },
              {
                label: '不赠送',
                value: '2',
                relationValueShow: [],
                relationValueNoShow: ['field6']
              }
            ],
            'defaultValue': ''
          },
          {
            'id': 15,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field6',
            'propertyName': '礼物',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '复选框',
            'componentValueType': 'CHECKBOX-GROUP',
            'componentType': 'basic',
            'fieldExtra': '{ "template": { "type": "checkbox-group", "dataSourcesType": "3", "parentId": "0521", "options": [{ "value": "1", "label": "玩具" }, { "value": "2", "label": "零食" }, { "value": "3", "label": "优惠券" }] }, "validateCommand": {} }',
            'fieldCode': 'FATHER_TYPE',
            'defaultValue': ''

          }
        ],
        'groupMoudle': [{
          'field1': '',
          'field2': '',
          'field3': '',
          'field4': ''
        }]
      },
      {
        'formGroup': {
          'id': 5,
          'tenantId': 1,
          'groupName': '楼层列表',
          'tableId': 5,
          'isNav': '0',
          'isOpen': '1',
          'groupType': '1',
          'isSingleUpdate': '0',
          'isEdit': '1',
          'propertyType': '1',
          'isTitleShow': '0',
          'operateAuth': 'add,edit,del',
          'formId': 4,
          'tableCode': 'AI.INVESTMENT_ASSET_DETAIL'
        },
        'formProperties': [
          {
            'id': 14,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field1',
            'propertyName': '主键',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '1',
            'isFormView': '0',
            'isListView': '0',
            'isLock': '1',
            'helpText': null,
            'isPrimaryKey': '1',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'PK_ID',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 15,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field2',
            'propertyName': '资产主键',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '1',
            'isFormView': '0',
            'isListView': '0',
            'isLock': '1',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '1',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'ASSET_ID',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 16,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field3',
            'propertyName': '楼层',
            'componentId': '5',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ5',
            'componentName': '下拉',
            'componentValueType': 'SELECT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"select","dataSourcesType":"3","parentId":"0521","options":[{"value":"1","label":"1H"},{"value":"2","label":"2H"}]},"validateCommand":{}}',
            'fieldCode': 'FLOOR',
            'relationList': [
              {
                label: '1H',
                value: '1',
                relationValueShow: ['field7'],
                relationValueNoShow: ['field8']
              },
              {
                label: '2H',
                value: '2',
                relationValueShow: [],
                relationValueNoShow: []
              }
            ],
            'defaultValue': ''
          },
          {
            'id': 17,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field4',
            'propertyName': '类别',
            'componentId': '5',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ5',
            'componentName': '下拉',
            'componentValueType': 'SELECT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"select","dataSourcesType":"1","parentId":"0522"},"validateCommand":{}}',
            'fieldCode': 'TYPE',
            'relationList': [
              {
                label: '配套',
                value: '1',
                relationValueShow: [],
                relationValueNoShow: ['field9']
              }, {
                label: '可租',
                value: '2',
                relationValueShow: [],
                relationValueNoShow: []
              }
            ],
            'defaultValue': ''
          },
          {
            'id': 18,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field5',
            'propertyName': '单元编号',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '1',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'UNIT_NO',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 19,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field6',
            'propertyName': '附件',
            'componentId': '4',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '0',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ4',
            'componentName': '附件上传',
            'componentValueType': 'UPLOAD',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"upload"},"validateCommand":{}}',
            'fieldCode': 'ATTACHMENT',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 20,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field7',
            'propertyName': '单元面积',
            'componentId': '1',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '0',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ1',
            'componentName': '文本框',
            'componentValueType': 'TEXT',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'UNIT_AREA',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 21,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field8',
            'propertyName': '备注',
            'componentId': '3',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '0',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ3',
            'componentName': '文本域',
            'componentValueType': 'TEXTAREA',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'REAMRK',
            'relationList': [],
            'defaultValue': ''
          },
          {
            'id': 22,
            'tenantId': 0,
            'fieldId': 0,
            'propertyCode': 'field9',
            'propertyName': '备注1',
            'componentId': '3',
            'validationRule': null,
            'isSingleUpdate': null,
            'isLine': null,
            'isRequired': '0',
            'isReadonly': '0',
            'isFormView': '1',
            'isListView': '1',
            'isLock': '0',
            'helpText': null,
            'isPrimaryKey': '0',
            'isForeignKey': '0',
            'componentCode': 'ZJ3',
            'componentName': '文本域',
            'componentValueType': 'TEXTAREA',
            'componentType': 'basic',
            'fieldExtra': '{"template":{"type":"text","status":0},"validateCommand":{"LENGTH":60}}',
            'fieldCode': 'REAMRK',
            'relationList': [],
            'defaultValue': ''
          }
        ],
        'groupMoudle': [
          {
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: '',
            field7: '',
            field8: '',
            field9: ''
          }
        ]
      }
    ],
    'formAction': null
  },
  'dataFooter': ''
}
