import User from "../components/User";
import UserStore from "../store/User/UserStore";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useEffect} from "react";
import UserApi from "../store/User/UserApi";
import {Button, Card} from "antd";

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

    return (<div style={{display: 'flex', alignContent: 'center', flexDirection: 'row'}}>
        <div style={{width: '50%'}}>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Личный кабинет</h1>
            <Card style={{maxWidth: '50vw'}}>
                <div>
                    <User {...UserStore.user} />
                </div>
                <Link style={{display: 'flex', justifyContent: 'center'}} to="/personal-account/edit">Редактировать профиль</Link>
            </Card>
        </div>
        <div style={{width: '50%'}}>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>Уведомления</h2>
            <Card style={{maxWidth: '50vw'}}>
                <Button onClick={() => UserStore.readAllNotifications()}>
                    Прочитать все
                </Button>
                {UserStore.isShowNotification && UserStore.notifications.map((notification, index) => {
                    return <div key={index}>{notification.message}</div>;
                })}
            </Card>
        </div>
    </div>);

}
export default observer(PersonalAccount);
