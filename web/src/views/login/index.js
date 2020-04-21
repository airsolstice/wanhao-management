import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.less';
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function Login(props){
    const onFinish = values => {
        window.localStorage.setItem('userInfo',JSON.stringify(values))
        props.history.push('/home')
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
            className="loginPage"
            layout="inline"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};
export default Login;