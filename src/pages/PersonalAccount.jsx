import User from "../components/User";
import UserStore from "../store/User/UserStore";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useEffect} from "react";
import UserApi from "../store/User/UserApi";
import {Button} from "antd";

const PersonalAccount = () => {
    useEffect(() => {
        UserApi.getNotifications().then((response) => {
            UserStore.setNotifications(response.data.data);
            UserStore.setNotificationVisibility(true);
        });
    }, [])

    if (!UserStore.user) {
        return (<div>
            <h1>Личный кабинет</h1>
            <div>Вы не авторизованы</div>
        </div>);
    }

    return (<div>
        <h1>Личный кабинет</h1>
        <User {...UserStore.user} />
        <Link to="/personal-account/edit">Редактировать</Link>
        <div>
            <h2>Уведомления</h2>
            <Button onClick={() => UserStore.readAllNotifications()}>
                Прочитать все
            </Button>
            {UserStore.isShowNotification && UserStore.notifications.map((notification, index) => {
                return <div key={index}>{notification.message}</div>;
            })}
        </div>
    </div>);

}
export default observer(PersonalAccount);
