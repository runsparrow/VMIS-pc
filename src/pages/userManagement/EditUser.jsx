import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, notification, Icon } from 'antd';

@connect(({ }) => ({}))
@Form.create({})
export default class EditUser extends Component {
    
    handleSubmit = () => {
        const { dispatch, form ,userinfo} = this.props;
        const { validateFields } = form;
        validateFields(['name', 'realName', "Password", 'mobile', 'email'], (err, values) => {
            if (!err) {
                const param = {
                    entity: {
                        id:userinfo.id,
                        name: values.name,
                        realName: values.realName,
                        password: values.password,
                        mobile: values.mobile,
                        email: values.email
                    }
                }
                dispatch({
                    type: 'usermanagement/updateuser',
                    payload: param,
                }).then(res => {
                    this.props.closed();
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
        const { form, userinfo } = this.props;
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
                <Form.Item label="用户名" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                max: 20,
                                validator(rules, value, callback) {
                                    const errors = [];
                                    if (!value || !/^[0-9a-zA-Z_]{4,20}$/.test(value)) {
                                        errors.push(new Error('请输入4-20位字母和数字及下划线的组合'));
                                    }
                                    callback(errors);
                                },
                            },
                        ],
                        initialValue: userinfo ? userinfo.name : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                max: 20,
                                validator(rules, value, callback) {
                                    const errors = [];
                                    if (!value || !/^[0-9a-zA-Z]{4,20}$/.test(value)) {
                                        errors.push(new Error('请输入4-20位字母和数字的组合'));
                                    }
                                    callback(errors);
                                },
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                        initialValue: userinfo ? userinfo.password : ''
                    })(<Input.Password placeholder="input password" />)}
                </Form.Item>
                <Form.Item label="确认密码" {...formItemLayout}>
                    {getFieldDecorator('ConfirmPassword', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                max: 20,
                                validator(rules, value, callback) {
                                    const errors = [];
                                    if (!value || !/^[0-9a-zA-Z]{4,20}$/.test(value)) {
                                        errors.push(new Error('请输入4-20位字母和数字的组合'));
                                    }
                                    callback(errors);
                                },
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                        initialValue: userinfo ? userinfo.password : ''
                    })(<Input.Password placeholder="input password" />)}
                </Form.Item>
                <Form.Item label="真实姓名" {...formItemLayout}>
                    {getFieldDecorator('realName', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                min: 2,
                                max: 7,
                                validator(rules, value, callback) {
                                    const errors = [];
                                    if (!value || !/^([\u4e00-\u9fa5]){2,7}$/.test(value)) {
                                        errors.push(new Error('请输入真实的中文姓名'));
                                    }
                                    if (!value || value.length > rules.max) {
                                        errors.push(new Error('长度7个字符以内'));
                                    }
                                    callback(errors);
                                },
                            },
                        ],
                        initialValue: userinfo ? userinfo.realName : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="手机号码" {...formItemLayout}>
                    {getFieldDecorator('mobile', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                maxLength: 11,
                                validator(rules, value, callback) {
                                    const errors = [];
                                    if (
                                        !value ||
                                        !/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))+\d{8}/.test(
                                            value
                                        )
                                    ) {
                                        errors.push(new Error('请输入正确的手机号码'));
                                    }
                                    if (value && value.length > rules.maxLength) {
                                        errors.push(new Error('请输入11位手机号码'));
                                    }
                                    callback(errors);
                                },
                            },
                        ],
                        initialValue: userinfo ? userinfo.mobile : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Email" {...formItemLayout}>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                validator(rules, value, callback) {
                                    if (value && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
                                        callback(new Error('请输入正确的邮箱地址'));
                                    } else {
                                        callback();
                                    }

                                },
                            },
                        ],
                        initialValue: userinfo ? userinfo.email : ''
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
