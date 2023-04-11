import {Button, Form, Input} from "antd";
import FormApi from "../store/Form/FormApi";
import React from "react";
import UserStore from "../store/User/UserStore";
import UserApi from "../store/User/UserApi";

const onFinish = (values) => {
    UserApi.updateUserInfo().then(() => {
        console.log('Success:', values);
        UserStore.updateUser();
    });
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
}

const PersonalAccountEdit = () => {
    const [form] = Form.useForm();
    FormApi.setForm(form);

    if (!UserStore.user) {
        return <div>Нет данных</div>
    }

    form.setFieldsValue({
        username: UserStore.user.username,
        email: UserStore.user.email,
        fullname: UserStore.user.fullname,
        phone: UserStore.user.phone,
        description: UserStore.user.description,
    });

    return (<div>
        <h1>Personal Account Edit</h1>
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
    </div>);
}

export default PersonalAccountEdit;
