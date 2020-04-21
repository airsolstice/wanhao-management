import React, { useState, useEffect } from "react";
import { Modal, Form } from "antd";
const NewDialog = (props) => {
  const { visible, type, edit, editData } = props;
  useEffect(() => {
    if (edit && editData.name) {
      form.setFieldsValue({
        ...editData,
      });
    }
  }, [edit, editData]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("success:", values);
      props.submit(values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <Modal
      title={`${edit ? "编辑" : "新增"}${type}${
        edit && editData.name ? `-${editData.name}` : ""
      }`}
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => props.toClose()}
    >
      <Form {...layout} form={form}>
        {props.render()}
      </Form>
    </Modal>
  );
};
export default React.memo(NewDialog);
