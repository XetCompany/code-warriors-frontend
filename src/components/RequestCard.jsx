import UserStore from "../store/User/UserStore";
import {Button, Card} from "antd";
import {Link, useNavigate} from "react-router-dom";
import RequestResponseForm from "./RequestResponseForm";
import {observer} from "mobx-react";
import {SERVER_URL} from "../base/Api/constants";
import RequestPageApi from "../store/Request/RequestPageApi";
import RequestPageStore from "../store/Request/RequestPageStore";
import RequestStore from "../store/Request/RequestStore";


const PerformerActions = ({data, isResponsed, myResponse, isDetailView, navigate, isMyCard = false}) => {
    return (<div>
        {isDetailView ? (<>
            <hr/>
            {isResponsed ? (<>
                <div>Ваш отклик: {myResponse.description}</div>
            </>) : <RequestResponseForm request_id={data.id}/>}
        </>) : (<>
            {!isResponsed ? (<Button type="primary" onClick={() => {
                navigate('/request/' + data.id + '/');
            }}>Перейти</Button>) : (<Button type="primary" disabled={true}>Вы уже откликнулись</Button>)}
        </>)}
    </div>);
}

const CustomerResponses = ({responses, request}) => {
    return (<div>
        <div>Отклики: {responses.length}</div>
        {responses.map((response, index) => {
            return <div key={index}>
                <p>{response.user.id}. {response.user.username} - {response.description}</p>
                <Button type="primary" onClick={() => {
                    RequestPageApi.acceptResponseForRequest(response.user.id, request.id).then((response) => {
                        if (response.status === 201) {
                            RequestPageApi.getRequest(request.id).then(
                                (response) => {
                                    RequestPageStore.setData(response.data);
                                    RequestPageStore.setIsShowData(true);
                                }
                            )
                        } else {
                        }
                    });
                }} disabled={response.executor}>Принять</Button>
            </div>
        })}
    </div>);
}

const CustomerActions = ({data, isResponsed, myResponse, isDetailView, navigate, isMyCard = false}) => {
    return <>
        {isMyCard && (<>
            <Button type="primary" onClick={() => {
                const url = SERVER_URL + 'info/request/remove/' + data.id + '/';
                fetch(url, {
                    method: 'DELETE', headers: {
                        Authorization: 'Bearer ' + UserStore.accessToken,
                    },
                }).then((response) => {
                    if (response.status === 204) {
                        RequestStore.updateRequests();
                    } else {
                    }
                });
            }}>Удалить</Button>
            {data.is_active && <Link to={"/my-request/edit/" + data.id + "/"}>Редактировать</Link>}

            <hr/>
            {data.is_active &&
                <Button type="primary" onClick={() => {
                    RequestPageApi.completeRequest(data.id).then((response) => {
                        if (response.status === 201) {
                            RequestPageApi.getRequest(data.id).then(
                                (response) => {
                                    RequestPageStore.setData(response.data);
                                    RequestPageStore.setIsShowData(true);
                                }
                            )
                        } else {
                        }
                    });
                }} disabled={data.executor.username === null}>Завершить</Button>}
            {isDetailView && data.executor.username === null ? (<> <hr/> <CustomerResponses responses={data.responses} request={data}/> </>) : null}
        </>)}
    </>;
}

const RequestCard = ({isMyCard = false, isDetailView = false, ...data}) => {
    const navigate = useNavigate();

    if (!UserStore.userIsLoaded) {
        return (<div style={{display: 'flex', justifyContent: 'center'}}>Загрузка...</div>);
    }

    const isResponsed = data.responses.some((response) => {
        return response.user.id === UserStore.user.id;
    });

    const myResponse = data.responses.find((response) => {
        return response.user.id === UserStore.user.id;
    });

    const num_responses = data.responses.length;

    return (<Card>
        {!isDetailView ? <Link to={'/request/' + data.id}><h2>{data.title}</h2></Link> : <h2>{data.title}</h2>}
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

        {UserStore.role && UserStore.role.includes('performer') && (
            <PerformerActions data={data} isResponsed={isResponsed} myResponse={myResponse}
                              isDetailView={isDetailView} navigate={navigate} isMyCard={isMyCard}/>)}

        {UserStore.role && UserStore.role.includes('customer') && (
            <CustomerActions data={data} isResponsed={isResponsed} myResponse={myResponse}
                             isDetailView={isDetailView} navigate={navigate} isMyCard={isMyCard}/>)}
    </Card>);
}

export default observer(RequestCard);
