import {Button, Card, Form, Input, Select, Upload} from "antd";
import FormApi from "../store/Form/FormApi";
import React, {useEffect} from "react";
import UserStore from "../store/User/UserStore";
import requestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";
import {useNavigate, useParams} from "react-router-dom";
import RequestStore from "../store/Request/RequestStore";
import RequestPageApi from "../store/Request/RequestPageApi";
import RequestPageStore from "../store/Request/RequestPageStore";
import {observer} from "mobx-react";

const onFinish = (navigate) => {
    RequestApi.updateRequest().then(() => {
        requestStore.updateData();
        navigate('/my-requests');
        alert('Вы успешно обновили заявку!');
    });
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
}

const MyRequestsEdit = () => {
    const requestId = useParams().id;

    useEffect(() => {
        RequestStore.setIsShowCategories(false);
        RequestPageStore.setIsShowData(false);
        RequestApi.getCategories().then((response) => {
            const categories = response.data.data.categories;
            RequestStore.setCategories(categories);
            RequestStore.setIsShowCategories(true);
        });
        RequestPageApi.getRequest(requestId).then(
            (response) => {
                RequestPageStore.setData(response.data);
                RequestPageStore.setIsShowData(true);
                console.log(45678)
            }
        )
    }, [requestId])


    const [form] = Form.useForm();
    FormApi.setForm(form);

    const navigate = useNavigate();

    if (!RequestStore.isShowCategories) {
        return <div>Загрузка...</div>;
    }

    if (!RequestPageStore.isShowData) {
        return <div>Загрузка...</div>;
    }

    console.log(RequestPageStore.data)

    form.setFieldsValue({
        category: RequestPageStore.data.category.id,
        photos: RequestPageStore.data.photos,
        videos: RequestPageStore.data.videos,
        description: RequestPageStore.data.description,
        title: RequestPageStore.data.title,
        responses: RequestPageStore.data.responses,
        place: RequestPageStore.data.place,
        price_from: RequestPageStore.data.price_from,
        price_to: RequestPageStore.data.price_to,
        deadline_in_days: RequestPageStore.data.deadline_in_days,
        id: RequestPageStore.data.id,
        creator: RequestPageStore.data.creator.id,
    });

    return (<div className="my-request-edit">
        <h1>Редактировать заказ</h1>
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
                    label="Заказчик"
                    name="creator"
                >{UserStore.user.username}</Form.Item>
                <Form.Item
                    label="Категория"
                    name="category"
                >
                    <Select options={requestStore.categories.map((category) => {
                        return {
                            value: category.id, label: category.name
                        }
                    })}/>

                </Form.Item>
                <Form.Item
                    label="Фотографии"
                    name="photos"
                    getValueFromEvent={(event) => {
                        let imageList = [];
                        event.fileList.forEach((file) => {
                            if (file.response) {
                                imageList.push(file.response.image);
                            }
                        });
                        return imageList;
                    }}
                >
                    <Upload>
                        <Button>Загрузить</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Видео"
                    name="videos"
                    getValueFromEvent={(event) => {
                        let videoList = [];
                        event.fileList.forEach((file) => {
                            if (file.response) {
                                videoList.push(file.response.video);
                            }
                        });
                        return videoList;
                    }}
                >
                    <Upload>
                        <Button>Загрузить</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Название"
                    name="title"
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
                    label="Желаемая цена от"
                    name="price_from"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Желаемая цена до"
                    name="price_to"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Сроки оказания услуг(дни)"
                    name="deadline_in_days"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Место оказания услуг"
                    name="place"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
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
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>)
}

export default observer(MyRequestsEdit);
