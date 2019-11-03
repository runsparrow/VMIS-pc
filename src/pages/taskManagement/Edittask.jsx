import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, notification, Icon } from 'antd';

@connect(({ }) => ({}))
@Form.create({})
export default class Addtask extends Component {

    handleSubmit = () => {
        const { dispatch, form, taskinfo } = this.props;
        const { validateFields } = form;
        validateFields(['name', 'code', "alias", 'address', 'phone', 'leaderName', 'leaderMobile'], (err, values) => {
            if (!err) {
                const param = {
                    entity: {
                        id: taskinfo.id,
                        name: values.name,
                        code: values.code,
                        alias: values.alias,
                        address: values.address,
                        phone: values.phone,
                        leaderName: values.leaderName,
                        leaderMobile: values.leaderMobile
                    }
                }
                dispatch({
                    type: 'taskmanagement/updatetask',
                    payload: param,
                }).then(res => {
                    this.props.closed()
                });
            }
        });
    };

    render() {
        const { form, taskinfo } = this.props;
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
                <Form.Item label="场地名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场地名称"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.name : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场地编号" {...formItemLayout}>
                    {getFieldDecorator('code', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场地编号"
                            }
                        ],
                        initialValue: taskinfo ? taskinfo.code : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场地别名" {...formItemLayout}>
                    {getFieldDecorator('alias', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场地别名"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.alias : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场地地址" {...formItemLayout}>
                    {getFieldDecorator('address', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场地地址"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.address : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场地电话" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场地电话"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.phone : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="负责人名称" {...formItemLayout}>
                    {getFieldDecorator('leaderName', {
                        rules: [
                            {
                                required: true,
                                message: "请输入负责人名称"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.leaderName : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="负责人联系方式" {...formItemLayout}>
                    {getFieldDecorator('leaderMobile', {
                        rules: [
                            {
                                required: true,
                                message: "请输入负责人联系方式"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.leaderMobile : ''
                    })(<Input />)}
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
