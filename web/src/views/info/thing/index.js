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
                    key: '1',
                    name: '胡彦斌',
                    age: 32,
                    address: '西湖区湖底公园1号',
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42,
                    address: '西湖区湖底公园1号',
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
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                render: (record, text) => {
                    return (
                        <div className="optIcon">
                            <Tooltip title='编辑' >
                                <Icon type="edit" onClick={() => actions.toEdit(record)} />
                            </Tooltip>
                        </div>
                    )
                }
            }
        ]
    )
}
