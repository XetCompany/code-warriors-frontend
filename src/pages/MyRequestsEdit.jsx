import {Button, Form, Input, Select, Upload} from "antd";
import FormApi from "../store/Form/FormApi";
import React from "react";
import UserStore from "../store/User/UserStore";
import { BACKEND_URLS } from "../base/Api/constants";
import Url from "../base/Api/Url";
import requestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";

const onFinish = (values) => {
  RequestApi.updateRequest().then(() => {
      console.log('Success:', values);
      requestStore.setData();
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

    const route = BACKEND_URLS.PHOTO;
    const photo_url = new Url({route}).defaultUrl;

    const route2 = BACKEND_URLS.VIDEO;
    const video_url = new Url({route: route2}).defaultUrl;
    console.log(requestStore.data[0]);
    // if (requestStore.data.executor.id === null) {
    //     executor: null
    // } else {
    //     executor: requestStore.data.executor.id
    // }

  form.setFieldsValue({
    creator: UserStore.userId,
    category: requestStore.data.category,
    photos: requestStore.data.photos,
    videos: requestStore.data.videos,
    description: requestStore.data.description,
    responses: requestStore.data.responses,
    place: requestStore.data.place,
    price_from: requestStore.data.price_from,
    price_to: requestStore.data.price_to,
    deadline_in_days: requestStore.data.deadline_in_days,
    id: requestStore.data.id,
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
            // onBeforeLoad={}
            form={form}
        >
            {/* <Form.Item
                label="Категория"
                name="category"
            >
                <Select 
                options={requestStore.categories.map((category) => {
                    return {
                        value: category.id, label: category.name
                    }
                })}
                value={requestStore.data.category}
                 />
            </Form.Item> */}
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
                <Upload 
                // value={requestStore.data.photos.map((photo, index) => {
                //     return (<span key={index}>{photo}{index !== requestStore.data.photos.length - 1 ? ', ' : ''}</span>);
                // })}
                action={photo_url}
                >
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
                <Upload
                // value={requestStore.data.videos.map((video, index) => {
                //     return (<span key={index}>{video}{index !== requestStore.data.videos.length - 1 ? ', ' : ''}</span>);
                // })}
                action={video_url}
                >
                    <Button>Загрузить</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="Название"
                name="title"
            >
                <Input value={requestStore.data[0].title} />
            </Form.Item>
            <Form.Item
                label="Описание"
                name="description"
            >
                <Input value={requestStore.data[0].description} />
            </Form.Item>
            <Form.Item
                label="Желаемая цена от"
                name="price_from"
            >
                <Input value={requestStore.data[0].price_from} />
            </Form.Item>
            <Form.Item
                label="Желаемая цена до"
                name="price_to"
            >
                <Input value={requestStore.data[0].price_to} />
            </Form.Item>
            <Form.Item
                label="Сроки оказания услуг(дни)"
                name="deadline_in_days"
            >
                <Input value={requestStore.data[0].deadline_in_days} />
            </Form.Item>
            <Form.Item
                label="Место оказания услуг"
                name="place"
            >
                <Input value={requestStore.data[0].place} />
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