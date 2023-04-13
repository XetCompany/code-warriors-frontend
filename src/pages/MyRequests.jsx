import React, {useEffect} from "react";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import requestApi from "../store/Request/RequestApi";
import RequestCard from "../components/RequestCard";
import UserStore from "../store/User/UserStore";

const MyRequests = () => {
    useEffect(() => {
        RequestStore.setIsShowMyRequests(false);
        requestApi.getMyRequests().then((response) => {
            RequestStore.setMyRequests(response.data.data);
            RequestStore.setIsShowMyRequests(true);
        });
    }, [])

    if (!RequestStore.isShowMyRequests) {
        return <div
            style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 400}}>Загрузка...</div>;
    }

    if (RequestStore.myRequests.length === 0) {
        return <h1 style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 400}}>Нет
            заданий</h1>;
    }

    const requests = RequestStore.myRequests.filter((request) => {
        if (UserStore.role.includes('customer')) {
            return request.creator.id === UserStore.user.id;
        }
        if (UserStore.role.includes('performer')) {
            return request.executor.id === UserStore.user.id;
        }
        return null
    });

    return (<div className="my-requests">
        <h1>Мои задания</h1>
        <h5 style={{width: 600}}>
            {requests.map((request, index) => {
                return <RequestCard key={index} {...request} isMyCard={true}/>;
            })}
        </h5>
    </div>);
}

export default observer(MyRequests);
