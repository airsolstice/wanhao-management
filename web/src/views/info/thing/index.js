import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
class Thing extends Component {
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
                    name: '枕套',
                    price: '$39.9',
                    unit: '件',
                },
                {
                    key: '2',
                    name: '毛巾',
                    price: '$19.9',
                    unit: '条',
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
export default Thing;

const getColums = (sortedInfo,actions) => {
    return (
        [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '操作',
                render: (record, text) => {
                    return (
                        <div >
                            <Tooltip title='删除' >
                                <Icon type="close" onClick={() => actions.toEdit(record)} />
                            </Tooltip>
                            <Tooltip title='编辑' >
                                <Icon type="close" onClick={() => actions.toEdit(record)} />
                            </Tooltip>
                            <Tooltip title='查看' >
                                <Icon type="close" onClick={() => actions.toEdit(record)} />
                            </Tooltip>
                            <Tooltip title='新增' >
                                <Icon type="close" onClick={() => actions.toEdit(record)} />
                            </Tooltip>
                        </div>
                        
                    )
                }
            }
        ]
    )
}
