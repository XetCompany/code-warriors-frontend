import React from 'react'
import {Button, Form, Input, Radio} from 'antd';
import FormApi from '../store/Form/FormApi';
import { NavLink } from 'react-router-dom';

const onFinish = () => {
    FormApi.register().then(r => {
        console.log('Success:', r);
    });
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);
    return (<div>
        <Form
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
                label="Почта"
                name="email"
                rules={[{
                    required: true, message: 'Пожалуйста, введите почту!',
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
                label="Роль"
                name="role"
            >
                <Radio.Group>
                    <Radio value="customer">Заказчик</Radio>
                    <Radio value="performer">Исполнитель</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8, span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
                <p>
                    Уже есть аккаунт?
                    <NavLink to="/login"> Войти</NavLink>
                </p>
            </Form.Item>
        </Form>
    </div>)
};
export default Register;
