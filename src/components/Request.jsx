import UserStore from "../store/User/UserStore";
import {Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import RequestResponseForm from "./RequestResponseForm";
import {observer} from "mobx-react";

const RequestView = ({isDetailView = false, ...data}) => {
    const navigate = useNavigate();

    if (!UserStore.userIsLoaded) {
        return (<div>Загрузка...</div>);
    }

    const isResponsed = data.responses.some((response) => {
        return response.user.id === UserStore.user.id;
    });

    const myResponse = data.responses.find((response) => {
        return response.user.id === UserStore.user.id;
    });

    const num_responses = data.responses.length;

    return (<div>
        {
            !isDetailView ? <Link to={'/request/' + data.id}><h2>{data.title}</h2></Link>
                : <h2>{data.title}</h2>
        }
        <div>Заказчик: {data.creator.username}</div>
        <div>Исполнитель: {data.executor.username}</div>
        <div>Категория: {data.category.name}</div>
        <div>Фотографии: {data.photos.map((photo, index) => {
            return (<span key={index}>{photo}{index !== data.photos.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>Видео: {data.videos.map((video, index) => {
            return (<span key={index}>{video}{index !== data.videos.length - 1 ? ', ' : ''}</span>);
        })}</div>
        <div>Отклики: {num_responses}</div>
        <div>Описание: {data.description}</div>
        <div>Цена от: {data.price_from}</div>
        <div>Цена до: {data.price_to}</div>
        <div>Срок выполнения в днях: {data.deadline_in_days}</div>
        <div>Место: {data.place}</div>
        <div>Активен: {data.is_active ? 'Да' : 'Нет'}</div>
        <div>Создан: {data.created_at}</div>
        <div>Обновлен: {data.updated_at}</div>
        {!isDetailView && UserStore.role && UserStore.role.includes('performer') && (!isResponsed ? (
            <Button type="primary" onClick={() => {
                navigate('/request/' + data.id + '/');
            }}>Перейти</Button>) : (<Button type="primary" disabled={true}>Вы уже откликнулись</Button>))}
        {isDetailView && UserStore.role && UserStore.role.includes('performer') && (<>
            <hr/>
            {isResponsed ? (<>
                <div>Ваш отклик: {myResponse.description}</div>
            </>) : <RequestResponseForm request_id={data.id}/>}
        </>)}
    </div>);
}

export default observer(RequestView);
