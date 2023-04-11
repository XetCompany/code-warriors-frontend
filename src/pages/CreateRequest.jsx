import {Button, Form, Input, Select, Upload, Card} from "antd";
import FormApi from "../store/Form/FormApi";
import React, {useEffect} from "react";
import RequestApi from "../store/Request/RequestApi";
import RequestStore from "../store/Request/RequestStore";
import {BACKEND_URLS} from "../base/Api/constants";
import Url from "../base/Api/Url";
import {observer} from "mobx-react";

const onFinish = () => {
    FormApi.createRequest().then(r => {
        console.log('Success create request:', r);
    });
}

const onFinishFailed = () => {

}

const CreateRequest = () => {
    useEffect(() => {
        RequestStore.setIsShowCategories(false);
        RequestApi.getCategories().then((response) => {
            const categories = response.data.data.categories;
            RequestStore.setCategories(categories);
            RequestStore.setIsShowCategories(true);
        });
    }, [])

    const [form] = Form.useForm();
    FormApi.setForm(form);

    if (!RequestStore.isShowCategories) {
        return <div>Загрузка...</div>;
    }

    const route = BACKEND_URLS.PHOTO;
    const photo_url = new Url({route}).defaultUrl;

    const route2 = BACKEND_URLS.VIDEO;
    const video_url = new Url({route: route2}).defaultUrl;


    return (
    <div className="create-request">
        <h1>Создание заявки</h1>
        <Card>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                width='1000vw'
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >

                <Form.Item
                    label="Заголовок запроса"
                    name="title"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите заголовок запроса!',
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите описание!',
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Желаемая цена от"
                    name="price_from"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите желаемую цену от!',
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Желаемая цена до"
                    name="price_to"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите желаемую цену до!',
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Сроки оказания услуг(дни)"
                    name="deadline_in_days"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите сроки оказания услуг!',
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Место оказания услуг"
                    name="place"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите место оказания услуг!',
                    },]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Категория"
                    name="category"
                    rules={[{
                        required: true, message: 'Пожалуйста, введите категорию!',
                    },]}
                >
                    <Select
                        options={RequestStore.categories.map((category) => {
                            return {
                                value: category.id, label: category.name
                            }
                        })}
                    />
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
                    <Upload action={photo_url}>
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
                    <Upload action={video_url}>
                        <Button>Загрузить</Button>
                    </Upload>
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
    </div>)
}

export default observer(CreateRequest);
