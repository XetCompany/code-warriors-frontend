import React, {useEffect} from "react";
import RequestView from "../components/Request";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";
import { Card } from "antd";

const Requests = () => {
    useEffect(() => {
        RequestApi.getRequests().then(
            (response) => {
                RequestStore.setData(response.data);
                RequestStore.setIsShowData(true);
            }

        );
    }, [])

    if (!RequestStore.isShowData) {
        return <div>Загрузка...</div>;
    }

    return (<div className="requests">
        <h1>Заказы</h1>
        <Card>
            <div>
                {RequestStore.data.map((request, index) => {
                    return <RequestView key={index} {...request}/>;
                })}
            </div>
        </Card>
    </div>);
}

export default observer(Requests);
