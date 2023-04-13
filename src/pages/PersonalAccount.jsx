import UserStore from "../store/User/UserStore";
import {observer} from "mobx-react";
import {useEffect} from "react";
import UserApi from "../store/User/UserApi";
import {Button, Card} from "antd";
import UserCard from "../components/UserCard";
import Notification from "../components/Notification";
import UserCardApi from "../store/Request/UserCardApi";
import UserCardStore from "../store/Request/UserCardStore";
import UserCommentCard from "../components/UserCommentCard";

const PersonalAccount = () => {
    useEffect(() => {
        UserCardStore.setIsUserCommentLoaded(false);
        UserApi.getNotifications().then((response) => {
            UserStore.setNotifications(response.data.data);
            UserStore.setNotificationVisibility(true);
        });
        UserCardApi.getCommentsUser(UserStore.user.id).then((data) => {
            UserCardStore.setIsUserCommentLoaded(true);
            UserCardStore.setComments(data.data);
        })
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
            <div>
                {UserCardStore.isUserCommentLoaded && <UserCommentCard comments={UserCardStore.comments}/>}
            </div>
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
