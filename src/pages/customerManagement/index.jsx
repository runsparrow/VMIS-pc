import { Component } from 'react'
import { Card, Table, Divider, Button, Modal } from 'antd'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { confirm } = Modal;

import Addcustomer from './AddCustomer'
import Editcustomer from './EditCustomer'

@connect(({ customermanagement }) => ({
    customerlist: customermanagement.customerlist
}))
export default class customermanagement extends Component {
    state = {
        visible: false,
        customertype: 0,
        customerinfo: null
    }

    componentDidMount() {
        this.getcustomerlist()
    }
    getcustomerlist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "customermanagement/getcustomerlist"
        })
    }
    newcustomer = () => {
        this.setState({ visible: true, customertype: 0 })
    }
    edit = (item) => {
        this.setState({ visible: true, customertype: 1, customerinfo: item })
    }

    del = (item) => {
        const { dispatch } = this.props
        let that = this
        confirm({
            title: '删除客户',
            content: `确定要删除客户【${item.defaultName}】嘛？`,
            onOk() {
                dispatch({
                    type: "customermanagement/delcustomer",
                    payload: {
                        entity: {
                            id: item.id
                        }
                    }
                }).then(item => {
                    that.getcustomerlist()
                })
            },
            onCancel() { },
        });
    }
    hideModal = () => {
        this.setState({ visible: false }, () => {
            this.getcustomerlist()
        })
    }


    render() {
        const { customerlist } = this.props
        const { customertype, customerinfo } = this.state
        const columns = [
            {
                title: '客户姓名',
                dataIndex: 'defaultName',
            },
            {
                title: '客户联系方式',
                dataIndex: 'defaultMobile',
            },
            {
                title: '客户邮箱',
                dataIndex: 'defaultEmail',
            },
            {
                title: '备注',
                dataIndex: 'desc',
            },
            {
                title: "操作",
                render: (item) => (
                    <span>
                        <a onClick={() => this.edit(item)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.del(item)}>删除</a>
                    </span>
                )
            }
        ]

        return (
            <PageHeaderWrapper style={{ height: "64px", flexWrap: "wrap-reverse", display: "flex", alignItems: "center" }} title=" ">
                <Card bordered={false}>
                    <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px" }}>
                        <Button type="primary" onClick={this.newcustomer}>新增客户</Button>
                    </div>
                    <Table columns={columns} dataSource={customerlist} pagination={false} />
                </Card>
                {this.state.visible ? (
                    <Modal
                        title={customertype == 0 ? "新建客户" : "编辑客户"}
                        width="40%"
                        visible={this.state.visible}
                        onCancel={this.hideModal}
                        footer={null}
                    >
                        {
                            customertype == 0 ? <Addcustomer closed={this.hideModal} /> : <Editcustomer customerinfo={customerinfo} closed={this.hideModal}></Editcustomer>
                        }
                    </Modal>
                ) : null}
            </PageHeaderWrapper>
        )
    }
}