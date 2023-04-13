import {makeAutoObservable} from "mobx";
import RequestApi from "./RequestApi";

class RequestStore {
    constructor() {
        this.isShowData = false;
        this.isShowCategories = false;
        this.error = null;
        this.data = null;
        this.categories = null;
        this.isShowMyRequests = false;
        this.myRequests = null;
        this.chosenCategories = [];
        this.usernameChat = null;
        this.userIdChat = null;
        makeAutoObservable(this);
    }

    setUsernameChat(usernameChat) {
        this.usernameChat = usernameChat;
    }

    setUserIdChat(userIdChat) {
        this.userIdChat = userIdChat;
    }

    setIsShowMyRequests(isShowMyRequests) {
        this.isShowMyRequests = isShowMyRequests;
    }

    updateRequests() {
        RequestApi.getRequests().then(
            (response) => {
                this.setData(response.data);
                this.setMyRequests(response.data);
                this.setIsShowData(true);
            }
        );
    }

    setMyRequests(myRequests) {
        this.myRequests = myRequests;
    }

    setCategories(categories) {
        this.categories = categories;
    }

    setIsShowCategories(isShowCategories) {
        this.isShowCategories = isShowCategories;
    }

    setIsShowData(isShowData) {
        this.isShowData = isShowData;
    }

    setError(error) {
        this.error = error;
    }

    setData(data) {
        this.data = data;
    }

    updateData(data) {
        this.data = data;
    }

    addChosenCategory(category) {
        this.chosenCategories.push(category);
    }

    removeChosenCategory(category) {
        this.chosenCategories = this.chosenCategories.filter((chosen_category) => chosen_category.id !== category.id);
    }



}

const requestStore = new RequestStore();
export default requestStore;
