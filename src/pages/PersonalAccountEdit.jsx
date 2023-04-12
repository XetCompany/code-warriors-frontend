import {Button, Card, Form, Input} from "antd";
import FormApi from "../store/Form/FormApi";
import React from "react";
import UserStore from "../store/User/UserStore";
import UserApi from "../store/User/UserApi";
import {useNavigate} from "react-router-dom";

const onFinish = (navigate) => {
    UserApi.updateUserInfo().then(() => {
        UserStore.updateUser();
        navigate('/personal-account');
        alert('Вы успешно обновили профиль!');
    });
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
}

const PersonalAccountEdit = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);

    const navigate = useNavigate();

    if (!UserStore.user) {
        return <div style={{display: 'flex', justifyContent: 'center'}}>Нет данных</div>
    }

    form.setFieldsValue({
        username: UserStore.user.username,
        email: UserStore.user.email,
        fullname: UserStore.user.fullname,
        phone: UserStore.user.phone,
        description: UserStore.user.description,
    });

    return (<div className="account">
        <h1>Редактировать профиль</h1>
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
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="ФИО"
                    name="fullname"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    name="phone"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <Input/>
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
        </Card>
    </div>);
}

export default PersonalAccountEdit;
