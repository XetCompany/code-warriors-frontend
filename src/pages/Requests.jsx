import React, {useEffect} from "react";
import RequestView from "../components/Request";
import {observer} from "mobx-react";
import RequestStore from "../store/Request/RequestStore";
import RequestApi from "../store/Request/RequestApi";
import UserStore from "../store/User/UserStore";

const Requests = () => {
    useEffect(() => {
        RequestApi.getRequests().then(
            (response) => {
                console.log(response.data);
                UserStore.setUserById(response.data[0].creator.id);
                RequestStore.setData(response.data);
                RequestStore.setIsShowData(true);
            }

        );
    }, [])

    if (!RequestStore.isShowData) {
        return <div>Загрузка...</div>;
    }

    return (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <h1>Заявки</h1>
        <div>
            {RequestStore.data.map((request, index) => {
                return <RequestView key={index} {...request}/>;
            })}
        </div>
    </div>);
}

export default observer(Requests);
