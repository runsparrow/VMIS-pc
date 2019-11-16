import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

@connect(({ venuesite, user }) => ({
    userinfo: user.userinfo,
    sitelist: venuesite.sitelist,
    venuelist: venuesite.venuelist,
    customerlist: venuesite.customerlist
}))
@Form.create({})
export default class Edittask extends Component {
    state = {
        siteid: null,
        venueid: null
    }

    componentDidMount() {
        this.getsitelist()
        this.getcunstomerlist()
    }
    getcunstomerlist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "venuesite/getcustomerlist"
        })
    }
    getsitelist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "venuesite/getsitelist"
        })
    }
    getvenuelist = (id) => {
        const { dispatch } = this.props;
        const param = {
            Function: {
                Name: 'bysiteid',
                Args: [id]
            }
        }
        dispatch({
            type: "venuesite/getvenuelist",
            payload: param
        })
    }

    selectsite = (item) => {
        this.getvenuelist(item)
        this.setState({ siteid: item }, () => {
            this.props.form.setFieldsValue({
                "venueId": null
            })
        })
    }

    handleSubmit = () => {
        const { dispatch, form ,userinfo,taskinfo} = this.props;
        const { validateFields } = form;
        validateFields(['name', 'siteId', "venueId", 'receptionDateTime','customerId', 'dockingName', 'dockingMobile'], (err, values) => {
            if (!err) {
                let receptionid = Object.keys(userinfo).length>0?userinfo.user.userId:""
                let receptiondatetime = moment(values.receptionDateTime).format("YYYY-MM-DD HH:mm:ss")
                const param = {
                    entity: {
                        id:taskinfo.id,
                        name: values.name,
                        siteId: values.siteId,
                        venueId: values.venueId,
                        receptionDateTime: receptiondatetime,
                        receptionId: receptionid,
                        customerId:values.customerId,
                        dockingName: values.dockingName,
                        dockingMobile:values.dockingMobile
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
        const { form, sitelist, venuelist, customerlist, userinfo,taskinfo } = this.props;
        const { siteid, venueid } = this.state
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
                <Form.Item label="日程名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: "请输入日程名称"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.name : ''
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
                        initialValue: taskinfo ? taskinfo.siteId : ''
                    })(
                        <Select onChange={this.selectsite}>
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
                        initialValue: taskinfo ? taskinfo.venueId : ''
                    })(
                        <Select disabled={!siteid} onChange={this.selectvenue}>
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
                                type: 'object',
                                required: true,
                                message: "请输入接待时间"
                            }
                        ],
                        initialValue: taskinfo ? moment(taskinfo.receptionDateTime) : moment()
                    })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </Form.Item>
                <Form.Item label="接待人名称" {...formItemLayout}>
                    {getFieldDecorator('ReceptionId', {
                        initialValue: Object.keys(userinfo).length > 0 ? userinfo.user.realName : ''
                    })(<Input disabled />)}
                </Form.Item>
                <Form.Item label="客户" {...formItemLayout}>
                    {getFieldDecorator('customerId', {
                        rules: [
                            {
                                required: true,
                                message: "请选择客户"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.customerId : ''
                    })(
                        <Select >
                            {
                                customerlist.length > 0 ? customerlist.map(p => <Option value={p.id}>{p.defaultName}</Option>) : null
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="对接人名称" {...formItemLayout}>
                    {getFieldDecorator('dockingName', {
                        rules: [
                            {
                                required: true,
                                message: "请输入对接人名称"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.dockingName : ''
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="对接人联系方式" {...formItemLayout}>
                    {getFieldDecorator('dockingMobile', {
                        rules: [
                            {
                                required: true,
                                message: "请输入对接人联系方式"
                            },
                        ],
                        initialValue: taskinfo ? taskinfo.dockingMobile : ''
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
