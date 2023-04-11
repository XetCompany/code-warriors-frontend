import React, {useEffect} from "react";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import requestApi from "../store/Request/RequestApi";
import MyRequest from "../components/MyRequest";
import { Card } from "antd";

const MyRequests = () => {
    
    useEffect(() => {
        requestApi.getMyRequests().then(
            (response) => {
                console.log(response.data.data);
                RequestStore.setData(response.data.data);
                RequestStore.setIsShowData(true);
            }
        );
    }, [])

    if (!RequestStore.isShowData) {
        return <div>Загрузка...</div>;
    }

    return (<div className="my-requests">
        <h1>Мои заказы</h1>
        <Card>
            {RequestStore.data.map((request, index) => {
                return <MyRequest key={index} {...request}/>;
            })}
        </Card>
    </div>);
}

export default observer(MyRequests);