export const fieldTypes = [
    {
        'label': 'input',
        'value': 'TEXT'
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
    }
]

export function transformData(data) {
    const result = []
    for (let i = 0; i < data.length; i++) {
        const obj = {
            type: '',
            modelKey: '',
            label: '',
            props: {},
            rules: [],
            trigger: 'blur',
            isRequired: data[i].isRequired,
            template: { type: 'text' }
        }
        const fieldType = data[i].componentValueType
        const fieldKey = data[i].propertyCode
        const fieldName = data[i].fieldName
        const required = data[i].isRequired
        // eslint-disable-next-line no-eval
        const fieldExtra = eval('(' + data[i].fieldExtra + ')')
        const {
            template,
            validateCommand
        } = fieldExtra
        const isValidate = Object.keys(validateCommand).length
        const isTemplate = Object.keys(template).length

        obj.modelKey = fieldKey
        obj.label = fieldName
        for (let j = 0; j < fieldTypes.length; j++) {
            if (fieldTypes[j].value === fieldType) {
                obj.type = fieldTypes[j].label
            }
        }

        if ((fieldType === 'TEXT' || fieldType === 'TEXTAREA') && isTemplate) {
            const {
                status
            } = template
            if (status === 1) {
                obj.props.readonly = true
            }
            if (status === 2) {
                obj.isDisplay = true
            }
        }

        if (fieldType === 'TEXT') {
            obj.props.placeholder = '请输入'
            if (required) {
                obj.rules[0] = {
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }
            }
            if (required && isValidate) {
                const LENGTH = validateCommand.LENGTH
                const message = `长度在 1 到 ${LENGTH} 个字符`
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
                ]
            }
        }

        if (fieldType === 'TEXTAREA') {
            obj.props.placeholder = '请输入'
            obj.props.autosize = true
            if (required) {
                obj.rules[0] = {
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }
            }
            if (required && isValidate) {
                const LENGTH = validateCommand.LENGTH
                const message = `长度在 1 到 ${LENGTH} 个字符`
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
                ]
            }
        }

        if (fieldType === 'EMAIL') {
            obj.props.placeholder = '请输入'
        }

        if (fieldType === 'DATE') {
            const TYPE = template.type
            const DATE_FORMAT = validateCommand.DATE_FORMAT
            obj.props = {
                type: TYPE,
                valueFormat: DATE_FORMAT
            }
        }

        if (fieldType === 'DATE_SECTION') {
            console.log('fieldType:', fieldType)
        }

        result.push(obj)
    }
    console.log('result:', result)
    return result
}

