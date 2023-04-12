import UserStore from "../store/User/UserStore";
import {observer} from "mobx-react";
import {useEffect} from "react";
import UserApi from "../store/User/UserApi";
import {Button, Card} from "antd";
import UserCard from "../components/UserCard";
import Notification from "../components/Notification";

const PersonalAccount = () => {
    useEffect(() => {
        UserApi.getNotifications().then((response) => {
            UserStore.setNotifications(response.data.data);
            UserStore.setNotificationVisibility(true);
        });
    }, [])

    if (!UserStore.user) {
        return (<div>
            <h1 style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 400}}>Личный кабинет</h1>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 400}}>Вы не авторизованы</div>
        </div>);
    }

    return (<div className="my-acc" style={{display: 'flex', alignContent: 'center', flexDirection: 'row'}}>
        <div style={{width: '50%'}}>
            <h1 style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: '400'}}>Личный кабинет</h1>
            <UserCard isMyProfile={true} user={UserStore.user} />
        </div>
        <div style={{width: '50%'}}>
            <h1 style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: '400'}}>Уведомления</h1>
            <Card style={{maxWidth: '50vw'}}>
                <Button onClick={() => UserStore.readAllNotifications()}>
                    Прочитать все
                </Button>
                {UserStore.isShowNotification && UserStore.notifications.map((notification, index) => {
                    return <div key={index}>
                        <Notification notification={notification} />
                    </div>;
                })}
            </Card>
        </div>
    </div>);

}
export default observer(PersonalAccount);
