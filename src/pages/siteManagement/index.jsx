import { Component } from 'react'
import { Card, Table, Divider, Button, Modal } from 'antd'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Venuelist from './Venuelist'
import Addsite from './Addsite'
import Editsite from './Editsite'
import Addvenue from './Addvenue'


const { confirm } = Modal

@connect(({ sitemanagement }) => ({
    sitelist: sitemanagement.sitelist
}))
export default class sitemanagement extends Component {
    state = {
        visible: false,
        sitetype: 0,
        siteinfo: null
    }

    componentDidMount() {
        this.getsitelist()
    }
    getsitelist = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "sitemanagement/getsitelist"
        })
    }

    hideModal = () => {
        this.setState({ visible: false }, () => {
            this.getsitelist()
        })
    }

    newsite = () => {
        this.setState({ visible: true, sitetype: 0 })
    }
    addvenue = (item) => {
        this.setState({ visible: true, sitetype: 2, siteinfo: item })
    }

    edit = (item) => {
        this.setState({ visible: true, sitetype: 1, siteinfo: item })
    }

    del = (item) => {
        const { dispatch } = this.props
        let that = this
        confirm({
            title: '删除场地',
            content: `确定要删除场地【${item.name}】嘛？`,
            onOk() {
                dispatch({
                    type: "sitemanagement/delsite",
                    payload: {
                        entity: {
                            id: item.id
                        }
                    }
                }).then(item => {
                    that.getsitelist()
                })
            },
            onCancel() { },
        });
    }

    render() {
        const { sitelist } = this.props
        const { sitetype, siteinfo, visible } = this.state

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
                        <a onClick={() => this.addvenue(item)}>新增场馆</a>
                        <Divider type="vertical" />
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
                        <Button type="primary" onClick={this.newsite}>新建场地</Button>
                    </div>
                    <Table columns={columns}
                        expandedRowRender={(record, index, indent, expanded) => expanded ? <Venuelist mdvisible={visible} siteinfo={record} /> : null}
                        dataSource={sitelist} pagination={false} />
                </Card>
                {visible ? (
                    <Modal
                        title={sitetype == 0 ? "新建场地" : "编辑场地"}
                        width="40%"
                        visible={visible}
                        onCancel={this.hideModal}
                        footer={null}
                    >
                        {
                            sitetype == 0 ? <Addsite closed={this.hideModal} /> : sitetype == 1 ? <Editsite siteinfo={siteinfo} closed={this.hideModal} /> : <Addvenue siteinfo={siteinfo} closed={this.hideModal} />
                        }
                    </Modal>
                ) : null}
            </PageHeaderWrapper>
        )
    }
}