import UserStore from "../store/User/UserStore";
import {Button} from "antd";
import {SERVER_URL} from "../base/Api/constants";
import RequestApi from "../store/Request/RequestApi";
import RequestStore from "../store/Request/RequestStore";

const RequestView = ({...data}) => {
    return (<div>
        {console.log(data)}
        <h2>Информация о заказе</h2>
        <div>Заказчик: {data.creator.username}</div>
        <div>Исполнитель: {data.executor.username}</div>
        <div>Категория: {data.category.name}</div>
        <div>Фотографии: {data.photos.map((photo, index) => {
            return (<span key={index}>{photo}{index !== data.photos.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>Видео: {data.videos.map((video, index) => {
            return (<span key={index}>{video}{index !== data.videos.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>Отклики: {data.responses.map((response, index) => {
            return (<span key={index}>{response.username}{index !== data.responses.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>Название: {data.title}</div>
        <div>Описание: {data.description}</div>
        <div>Цена от: {data.price_from}</div>
        <div>Цена до: {data.price_to}</div>
        <div>Срок выполнения в днях: {data.deadline_in_days}</div>
        <div>Место: {data.place}</div>
        <div>Активен: {data.is_active ? 'Да' : 'Нет'}</div>
        <div>Создан: {data.created_at}</div>
        <div>Обновлен: {data.updated_at}</div>
        {
            UserStore.role && UserStore.role.includes('performer') && (<Button type="primary" onClick={() => {
                const url = SERVER_URL + 'info/request/' + data.id + '/add_response/';
                fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + UserStore.accessToken,
                    },
                }).then((response) => {
                    if (response.status === 201) {
                        RequestApi.getRequests().then(
                            (response) => {
                                RequestStore.setData(response.data);
                                RequestStore.setIsShowData(true);
                            }
                        )
                    } else {
                    }
                });
            }}>Откликнуться</Button>)} 
    </div>);
}

export default RequestView;
