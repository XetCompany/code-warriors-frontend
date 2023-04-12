import React, {useEffect} from "react";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";
import { Card } from "antd";
import RequestCard from "../components/RequestCard";
import UserStore from "../store/User/UserStore";


const isMyCardCalculate = (request) => {
    const isCustomer = UserStore.role.includes('customer');
    const isPerformer = UserStore.role.includes('performer');

    if (isCustomer) {
        return request.creator.id === UserStore.user.id;
    }

    if (isPerformer) {
        return request.executor.id === UserStore.user.id;
    }
}


const Requests = () => {
    useEffect(() => {
        RequestApi.getRequests().then(
            (response) => {
                RequestStore.setData(response.data);
                RequestStore.setIsShowData(true);
            }
        );
        UserStore.asyncUpdateUser();
    }, [])

    if (!RequestStore.isShowData) {
        return <div>Загрузка...</div>;
    }

    if (!UserStore.userIsLoaded) {
        return <div>Загрузка...</div>;
    }

    const requests = RequestStore.data.filter(
        (request) => {
            const isCustomer = UserStore.role.includes('customer');
            const isPerformer = UserStore.role.includes('performer');

            if (isCustomer) {
                return true;
            }

            if (isPerformer) {
                return request.executor.id === null || request.executor.id === UserStore.user.id;
            }

            return true;
        }
    )

    return (<div className="requests">
        <h1>Заказы</h1>
        <>
            <div>
                {requests.map((request, index) => {
                    return <RequestCard key={index} {...request} isMyCard={isMyCardCalculate(request)}/>;
                })}
            </div>
        </>
    </div>);
}

export default observer(Requests);
