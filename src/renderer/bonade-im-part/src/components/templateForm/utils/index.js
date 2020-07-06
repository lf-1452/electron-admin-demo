/* eslint-disable no-unused-vars */
export const fieldTypes = [
  {
    'label': 'input',
    'value': 'TEXT'
  },
  {
    'label': 'input',
    'value': 'TEL'
  },
  {
    'label': 'textarea',
    'value': 'TEXTAREA'
  },
  {
    'label': 'input',
    'value': 'EMAIL'
  },
  {
    'label': 'input',
    'value': 'RADIO'
  },
  {
    'label': 'time-picker',
    'value': 'DATE'
  },
  {
    'label': 'date-time-picker',
    'value': 'DATE_SECTION'
  },
  {
    'label': 'select',
    'value': 'SELECT'
  },
  {
    'label': 'upload',
    'value': 'UPLOAD'
  },
  {
    'label': 'radio-group',
    'value': 'RADIO-GROUP'
  },
  {
    'label': 'checkbox-group',
    'value': 'CHECKBOX-GROUP'
  }
];

// 表单字段数据格式化
export function transformData(data, type, relationArr) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const obj = {
      type: '',
      modelKey: '',
      label: '',
      props: {},
      rules: [],
      trigger: 'blur',
      isRequired: data[i].isRequired,
      template: {
        type: 'text'
      },
      relationList: [],
      id: ''
    };
    const fieldType = data[i].componentValueType;
    const fieldKey = data[i].propertyCode;
    const fieldName = data[i].propertyName;
    const required = data[i].isRequired;
    const relationList = data[i].relationList;
    const id = data[i].id;

    // 关联字段,这个是所有已经改变值的对象的集合

    if (relationArr) {
      // 遍历所有已经改变值的对象，用modelKey和原来data的值匹配找到，对应字段的值，如果匹配到relationValueNoShow里面的值，那么
      // 改变isFormView属性，用来控制展示与隐藏
      for (let i = 0; i < relationArr.length; i++) {
        const key = relationArr[i].fieldValue.modelKey;
        const value = relationArr[i].item.value;
        if (key && key === fieldKey) {
          if (relationList.length > 0) {
            relationList.forEach((item) => {
              if (item.value === value) {
                if (item.relationValueNoShow.length > 0) {
                  const str = item.relationValueNoShow.join(',');
                  data.forEach((sitem) => {
                    if (str.indexOf(sitem.propertyCode) > -1) {
                      sitem.isFormView = '0';
                    }
                  });
                }
                if (item.relationValueShow.length > 0) {
                  const str = item.relationValueShow.join(',');
                  data.forEach((sitem) => {
                    if (str.indexOf(sitem.propertyCode) > -1) {
                      sitem.isFormView = '1';
                    }
                  });
                }
              }
            });
          }
        }
      }
    }

    // eslint-disable-next-line no-eval
    const fieldExtra = eval('(' + data[i].fieldExtra + ')');
    const {
      template,
      validateCommand
    } = fieldExtra;
    const isValidate = Object.keys(validateCommand).length;
    const isTemplate = Object.keys(template).length;

    obj.modelKey = fieldKey;
    obj.label = fieldName;
    obj.relationList = relationList;
    obj.id = id;
    for (let j = 0; j < fieldTypes.length; j++) {
      if (fieldTypes[j].value === fieldType) {
        obj.type = fieldTypes[j].label;
      }
    }

    if (isTemplate) {
      obj.template = template;
    }

    // 组件属性规则
    if ((fieldType === 'TEXT' || fieldType === 'TEXTAREA') && isTemplate) {
      const {
        status
      } = template;
      if (status === 1) {
        obj.props.readonly = true;
      }
      if (status === 2) {
        obj.isDisplay = true;
      }
    }

    if (fieldType === 'TEXT') {
      obj.props.placeholder = '请输入';
      if (required) {
        obj.rules[0] = {
          required: true,
          message: '请输入',
          trigger: 'blur'
        };
      }
      if (required && isValidate) {
        const LENGTH = validateCommand.LENGTH;
        const message = `长度在 1 到 ${LENGTH} 个字符`;
        obj.rules = [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          {
            min: 1,
            max: LENGTH,
            message: message,
            trigger: 'blur'
          }
        ];
      }
    }

    if (fieldType === 'TEXTAREA') {
      obj.props.placeholder = '请输入';
      obj.props.autosize = true;
      if (required) {
        obj.rules[0] = {
          required: true,
          message: '请输入',
          trigger: 'blur'
        };
      }
      if (required && isValidate) {
        const LENGTH = validateCommand.LENGTH;
        const message = `长度在 1 到 ${LENGTH} 个字符`;
        obj.rules = [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 1,
          max: LENGTH,
          message: message,
          trigger: 'blur'
        }
        ];
      }
    }

    if (fieldType === 'EMAIL') {
      obj.props.placeholder = '请输入';
    }

    if (fieldType === 'DATE') {
      const TYPE = template.type;
      const DATE_FORMAT = validateCommand.DATE_FORMAT;
      obj.props = {
        type: TYPE,
        valueFormat: DATE_FORMAT
      };
    }

    if (fieldType === 'DATE_SECTION') {
      console.log('fieldType:', fieldType);
    }

    if (fieldType === 'SELECT') {
      if (required) {
        obj.rules[0] = {
          required: true,
          message: '请选择',
          trigger: 'change'
        };
      }

      const {
        placeholder,
        dataSourcesType,
        parentId,
        disabled,
        options
      } = template;
      obj.props.placeholder = placeholder || '请输入';
      obj.props.dataSourcesType = dataSourcesType || '0';
      obj.props.parentId = parentId || '';
      obj.props.disabled = disabled || false;
      obj.props.options = options;
    }

    if (fieldType === 'UPLOAD') {
      if (required) {
        obj.rules[0] = {
          required: true,
          message: '请上传',
          trigger: 'change'
        };
      }
    }

    if (fieldType === 'RADIO-GROUP' || fieldType === 'CHECKBOX-GROUP') {
      if (required) {
        obj.rules[0] = {
          required: true,
          message: '请选择',
          trigger: 'change'
        };
      }
      const {
        placeholder,
        dataSourcesType,
        parentId,
        disabled,
        options
      } = template;
      obj.props.placeholder = placeholder || '请选择';
      obj.props.dataSourcesType = dataSourcesType || '0';
      obj.props.parentId = parentId || '';
      obj.props.disabled = disabled || false;
      obj.props.options = options;
    }

    if (type === 'ADD') {
      if (data[i].isFormView === '1') result.push(obj);
    } else {
      result.push(obj);
    }
  }
  return result;
}

