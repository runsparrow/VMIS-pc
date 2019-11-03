import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, DatePicker } from 'antd';

const { Option } = Select;

@connect(({ venuesite }) => ({
    sitelist: venuesite.sitelist,
    venuelist: venuesite.venuelist
}))
@Form.create({})
export default class Addtask extends Component {

    componentDidMount() {
        this.getsitelist()
        this.getvenuelist()
    }
    getsitelist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "venuesite/getsitelist"
        })
    }
    getvenuelist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "venuesite/getvenuelist"
        })
    }

    handleSubmit = () => {
        const { dispatch, form } = this.props;
        const { validateFields } = form;
        validateFields(['name', 'siteId', "venueId", 'receptionDateTime', 'dockingName', 'dockingMobile', 'dockingAddress'], (err, values) => {
            if (!err) {
                const param = {
                    entity: {
                        name: values.name,
                        siteId: values.siteId,
                        venueId: values.venueId,
                        receptionDateTime: values.receptionDateTime,
                        dockingName: values.dockingName,
                        dockingMobile: values.dockingMobile,
                        dockingAddress: values.dockingAddress
                    }
                }
                dispatch({
                    type: 'taskmanagement/addtask',
                    payload: param,
                }).then(res => {
                    this.props.closed()
                });
            }
        });
    };

    render() {
        const { form, sitelist, venuelist } = this.props;
        const { getFieldDecorator } = form;
        console.log("sitelist", sitelist)
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
                <Form.Item label="日程名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: "请输入日程名称"
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="预约场地名称" {...formItemLayout}>
                    {getFieldDecorator('siteId', {
                        rules: [
                            {
                                required: true,
                                message: "请输入预约场地名称"
                            },
                        ],
                    })(
                        <Select>
                            {
                                sitelist.length > 0 ? sitelist.map(p => <Option value={p.id}>{p.name}</Option>) : null
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="预约场馆名称" {...formItemLayout}>
                    {getFieldDecorator('venueId', {
                        rules: [
                            {
                                required: true,
                                message: "请输入预约场馆名称"
                            },
                        ],
                    })(
                        <Select>
                            {
                                venuelist.length > 0 ? venuelist.map(p => <Option value={p.id}>{p.name}</Option>) : null
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="接待时间" {...formItemLayout}>
                    {getFieldDecorator('receptionDateTime', {
                        rules: [
                            {
                                required: true,
                                message: "请输入接待时间"
                            }
                        ],
                    })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </Form.Item>
                <Form.Item label="对接人名称" {...formItemLayout}>
                    {getFieldDecorator('dockingName', {
                        rules: [
                            {
                                required: true,
                                message: "请输入对接人名称"
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="对接人联系方式" {...formItemLayout}>
                    {getFieldDecorator('dockingMobile', {
                        rules: [
                            {
                                required: true,
                                message: "请输入联系方式"
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="对接地点" {...formItemLayout}>
                    {getFieldDecorator('dockingAddress', {
                        rules: [
                            {
                                required: true,
                                message: "请输入对接地点"
                            },
                        ],
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
