import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
class Employee extends Component {
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
                    userId: "wh10000",
                    name: '胡彦斌',
                    idCard: '520000',
                    start: '2020-04-10',
                    status: '在职',
                    salary: '¥2000.00',
                },
                {
                    id: '2',
                    userId: "wh10000",
                    name: '胡彦斌',
                    idCard: '51000000000000000',
                    start: '2020-04-10',
                    status: '在职',
                    salary: '¥2000.00',
                },
                {
                    id: '3',
                    userId: "wh10000",
                    name: '胡彦斌',
                    idCard: '51000000000000000',
                    start: '2020-04-10',
                    status: '在职',
                    salary: '¥2000.00',
                },
                {
                    id: '4',
                    userId: "wh10000",
                    name: '胡彦斌',
                    idCard: '51000000000000000',
                    start: '2020-04-10',
                    status: '在职',
                    salary: '¥2000.00',
                },
                {
                    id: '5',
                    userId: "wh10000",
                    name: '胡彦斌',
                    idCard: '51000000000000000',
                    start: '2020-04-10',
                    status: '在职',
                    salary: '¥2000.00',
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
export default Employee;

const getColums = (sortedInfo,actions) => {
    return (
        [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '账号',
                dataIndex: 'userId',
                key: 'userId',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: '身份证',
                dataIndex: 'idCard',
                key: 'idCard',
            },
            {
                title: '入职时间',
                dataIndex: 'start',
                key: 'start',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '工资',
                dataIndex: 'salary',
                key: 'salary',
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
