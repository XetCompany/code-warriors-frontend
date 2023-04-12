import {Button, Card, Checkbox, Form, Input} from "antd";
import FormApi from "../store/Form/FormApi";
import React, {useEffect} from "react";
import UserStore from "../store/User/UserStore";
import UserApi from "../store/User/UserApi";
import {useNavigate} from "react-router-dom";
import RequestApi from "../store/Request/RequestApi";
import RequestStore from "../store/Request/RequestStore";
import {observer} from "mobx-react";

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

    useEffect(() => {
        UserStore.asyncUpdateUser().then(() => {
            if (UserStore.role.includes('performer')) {
                RequestApi.getCategories().then((response) => {
                    const categories = response.data.data.categories;
                    RequestStore.setCategories(categories);
                    RequestStore.setIsShowCategories(true);
                });
            }
        })
    }, [])

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
                {UserStore.role.includes('performer') && (RequestStore.isShowCategories ? (<Form.Item label="Категории" name="chosen_categories"><Checkbox.Group>
                    {RequestStore.categories.map((category) => {return <Checkbox value={category.id}>{category.name}</Checkbox>})}
                </Checkbox.Group></Form.Item>) : <div>Загрузка...</div>)}
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

export default observer(PersonalAccountEdit);
