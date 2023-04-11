import React from 'react'
import {Button, Form, Input} from 'antd';
import FormApi from '../store/Form/FormApi';

const onFinish = () => {
    FormApi.login().then(r => {
        console.log('Success login:', r);
    });
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const App = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);
    return (<Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
    >
        <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[{
                required: true, message: 'Пожалуйста, введите имя пользователя!',
            },]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            label="Пароль"
            name="password"
            rules={[{
                required: true, message: 'Пожалуйста, введите пароль!',
            },]}
        >
            <Input.Password/>
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8, span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Сохранить
            </Button>
        </Form.Item>
    </Form>)
};
export default App;
