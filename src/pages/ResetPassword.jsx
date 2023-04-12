import React from 'react'
import {Button, Card, Form, Input} from 'antd';
import FormApi from '../store/Form/FormApi';
import {observer} from 'mobx-react';
import { useParams } from 'react-router-dom';
import userStore from '../store/User/UserStore';

const onFinish = () => {
    FormApi.resetPassword().then(r => {
        console.log('Success login:', r);
    });
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const ResetPassword = () => {
    const token = useParams().token;
    userStore.setResetPasswordToken(token)
    const [form] = Form.useForm();
    FormApi.setForm(form);
    form.setFieldValue('token', token);
    return (
        <div className='reset-password'>
            <h1>Сброс пароля</h1>
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
                    label="Новый пароль"
                    name="password"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите пароль!',
                    },]}
                    >
                    <Input/>
                    </Form.Item>
                    <Form.Item
                    label="Token"
                    name="token"
                    disabled
                    >
                    <Input value={userStore.resetPassword}/>
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
                </Form>
    </div>)
};

export default observer(ResetPassword);
