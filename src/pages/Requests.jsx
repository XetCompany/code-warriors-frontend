import React, {useEffect} from "react";
import RequestView from "../components/Request";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";

const Requests = () => {
    useEffect(() => {
        RequestStore.setRequesting(true);
        RequestApi.getRequests().then(
            (response) => {
                RequestStore.setData(response.data);
                RequestStore.setRequesting(false);
            }

        );
    }, [])

    if (RequestStore.isRequesting) {
        return <div>Загрузка...</div>;
    }

    console.log(RequestStore.data);

    return (<div>
        <h1>Заявки</h1>
        <div>
            {RequestStore.data.map((request, index) => {
                return <RequestView key={index} {...request}/>;
            })}
        </div>
    </div>);
}

export default observer(Requests);
