import React from 'react'
import {Button, Form, Input, Radio, Card} from 'antd';
import FormApi from '../store/Form/FormApi';
import {NavLink, useNavigate} from 'react-router-dom';

const onFinish = (navigate) => {
    FormApi.register().then(r => {
        console.log('Success:', r);
        alert('Вы успешно зарегистрировались!');
        navigate('/login');
    });
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert('Ошибка при регистрации!');
};

const Register = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);
    const navigate = useNavigate();
    return (<div className='register'>
        <h1>Регистрация</h1>
        <Card>
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
                        Зарегистрироваться
                    </Button>
                    <p>
                        Уже есть аккаунт?
                        <NavLink to="/login"> Войти</NavLink>
                    </p>
                </Form.Item>
            </Form>
        </Card>
    </div>)
};
export default Register;
