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
  Select,
  InputNumber
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./index.less";
import "../index.less";
import api from "api";
import NewDialog from "../comps/newDiaglog";
import moment from 'moment';
const { Search } = Input;
const { Option} = Select;
const Employee = (props) => {
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
        userId: "wh10000",
        name: "胡彦斌",
        idCard: "520000",
        start: "2020-04-10",
        status: "在职",
        salary: "2000.00",
      },
      {
        id: "2",
        userId: "wh10000",
        name: "胡彦斌",
        idCard: "51000000000000000",
        start: "2020-04-10",
        status: "在职",
        salary: "2000.00",
      },
      {
        id: "3",
        userId: "wh10000",
        name: "胡彦斌",
        idCard: "51000000000000000",
        start: "2020-04-10",
        status: "在职",
        salary: "2000.00",
      },
      {
        id: "4",
        userId: "wh10000",
        name: "胡彦斌",
        idCard: "51000000000000000",
        start: "2020-04-10",
        status: "在职",
        salary: "2000.00",
      },
      {
        id: "5",
        userId: "wh10000",
        name: "胡彦斌",
        idCard: "51000000000000000",
        start: "2020-04-10",
        status: "在职",
        salary: "2000.00",
      },
    ];
    setData(_data);
    setLoading(false);
    // api
    //   .getStoreServiceList({
    //     pageNo: pageRef.current.current,
    //     pageSize: pageRef.current.pageSize,
    //     orderField: sortRef.current.field,
    //     orderType: sortRef.current.order,
    //     serviceName: keyword,
    //   })
    //   .then((res) => {
    //     if (res.data.code === 200) {
    //       pageRef.current = {
    //         total: res.data.data.total,
    //         pageSize: res.data.data.size,
    //         current: res.data.data.current,
    //       };
    //       setData(res.data.data.records);
    //     }
    //     setLoading(false);
    //   });
  };
  const handleTableChange = async ({ current, pageSize }, b, sortedInfo) => {
    // console.log(current, pageSize, sortedInfo)
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
    data.start = moment(data.start, "YYYY-MM-DD")||''
    setEditData(data);
  };
  const toClose = () => {
    setEdit(false);
    setToShow(false);
    setEditData({});
  };
  const toDelete = (data) => {};
  const handleSubmit = (data) => {
    console.log("-----提交的数据", data);
    data.start = data.start.format('YYYY-MM-DD');
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
  const employeeStatus = {
    1: "在职",
    2: "试用期",
    3: "离职",
    4: "休假中",
  };
  const form = () => {
    return (
      <>
        <Form.Item
          name="userId"
          label="账号"
          rules={[{ required: true, message: "员工账号必填" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: "员工名称必填" }]}
          
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          name="idCard"
          label="身份证号"
          rules={[{ required: true, message: "身份证号必填" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="start"
          label="入职时间"
          rules={[{ required: true, message: "入职时间必填" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: "状态必选" }]}
        >
          <Select placeholder="请选择">
            {Object.keys(employeeStatus).length &&
              Object.keys(employeeStatus).map((i) => {
                return (
                  <Option key={i} value={i}>
                    {employeeStatus[i]}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="salary"
          label="工资"
          rules={[{ required: true, message: "工资必填" }]}
        >
          <Input prefix="￥" suffix="RMB" />
        </Form.Item>
      </>
    );
  };
  return (
    <section className="EmployeeBox">
      <div className="pageContent">
        <div className="title">
          <span className="tit">员工列表</span>
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
            type="员工"
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

export default React.memo(Employee);
const getColumns = (sortedInfo, actions) => {
  return [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "账号",
      dataIndex: "userId",
      key: "userId",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "userId" && sortedInfo.order,
    },
    {
      title: "身份证",
      dataIndex: "idCard",
      key: "idCard",
    },
    {
      title: "入职时间",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "工资",
      dataIndex: "salary",
      key: "salary",
      render:(text) => {
        return `¥${text}`
      }
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
          </div>
        );
      },
    },
  ];
};
