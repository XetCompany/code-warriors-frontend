import {Button, Form, Input, Select, Upload} from "antd";
import FormApi from "../store/Form/FormApi";
import React from "react";
import UserStore from "../store/User/UserStore";
import requestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";

const onFinish = (values) => {
  RequestApi.updateRequest().then(() => {
      console.log('Success:', values);
      requestStore.updateData();
  });
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

const MyRequestsEdit = () => {
  const [form] = Form.useForm();
  FormApi.setForm(form);

  if (!UserStore.user) {
    return <div>Нет данных</div>
  }

  form.setFieldsValue({
    category: requestStore.data[0].category.id,
    photos: requestStore.data[0].photos,
    videos: requestStore.data[0].videos,
    description: requestStore.data[0].description,
    title: requestStore.data[0].title,
    responses: requestStore.data[0].responses,
    place: requestStore.data[0].place,
    price_from: requestStore.data[0].price_from,
    price_to: requestStore.data[0].price_to,
    deadline_in_days: requestStore.data[0].deadline_in_days,
    id: requestStore.data[0].id,
    creator: requestStore.data[0].creator.id,
  });

  return (
    <div>
        <h1>Edit my request</h1>
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
                label="Заказчик"
                name="creator"
            >{UserStore.user.username}</Form.Item>
            <Form.Item
                label="Категория"
                name="category"
            >
                <Select options={
                    requestStore.categories.map((category) => {
                        return {
                            value: category.id, label: category.name
                        }
                    })
                } />
                
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
                <Input />
            </Form.Item>
            <Form.Item
                label="Описание"
                name="description"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Желаемая цена от"
                name="price_from"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Желаемая цена до"
                name="price_to"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Сроки оказания услуг(дни)"
                name="deadline_in_days"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Место оказания услуг"
                name="place"
            >
                <Input />
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
    </div>
  )
}

export default MyRequestsEdit;