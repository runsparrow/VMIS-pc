import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, notification, Icon } from 'antd';

@connect(({ }) => ({}))
@Form.create({})
export default class Editvenue extends Component {

    handleSubmit = () => {
        const { dispatch, form,venueinfo } = this.props;
        const { validateFields } = form;
        validateFields(['name', 'code', "alias", 'roomNo', 'floorNo'], (err, values) => {
            if (!err) {
                const param = {
                    entity: {
                        id:venueinfo.id,
                        siteId:venueinfo.siteId,
                        name:values.name,
                        code:values.code,
                        alias:values.alias,
                        roomNo:values.roomNo,
                        floorNo:values.floorNo
                    }
                }
                dispatch({
                    type: 'venuemanagement/updatevenue',
                    payload: param,
                }).then(res => {
                    this.props.closed()
                });
            }
        });
    };

    render() {
        const { form,venueinfo } = this.props;
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
                <Form.Item label="场馆名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场馆名称"
                            },
                        ],
                        initialValue: venueinfo ? venueinfo.name : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场馆编号" {...formItemLayout}>
                    {getFieldDecorator('code', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场馆编号"
                            }
                        ],
                        initialValue: venueinfo ? venueinfo.code : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场馆别名" {...formItemLayout}>
                    {getFieldDecorator('alias', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场馆别名"
                            },
                        ],
                        initialValue: venueinfo ? venueinfo.alias : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场馆房间号" {...formItemLayout}>
                    {getFieldDecorator('roomNo', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场馆房间号"
                            },
                        ],
                        initialValue: venueinfo ? venueinfo.roomNo : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="场馆楼层" {...formItemLayout}>
                    {getFieldDecorator('floorNo', {
                        rules: [
                            {
                                required: true,
                                message: "请输入场馆楼层"
                            },
                        ],
                        initialValue: venueinfo ? venueinfo.floorNo : ''
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
