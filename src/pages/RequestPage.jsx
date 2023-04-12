import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import RequestPageApi from "../store/Request/RequestPageApi";
import {useEffect} from "react";
import RequestPageStore from "../store/Request/RequestPageStore";
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

const RequestPage = () => {
    const id = useParams().id;

    useEffect(() => {
        RequestPageApi.getRequest(id).then(
            (response) => {
                RequestPageStore.setData(response.data);
                RequestPageStore.setIsShowData(true);
            }
        )
    }, [id])

    if (!RequestPageStore.isShowData) {
        return (<div style={{display: 'flex', justifyContent: 'center'}}>Загрузка...</div>);
    }

    if (!UserStore.userIsLoaded) {
        return <div style={{display: 'flex', justifyContent: 'center'}}>Загрузка...</div>;
    }

    return (<div className="request-page">
        <Card>
            <RequestCard {...RequestPageStore.data} isDetailView={true} isMyCard={isMyCardCalculate(RequestPageStore.data)}/>
        </Card>
    </div>);

}

export default observer(RequestPage);
