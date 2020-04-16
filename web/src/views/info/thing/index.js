import React, { useState, useEffect, useRef } from "react";
import { Table, Popconfirm, Tooltip, message, Input, Progress } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./index.less";
import api from "api";
const { Search } = Input;
const Thing = (props) => {
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
  const [downloading, setDownloading] = useState(false);
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
        name: "枕套",
        price: "$39.9",
        unit: "件",
      },
      {
        key: "2",
        name: "毛巾",
        price: "$19.9",
        unit: "条",
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
  const toDownload = (data) => {
    setDownloading(true);
    console.log("下载");
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
  const toEdit = (data) => {};

  const toCreate = (data) => {};
  const toDelete = (data) => {};
  const columns = getColumns(sortRef.current, downloading, {
    toEdit: toEdit,
    toCreate: toCreate,
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
  return (
    <section className="thingBox">
      <div className="pageContent">
        <div className="title">
          <span className="tit">物件列表</span>
          <div className="searchBox">
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
      </div>
    </section>
  );
};

export default React.memo(Thing);

const getColumns = (sortedInfo, downloading, actions) => {
  const sotrDicReverse = {
    desc: "descend",
    asc: "ascend",
  };
  return [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "单价",
      dataIndex: "price",
      key: "price",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
    },
    {
      title: "单位",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "操作",
      render: (record, text, index) => {
        return (
          <div className="optIconGroup">
            <Popconfirm
              placement="left"
              title={`请确认是否删除 ${record.name}`}
              onConfirm={() => actions.toDelete(record, index)}
            >
              <Tooltip title="删除">
                <DeleteOutlined />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="编辑">
              <EditOutlined onClick={() => actions.toEdit(record)} />
            </Tooltip>
            {/* <Tooltip title="查看">
              <EyeOutlined onClick={() => actions.toEdit(record)} />
            </Tooltip> */}
            <Tooltip title="新增">
              <PlusOutlined onClick={() => actions.toCreate(record)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];
};
