import { Component } from 'react'
import { Card, Table, Divider, Button, Modal } from 'antd'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Addtask from './Addtask'
import Edittask from './Edittask'

const { confirm } = Modal

@connect(({ taskmanagement }) => ({
    tasklist: taskmanagement.tasklist
}))
export default class taskmanagement extends Component {
    state = {
        visible: false,
        tasktype: 0,
        taskinfo: null
    }

    componentDidMount() {
        this.gettasklist()
    }
    gettasklist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "taskmanagement/gettasklist"
        })
    }

    hideModal = () => {
        this.setState({ visible: false }, () => {
            this.gettasklist()
        })
    }

    newtask = () => {
        this.setState({ visible: true, tasktype: 0 })
    }

    edit = (item) => {
        this.setState({ visible: true, tasktype: 1, taskinfo: item })
    }

    del = (item) => {
        const { dispatch } = this.props
        let that = this
        confirm({
            title: '删除用户',
            content: `确定要删除用户【${item.name}】嘛？`,
            onOk() {
                dispatch({
                    type: "taskmanagement/deltask",
                    payload: {
                        entity: {
                            id: item.id
                        }
                    }
                }).then(item => {
                    that.gettasklist()
                })
            },
            onCancel() { },
        });
    }

    render() {
        const { tasklist } = this.props
        const { tasktype, taskinfo } = this.state

        const columns = [
            {
                title: '账户名',
                dataIndex: 'name',
            },
            {
                title: '场地编号',
                dataIndex: 'code',
            },
            {
                title: '场地别名',
                dataIndex: 'alias',
            },
            {
                title: '场地地址',
                dataIndex: 'address',
            },
            {
                title: '场地联系方式',
                dataIndex: 'phone',
            },
            {
                title: '负责人名称',
                dataIndex: 'leaderName',
            },
            {
                title: '负责人联系方式',
                dataIndex: 'leaderMobile',
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
                        <Button type="primary" onClick={this.newtask}>新建日程</Button>
                    </div>
                    <Table columns={columns} dataSource={tasklist} pagination={tasklist.pagination} />
                </Card>
                {this.state.visible ? (
                    <Modal
                        title={tasktype == 0 ? "新建日程" : "编辑日程"}
                        width="40%"
                        visible={this.state.visible}
                        onCancel={this.hideModal}
                        footer={null}
                    >
                        {
                            tasktype == 0 ? <Addtask closed={this.hideModal} /> : <Edittask taskinfo={taskinfo} closed={this.hideModal} />
                        }
                    </Modal>
                ) : null}
            </PageHeaderWrapper>
        )
    }
}