export function reduceFormData(data) {
  const schema_result = {
    schema: {
      groups: []
    }
  };
  const dataList = data;
  var resultList = dataList.reduce((resultList, current) => {
    const isLine = current['isLine'];
    let lastList = resultList[resultList.length - 1];
    const lastListHasIsLine = (lastList || []).find((item) => item['isLine']);
    if (!lastList || lastList.length >= 2 || isLine || lastListHasIsLine) {
      lastList = [current];
      resultList.push(lastList);
    } else {
      lastList.push(current);
    }
    return resultList;
  }, []);
  const newResultList = [];
  for (let i = 0; i < resultList.length; i++) {
    const obj = {
      legend: '',
      fields: []
    };
    obj.fields = resultList[i];
    newResultList.push(obj);
  }
  schema_result.schema.groups = newResultList;
  return schema_result;
}

export function paramsFormDataTable(data, moduleArray, id) {
  const result = {
    data: [],
    primaryId: '',
    primaryKey: ''
  };
  const obj = {
    formgroupId: '',
    moduleData: []
  };
  obj.formgroupId = id;
  const moduleDataObj = {};
  let primaryKey = '';

  for (let i = 0; i < moduleArray.length; i++) {
    if (moduleArray[i].moduleField.id === id) {
      for (let j = 0; j < moduleArray[i].children.length; j++) {
        if (moduleArray[i].children[j].isPrimaryKey === '1') {
          primaryKey = moduleArray[i].children[j].propertyCode;
        }
      }
    }
  }
  Object.keys(data).forEach(key => {
    moduleDataObj[key] = {
      text: data[key]
    };
    if (key === primaryKey) {
      result.primaryId = data[key];
      result.primaryKey = primaryKey;
    }
  });

  obj.moduleData.push(moduleDataObj);
  result.data.push(obj);
  return result;
}

