import UserStore from "../store/User/UserStore";
import {Button} from "antd";
import {SERVER_URL} from "../base/Api/constants";
import { Link } from "react-router-dom";

const MyRequest = ({...data}) => {
  return (
    <div>
        <h2>Заказ: {data.title}</h2>
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
        <div>Описание: {data.description}</div>
        <div>Цена от: {data.price_from}</div>
        <div>Цена до: {data.price_to}</div>
        <div>Срок выполнения в днях: {data.deadline_in_days}</div>
        <div>Место: {data.place}</div>
        <div>Активен: {data.is_active ? 'Да' : 'Нет'}</div>
        <div>Создан: {data.created_at}</div>
        <div>Обновлен: {data.updated_at}</div>
      {
            UserStore.role && UserStore.role.includes('customer') && (<Button type="primary" onClick={() => {
                const url = SERVER_URL + 'info/request/remove/' + data.id + '/';
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + UserStore.accessToken,
                    },
                }).then((response) => {
                    if (response.status === 204) {
                        alert('Заказ успешно удален');
                    } else {
                        alert('Ошибка при удалении заказа');
                    }
                });
            }}>Удалить</Button>)}
            <Link to="/my-request/edit">Редактировать</Link>
    </div>
  )
}

export default MyRequest;