import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import RequestPageApi from "../store/Request/RequestPageApi";
import {useEffect} from "react";
import RequestPageStore from "../store/Request/RequestPageStore";
import RequestView from "../components/Request";

const RequestPage = () => {
    const id = useParams().id;

    useEffect(() => {
        RequestPageApi.getRequest(id).then(
            (response) => {
                console.log(response);
                RequestPageStore.setData(response.data);
                RequestPageStore.setIsShowData(true);
            }
        )
    }, [id])

    if (!RequestPageStore.isShowData) {
        return (<div>Загрузка...</div>);
    }

    return (<div>
        <RequestView {...RequestPageStore.data} isDetailView={true}/>
    </div>);

}

export default observer(RequestPage);