export function paramsFormData(data, modelData) {
  const params = [];
  for (let i = 0; i < data.length; i++) {
    const obj = {
      formgroupId: '',
      moduleData: []
    };
    const moduleDataObj = {};
    obj.formgroupId = data[i].moduleField.id;
    for (let j = 0; j < data[i].children.length; j++) {
      Object.keys(modelData[i]).forEach(key => {
        if (key === data[i].children[j].propertyCode) {
          moduleDataObj[data[i].children[j].propertyCode] = {
            text: modelData[i][key]
          };
        }
      });
    }
    obj.moduleData.push(moduleDataObj);
    params.push(obj);
  }
  return params;
}

export function getCommonFormData(data, _type = 'add', dataCopy, arr) {
  const formData = {
    data: [],
    moduleDataList: [],
    formArr: []
  };
  let id = 0;
  data.forEach((item, index) => {
    const moduleTableData = {
      formGroupId: '',
      groupType: '',
      moduleData: []
    };
    const childrenList = [];
    const result = reduceFormData(transformData(item.formProperties, 'ADD', arr));
    // 这个形成了module.schema.group 是结构化模块用
    formData['module' + item.formGroup.id] = {
      ...result
    }; // 表单字段信息转化
    moduleTableData.formGroupId = item.formGroup.id;
    moduleTableData.groupType = item.formGroup.groupType;

    if (dataCopy) { // 关联字段model重新赋值
      moduleTableData.moduleData = dataCopy[index].groupMoudle;
      item.groupMoudle = dataCopy[index].groupMoudle;
    } else {
      moduleTableData.moduleData = item.groupMoudle;
    }

    if (item.formGroup.groupType === '2') {
      item.formProperties.forEach(childrenItem => {
        if (childrenItem.isListView.indexOf('1') > -1) {
          childrenList.push(childrenItem);
        }
        item.groupMoudle.forEach((sitem, _sindex) => {
          id++;
          sitem.id = id;
        });
      });
      item.formProperties = childrenList;
    }
    formData.moduleDataList.push(moduleTableData);
    formData.formArr.push('form' + item.formGroup.id);
  });
  formData.data = data;
  return formData;
}

export function getCommonTable(data) {
  const obj = {};
  obj.title = data.moduleField.groupName;
  const childrenList = [];
  data.children.forEach(item => {
    if (item.isListView.indexOf('1') > -1) {
      childrenList.push(item);
    }
  });
  obj.tableColumns = childrenList;
  obj.operateAuth = data.moduleField.operateAuth;
  obj.propertyType = data.moduleField.propertyType;
  return obj;
}

export function getCommonModelTables(data, children) {
  const { moduleData } = data[0];
  const result = [];
  moduleData.forEach(item => {
    const obj = {};
    children.forEach(childrenItem => {
      // eslint-disable-next-line no-eval
      const fieldExtra = eval('(' + childrenItem.fieldExtra + ')');
      const {
        template
      } = fieldExtra;
      const isTemplate = Object.keys(template).length;
      Object.keys(item).forEach(key => {
        if (childrenItem.propertyCode === key) {
          if (isTemplate) {
            obj[key] = item[key][template.type];
          }
        }
      });
    });
    result.push(obj);
  });
  return result;
}

export function getCommonModelTable(data, _children) {
  const {
    moduleData
  } = data[0];
  const result = [];
  moduleData.forEach(item => {
    const obj = {};
    Object.keys(item).forEach(key => {
      obj[key] = item[key];
    });
    result.push(obj);
  });
  return result;
}

export function getModelTable(data, dataContent) {
  const obj = {};
  const id = data.formGroup.id;
  dataContent.forEach(item => {
    if (item.formGroup.id === id) {
      item.formProperties.forEach(s => { obj[s.propertyCode] = ''; });
    }
  });
  return obj;
}
