import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, notification, Icon } from 'antd';

@connect(({ }) => ({}))
@Form.create({})
export default class AddCustomer extends Component {

    handleSubmit = () => {
        const { dispatch, form,customerinfo } = this.props;
        const { validateFields } = form;
        validateFields(['defaultName', "defaultMobile", 'defaultEmail', 'desc'], (err, values) => {
            if (!err) {
                const param = {
                    entity: {
                        id:customerinfo.id,
                        defaultName: values.defaultName,
                        defaultMobile: values.defaultMobile,
                        defaultEmail: values.defaultEmail,
                        desc: values.desc
                    }
                }
                dispatch({
                    type: 'customermanagement/updatecustomer',
                    payload: param,
                }).then(res => {
                    this.props.closed()
                });
            }
        });
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { form ,customerinfo} = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form>
                <Form.Item label="客户姓名" {...formItemLayout}>
                    {getFieldDecorator('defaultName', {
                        rules: [
                            {
                                required: true,
                                message: "请输入客户姓名"
                            },
                        ],
                        initialValue: customerinfo ? customerinfo.defaultName : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="客户联系方式" {...formItemLayout}>
                    {getFieldDecorator('defaultMobile', {
                        rules: [
                            {
                                required: true,
                                message: "请输入客户联系方式"
                            },
                        ],
                        initialValue: customerinfo ? customerinfo.defaultMobile : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="客户邮箱地址" {...formItemLayout}>
                    {getFieldDecorator('defaultEmail', {
                         initialValue: customerinfo ? customerinfo.defaultEmail : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="备注" {...formItemLayout}>
                    {getFieldDecorator('desc', {
                           initialValue: customerinfo ? customerinfo.desc : ''
                    })(<Input rows={4} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button style={{ marginRight: '20px' }} onClick={this.props.closed}>取消</Button>
                    <Button type="primary" onClick={this.handleSubmit}>
                        确定
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
