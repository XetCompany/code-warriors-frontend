import React, {useEffect} from "react";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import requestApi from "../store/Request/RequestApi";
import MyRequest from "../components/MyRequest";

const MyRequests = () => {
    useEffect(() => {
        RequestStore.setIsShowMyRequests(false);
        requestApi.getMyRequests().then(
            (response) => {
                RequestStore.setMyRequests(response.data.data);
                RequestStore.setIsShowMyRequests(true);
            }
        );
    }, [])

    if (!RequestStore.isShowMyRequests) {
        return <div>Загрузка...</div>;
    }

    return (<div>
        <h1>Мои заявки</h1>
        <div>
            {RequestStore.myRequests.map((request, index) => {
                return <MyRequest key={index} {...request}/>;
            })}
        </div>
    </div>);
}

export default observer(MyRequests);
