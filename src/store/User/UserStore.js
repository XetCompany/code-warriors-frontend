import {makeAutoObservable} from 'mobx';
import UserApi from "./UserApi";

class UserStore {
    constructor() {
        this.userId = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.role = null;
        this.isAuth = false;
        this.user = null;
        this.userIsLoaded = false;
        this.resetPassword = null;
        this.isShowNotification = false;
        this.notifications = [];

        this.init();
        makeAutoObservable(this);
    }

    setUserIsLoaded(isLoaded) {
        this.userIsLoaded = isLoaded;
    }

    setNotificationVisibility(isShow) {
        this.isShowNotification = isShow;
    }

    setNotifications(notifications) {
        this.notifications = notifications;
    }

    init() {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;


        setTimeout(() => {
            this.updateUser();
        });
    }

    setUser(user) {
        this.user = user;
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth;
    }

    setUserById(id) {
        this.userId = id;
    }

    updateUser() {
        this.updateAccessToken().then(
            () => {
                UserApi.getUserInfo().then((response) => {
                    this.setUser(response.data.data.user);
                    this.setUserById(response.data.data.user.id);
                    this.setRole(response.data.data.user.groups);
                    this.setIsAuth(true);
                    this.setUserIsLoaded(true);
                });
            }
        )
    }

    async updateAccessToken() {
        const data = await UserApi.getAccessToken();
        this.accessToken = data.data.access;
    }

    setRole(role) {
        this.role = role;
    }

    readAllNotifications() {
        UserApi.readAllNotifications().then((response) => {
            if (response.status === 201) {
                UserApi.getNotifications().then((response) => {
                    this.setNotifications(response.data.data);
                });
            }
        });
    }

    saveToken(token) {
        const accessToken = token.access;
        const refreshToken = token.refresh;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }

    setResetPasswordToken(resetPassword) {
        this.resetPassword = resetPassword;
    }
}

const userStore = new UserStore();
export default userStore;
