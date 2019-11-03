import { Component } from 'react'
import { Card, Table, Divider, Button, Modal } from 'antd'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { confirm } = Modal;

import Adduser from './AddUser'
import Edituser from './EditUser'

@connect(({ usermanagement }) => ({
    userlist: usermanagement.userlist
}))
export default class usermanagement extends Component {
    state = {
        visible: false,
        usertype: 0,
        userinfo: null
    }

    componentDidMount() {
        this.getuserlist()
    }
    getuserlist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "usermanagement/getuserlist"
        })
    }
    newuser = () => {
        this.setState({ visible: true, usertype: 0 })
    }
    edit = (item) => {
        this.setState({ visible: true, usertype: 1, userinfo: item })
    }

    del = (item) => {
        const { dispatch } = this.props
        let that = this
        confirm({
            title: '删除用户',
            content: `确定要删除用户【${item.name}】嘛？`,
            onOk() {
                dispatch({
                    type: "usermanagement/deluser",
                    payload: {
                        entity: {
                            id: item.id
                        }
                    }
                }).then(item=>{
                    that.getuserlist()
                })
            },
            onCancel() { },
        });
    }
    hideModal = () => {
        this.setState({ visible: false }, () => {
            this.getuserlist()
        })
    }


    render() {
        const { userlist } = this.props
        const { usertype, userinfo } = this.state
        const columns = [
            {
                title: '账户名',
                dataIndex: 'name',
            },
            {
                title: '真实姓名',
                dataIndex: 'realName',
            },
            {
                title: '手机号码',
                dataIndex: 'mobile',
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
                        <Button type="primary" onClick={this.newuser}>新增用户</Button>
                    </div>
                    <Table columns={columns} dataSource={userlist} pagination={false} />
                </Card>
                {this.state.visible ? (
                    <Modal
                        title={usertype == 0 ? "新建用户" : "编辑用户"}
                        width="40%"
                        visible={this.state.visible}
                        onCancel={this.hideModal}
                        footer={null}
                    >
                        {
                            usertype == 0 ? <Adduser closed={this.hideModal} /> : <Edituser userinfo={userinfo} closed={this.hideModal}></Edituser>
                        }
                    </Modal>
                ) : null}
            </PageHeaderWrapper>
        )
    }
}