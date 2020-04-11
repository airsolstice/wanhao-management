import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
class Hotel extends Component {
    defaultSortOrder = {
        order: 'descend',
        field: 'name',
        columnKey: 'name'
    }
    state = {
        dataSource: [],
        loading: false,
        sortedInfo: this.defaultSortOrder,
        total:0,
        current: 1,
        pageSize: 10,
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        let _self = this;
        setTimeout(() => {   //setTimeout仅仅是为了显示loading效果，后续会通过ajax来代替;
            _self.getData();
        }, 2000)

    }
    getData = () => {
        // ajax.then( () => {
        //     ...
        // })
        this.setState({
            loading: false,
            dataSource: [
                {
                    id: '1',
                    name: '香格里拉',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
                {
                    id: '2',
                    name: '希尔顿',
                    tel: '028-81234566',
                    addr: '西湖区湖底公园1号',
                    created: '2020-04-08 19:20:30'
                },
            ]
        })
    }
    toEdit = (value) => {
        console.log('edit', value)
    }
    handlePageChange = (current, pageSize) => {
        this.setState({
            current: current,
            pageSize: pageSize
        }, () => {
            this.getData();
        })
    }
    sortChange = (a, b, sortedInfo) => {
        if (!sortedInfo.order) {
            if (sortedInfo.columnKey === this.defaultSortOrder.columnKey) {
                sortedInfo.order = "ascend"
            }
        }
        this.defaultSortOrder = sortedInfo
        this.setState({
            sortedInfo: sortedInfo
        }, () => {
            this.getData();
        })
    }
    render() {
        const { dataSource, loading,total,pageSize,current ,sortedInfo} = this.state;
        const columns = getColums(sortedInfo,{
            toEdit: this.toEdit
        });
        const customPagination = {
            className: "customPagination",
            total: total,
            showTotal: total => `共 ${total} 条`,
            pageSize: pageSize,
            current: current,
            onChange: this.handlePageChange,
            showSizeChanger: true,
            onShowSizeChange: this.handlePageChange
        }
        return (
            <>
                <Table dataSource={dataSource} columns={columns} loading={loading} pagination={customPagination} key={(record, index) => record.id} onChange={this.sortChange} />;
            </>
        )
    }
}
export default Hotel;

const getColums = (sortedInfo,actions) => {
    return (
        [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            },
            {
                title: '酒店名称',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: '地址',
                dataIndex: 'addr',
                key: 'addr',
            },
            {
                title: '联系方式',
                dataIndex: 'tel',
                key: 'tel',
            },
            {
                title: '创建日期',
                dataIndex: 'created',
                key: 'created',
            },
            {
                title: '操作',
                render: (record, text) => {
                    return (
                        <div className="optIcon">
                            <Tooltip title='删除' >
                                <Icon type="close" onClick={() => actions.toEdit(record)} />
                            </Tooltip>
                            <Tooltip title='编辑' >
                                <Icon type="view" onClick={() => actions.toEdit(record)} />
                            </Tooltip>

                        </div>
                        
                    )
                }
            }
        ]
    )
}
