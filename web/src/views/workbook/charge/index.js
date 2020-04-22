import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Popconfirm,
  Tooltip,
  message,
  Input,
  Progress,
  Form,
  Button,
  DatePicker,
  Checkbox,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./index.less";
import "../index.less";
import NewDialog from "../comps/newDiaglog";
import api from "api";
const { Search } = Input;
const Charge = (props) => {
  const pageRef = useRef({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const sortRef = useRef({
    order: "desc",
    field: "id",
    columnKey: "id",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({});
  const [keyword, setKeyword] = useState();
  const [toShow, setToShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const sortDic = {
    descend: "desc",
    ascend: "asc",
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    let _data = [
      {
        id: "1",
        name: "厂房1",
        type: "电费",
        amount: 50,
        unit: "千瓦",
        operator: '张三',
        created: '2020-04-21 09:22:35',
        checked: '已核销',
        checker: 'admin'
      },
      {
        id: "2",
        name: "厂房1",
        type: "电费",
        amount: 50,
        unit: "千瓦",
        operator: '张三',
        created: '2020-04-21 09:22:35',
        checked: '已核销',
        checker: 'admin'
      },
    ];
    setData(_data);
    setLoading(false);
  };
  const handleTableChange = async ({ current, pageSize }, b, sortedInfo) => {
    if (current && pageSize) {
      pageRef.current = {
        ...pageRef.current,
        pageSize: pageSize,
        current: current,
      };
    }
    if (sortedInfo) {
      sortRef.current = {
        order: sortDic[sortedInfo.order],
        field: sortedInfo.field,
      };
    }
    getData();
  };
  const handleSearchChange = (data) => {
    setKeyword(data);
    pageRef.current = {
      ...pageRef.current,
      current: 1,
    };
  };
  const toEdit = (data) => {
    setEdit(true);
    setToShow(true);
    setEditData(data);
  };
  const toClose = () => {
    setEdit(false);
    setToShow(false);
    setEditData({});
  };
  const toDelete = (data) => { };
  const handleSubmit = (data) => {
    console.log("-----提交的数据", data);
    toClose();
  };
  const columns = getColumns(sortRef.current, {
    toEdit: toEdit,
    toDelete: toDelete,
  });
  const customPagination = {
    className: "customPagination",
    total: pageRef.current.total,
    showTotal: (total) => `共 ${total} 条`,
    pageSize: pageRef.current.pageSize,
    current: pageRef.current.current,
    onChange: handleTableChange,
    showSizeChanger: true,
    onShowSizeChange: handleTableChange,
  };
  const form = () => {
    return (
      <>
        <Form.Item
          name="name"
          label="费用名称"
          rules={[{ required: true, message: "费用名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="费用类型"
          rules={[{ required: true, message: "费用类型" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="数量"
          rules={[{ required: true, message: "数量" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="unit"
          label="物件单位"
          rules={[{ required: true, message: "物件单位" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="operator"
          label="创建人"
          rules={[{ required: true, message: "创建人" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="created"
          label="创建日期"
          rules={[{ required: true, message: "创建日期" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="checked"
          label="是否核销"
          rules={[{ required: true, message: "是否核销" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="checker"
          label="核销人"
          rules={[{ required: true, message: "核销人" }]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };
  return (
    <section className="ChargeBox">
      <div className="pageContent">
        <div className="title">
          <span className="tit">成本详情</span>
          <div className="searchBox">
            <Button
              className="addBtn"
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => setToShow(true)}
            >
              新增
            </Button>
            <Search
              size="small"
              placeholder="请输入搜索关键字"
              allowClear
              onChange={(e) => handleSearchChange(e.target.value)}
              onSearch={() => getData()}
              style={{ width: 240 }}
            />
          </div>
        </div>
        <div>
          <Table
            onChange={handleTableChange}
            pagination={customPagination}
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={(record, index) => record.id}
          ></Table>
        </div>
        {toShow ? (
          <NewDialog
            type="物件"
            edit={edit}
            editData={editData}
            visible={toShow}
            toClose={toClose}
            render={form}
            submit={handleSubmit}
          />
        ) : (
            ""
          )}
      </div>
    </section>
  );
};

export default React.memo(Charge);

const getColumns = (sortedInfo, actions) => {
  const sotrDicReverse = {
    desc: "descend",
    asc: "ascend",
  };
  return [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "费用类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "数量",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "单位",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "创建人",
      dataIndex: "operator",
      key: "operator",
    },
    {
      title: "创建日期",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "是否核销",
      dataIndex: "checked",
      key: "checked",
    },
    {
      title: "核销人",
      dataIndex: "checker",
      key: "checker",
    },
    {
      title: "操作",
      render: (record, text, index) => {
        return (
          <div className="optIconGroup">
            <Tooltip title="编辑">
              <EditOutlined onClick={() => actions.toEdit(record)} />
            </Tooltip>
            <Popconfirm
              placement="left"
              title={`请确认是否删除 ${record.name}`}
              onConfirm={() => actions.toDelete(record, index)}
            >
              <Tooltip title="删除">
                <DeleteOutlined />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="核销">
              <EditOutlined onClick={() => actions.toEdit(record)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];
};

