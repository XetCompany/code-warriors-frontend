import {observer} from "mobx-react";
import {Button, Input, Rate} from 'antd';
import NotificationStore from "../store/Request/NotificationStore";
import NotificationApi from "../store/Request/NotificationApi";
import UserApi from "../store/User/UserApi";
import UserStore from "../store/User/UserStore";

const notificationInLocal = (notification_id) => {
    return NotificationStore.localNotifications.find((notification) => notification.id === notification_id);
}

const RateUserNoObserver = ({notification}) => {
    const localNotification = notificationInLocal(notification.id);

    return (<div>
        <Rate defaultValue={localNotification && localNotification.rate > 0 ? localNotification.rate : 0}
              onChange={(rate_num) => {
                  NotificationStore.rateUser(notification.user.id, notification.id, rate_num);
              }}/>
        {/*{localNotification && localNotification.rate > 0 &&*/}
        {/*    <div>Вы оценили пользователя на {localNotification.rate}</div>}*/}
        {localNotification && (<div>
            <div>Оставьте комментарий</div>
            <Input.TextArea
                placeholder="Оставьте комментарий"
                autoSize={{minRows: 2, maxRows: 6}}
                onChange={(e) => {
                    NotificationStore.rateUser(notification.action_data.user_id, notification.id, null, e.target.value)
                }}
                defaultValue={localNotification && localNotification.comment ? localNotification.comment : ''}
                disabled={localNotification && localNotification.rate > 0 && localNotification.isSentComment}
            />
            <Button onClick={() => {
                NotificationApi.sendReview(localNotification.user_id, localNotification.rate, localNotification.comment, localNotification.id).then((response) => {
                    UserApi.getNotifications().then((response) => {
                        UserStore.setNotifications(response.data.data);
                    });
                })
            }}>Отправить</Button>
            {localNotification && localNotification.isSentComment && <div>Комментарий отправлен</div>}
        </div>)}
    </div>);
}

const RateUser = observer(RateUserNoObserver);


const Notification = ({notification}) => {
    let action_view = null;
    if (notification.action) {
        switch (notification.action) {
            case 'rating':
                action_view = <RateUser notification={notification}/>
                break;
            default:
                action_view = null;
        }
    }

    return (<div>
        <div>{notification.message}</div>
        {action_view}
    </div>);
}

export default observer(Notification);
