import {Button, Form, Input, Upload} from "antd";
import FormApi from "../store/Form/FormApi";
import React from "react";
import {BACKEND_URLS} from "../base/Api/constants";
import Url from "../base/Api/Url";
import RequestPageStore from "../store/Request/RequestPageStore";
import RequestPageApi from "../store/Request/RequestPageApi";

const onFinish = (request_id, navigate) => {
    RequestPageApi.addResponseToRequest({
        id: request_id,
        data: FormApi.form.getFieldsValue(),
    }).then((response) => {
        RequestPageApi.getRequest(request_id).then(
            (response) => {
                RequestPageStore.setData(response.data);
            }
        )
    });
}

const onFinishFailed = () => {

}

const RequestResponseForm = ({request_id}) => {
    const [form] = Form.useForm();
    FormApi.setForm(form);

    const route = BACKEND_URLS.PHOTO;
    const photo_url = new Url({route}).defaultUrl;

    const route2 = BACKEND_URLS.VIDEO;
    const video_url = new Url({route: route2}).defaultUrl;

    return (<Form
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
        onFinish={() => onFinish(request_id)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
    >
        <h2>Ответ на заявку</h2>
        <Form.Item
            label="Краткое описание"
            name="description"
        >
            <Input/>
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
                Отправить отклик
            </Button>
        </Form.Item>
    </Form>)
}

export default RequestResponseForm;
