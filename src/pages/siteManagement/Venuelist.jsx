import { Component } from 'react'
import { Card, Table, Divider, Button, Modal } from 'antd'
import { connect } from 'dva'
import Editvenue from './Editvenue'

const { confirm } = Modal

@connect(({ venuemanagement }) => ({
    venuelist: venuemanagement.venuelist
}))
export default class venuelist extends Component {
    state = {
        visible: false,
        venueinfo: null,
        sitevisbile: null
    }

    componentDidMount() {
        const { siteinfo } = this.props
        if (siteinfo)
            this.getvenuelist()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.mdvisible && !nextProps.mdvisible) {
            this.getvenuelist()
        }
    }

    getvenuelist = () => {
        const { dispatch, siteinfo } = this.props;
        const param = {
            Funcion: {
                Name: 'bysiteid',
                Args: siteinfo.id
            }

        }
        dispatch({
            type: "venuemanagement/getvenuelist",
            payload: param
        })
    }

    hideModal = () => {
        this.setState({ visible: false }, () => {
            this.getvenuelist()
        })
    }
    edit = (item) => {
        this.setState({ visible: true, venueinfo: item })
    }

    del = (item) => {
        const { dispatch } = this.props
        let that = this
        confirm({
            title: '删除场馆',
            content: `确定要删除场馆【${item.name}】嘛？`,
            onOk() {
                dispatch({
                    type: "venuemanagement/delvenue",
                    payload: {
                        entity: {
                            id: item.id
                        }
                    }
                }).then(item => {
                    that.getvenuelist()
                })
            },
            onCancel() { },
        });
    }

    render() {
        const { venuelist } = this.props
        const { venueinfo } = this.state

        const columns = [
            {
                title: '场馆名',
                dataIndex: 'name',
            },
            {
                title: '场馆编号',
                dataIndex: 'code',
            },
            {
                title: '场馆别名',
                dataIndex: 'alias',
            },
            {
                title: '场馆号',
                dataIndex: 'roomNo',
            },
            {
                title: '场馆楼层',
                dataIndex: 'floorNo',
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
            <div>
                <Card bordered={false}>
                    <Table columns={columns} dataSource={venuelist} pagination={false} />
                </Card>
                {this.state.visible ? (
                    <Modal
                        title="编辑场地"
                        width="40%"
                        visible={this.state.visible}
                        onCancel={this.hideModal}
                        footer={null}
                    >
                        <Editvenue venueinfo={venueinfo} closed={this.hideModal} />
                    </Modal>
                ) : null}
            </div>
        )
    }
}