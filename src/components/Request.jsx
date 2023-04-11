//     {
//         "id": 1,
//         "creator": {
//             "id": 2,
//             "username": "XetPy"
//         },
//         "executor": {
//             "id": 1,
//             "username": "admin"
//         },
//         "category": "Программист",
//         "photos": [
//             "photos/Снимок_экрана_2023-02-20_012127.png",
//             "photos/Снимок_экрана_2023-03-19_153048.png"
//         ],
//         "videos": [
//             "videos/photo_2023-01-04_02-27-57.jpg"
//         ],
//         "responses": [],
//         "title": "Веб-Сайт",
//         "description": "Ого огромное описание",
//         "price_from": 1000,
//         "price_to": 2000,
//         "deadline_in_days": 4,
//         "place": "Дистанционно",
//         "is_active": true,
//         "created_at": "2023-04-11T04:31:57.560444+03:00",
//         "updated_at": "2023-04-11T04:31:57.560444+03:00"
//     }
import UserStore from "../store/User/UserStore";
import {Button} from "antd";
import {SERVER_URL} from "../base/Api/constants";

const RequestView = ({...data}) => {
    return (<div>
        <h2>Информация о заказе</h2>
        <div>Заказчик: {data.creator.username}</div>
        <div>Исполнитель: {data.executor.username}</div>
        <div>Категория: {data.category}</div>
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
                        alert('Отклик успешно отправлен');
                    } else {
                        alert('Ошибка при отправке отклика');
                    }
                });
            }}>Откликнуться</Button>)}
    </div>);
}

export default RequestView;
