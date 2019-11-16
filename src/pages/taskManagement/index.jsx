import { Component } from 'react'
import { Card, Table, Divider, Button, Modal } from 'antd'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Addtask from './Addtask'
import Edittask from './Edittask'
import moment from 'moment';

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
        const param = {
            Function: {
                Name: 'bykeyword',
                Args: ['', 'Site', 'Venue', 'Customer']
            }
        }
        dispatch({
            type: "taskmanagement/gettasklist",
            payload: param
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
                title: '日程名称',
                dataIndex: 'name',
            },
            {
                title: '日程时间',
                dataIndex:'receptionDateTime',
                render: item => {
                    return item ? moment(item).format("YYYY-MM-DD HH:mm:ss"):""
                }
            },
            {
                title: '场地名称',
                render: item => {
                    return item.site ? item.site.name : ""
                }
            },
            {
                title: '场馆名称',
                render: item => {
                    return item.venue ? item.venue.name : ""
                }
            },
            {
                title: '客户姓名',
                render: item => {
                    return item.customer ? item.customer.defaultName : ""
                }
            },
            {
                title: '对接人姓名',
                dataIndex: 'dockingName',
            },
            {
                title: '对接人联系方式',
                dataIndex: 'dockingMobile',
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