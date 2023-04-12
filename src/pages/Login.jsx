import React from 'react'
import {Button, Form, Input, Card} from 'antd';
import FormApi from '../store/Form/FormApi';
import {useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const onFinish = (navigate) => {
    FormApi.login().then(r => {
        console.log('Success login:', r);
        navigate('/');
    });
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const App = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);
    const navigate = useNavigate();
    return (<div className='login'>
        <h1>Вход</h1>
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
                onFinish={() => {
                    onFinish(navigate);
                }}
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
                        Войти
                    </Button>
                    <p>Нет аккаунта? <NavLink to="/register">Зарегистрироваться</NavLink> || <NavLink to="/request-password-reset">Забыли пароль?</NavLink></p>
                </Form.Item>
            </Form>
    </div>)
};
export default App;
