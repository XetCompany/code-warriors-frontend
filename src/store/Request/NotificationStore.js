import {makeAutoObservable} from "mobx";

const createOrNullNotification = (localNotifications, notification_id) => {
    let notification = localNotifications.find((notification) => notification.id === notification_id);
    if (!notification) {
        notification = {
            id: notification_id,
            rate: 0,
        };
        localNotifications.push(notification);
    }
    return notification;
}

class NotificationStore {
    constructor() {
        this.localNotifications = [];
        makeAutoObservable(this);
    }

    setNotifications(notifications) {
        this.localNotifications = notifications;
    }

    rateUser(userId, notificationId, rate=null, comment=null) {
        createOrNullNotification(this.localNotifications, notificationId);
        this.localNotifications = this.localNotifications.map((notification) => {
            if (notification.id === notificationId) {
                notification.user_id = userId;
                if (rate) {
                    notification.rate = rate;
                }
                if (comment) {
                    notification.comment = comment;
                }
            }
            return notification;
        });
    }
}

const notificationStore = new NotificationStore();
export default notificationStore;
