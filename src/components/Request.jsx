import UserStore from "../store/User/UserStore";
import {Button} from "antd";
// import {SERVER_URL} from "../base/Api/constants";
// import RequestApi from "../store/Request/RequestApi";
// import RequestStore from "../store/Request/RequestStore";
import {Link, useNavigate} from "react-router-dom";
import RequestResponseForm from "./RequestResponseForm";

const RequestView = ({isDetailView=false, ...data}) => {
    const isResponsed = data.responses.some((response) => {
        return response.id === UserStore.user.id;
    });

    const navigate = useNavigate();

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
            !isDetailView && UserStore.role && UserStore.role.includes('performer') && (!isResponsed ? (<Button type="primary" onClick={() => {
                // const url = SERVER_URL + 'info/request/' + data.id + '/add_response/';
                // fetch(url, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: 'Bearer ' + UserStore.accessToken,
                //     },
                // }).then((response) => {
                //     if (response.status === 201) {
                //         RequestApi.getRequests().then(
                //             (response) => {
                //                 RequestStore.setData(response.data);
                //                 RequestStore.setIsShowData(true);
                //             }
                //         )
                //     } else {
                //     }
                // });
                navigate('/request/' + data.id + '/');
            }}>Перейти</Button>) : (
                <Button type="primary" disabled={true}>Вы уже откликнулись</Button>
            ))}
        {
            isDetailView && UserStore.role && UserStore.role.includes('performer') && (
                <>
                    <RequestResponseForm/>
                    <p>Оставить коммент</p>
                </>
            )
        }
    </div>);
}

export default RequestView;
