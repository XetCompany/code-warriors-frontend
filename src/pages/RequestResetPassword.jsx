import React from 'react'
import {Button, Card, Form, Input} from 'antd';
import FormApi from '../store/Form/FormApi';
import {observer} from 'mobx-react';

const onFinish = () => {
    FormApi.requestResetPassword().then(r => {
        console.log('Success login:', r);
    });
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const RequestResetPassword = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);
    return (
    <div className='reset-password'>
        <h1>Запрос на сброс пароля</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    width: 600,
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
                label="Введите почту"
                name="email"
                rules={[{
                    required: true, message: 'Пожалуйста, введите почту!',
                },]}
                >
                <Input/>
                </Form.Item>
                <Form.Item
                wrapperCol={{
                    offset: 8, span: 16,
                }}
                >
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
    </div>)
};

export default observer(RequestResetPassword);
