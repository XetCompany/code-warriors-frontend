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
        makeAutoObservable(this);
    }

    setIsShowMyRequests(isShowMyRequests) {
        this.isShowMyRequests = isShowMyRequests;
    }

    updateRequests() {
        RequestApi.getRequests().then(
            (response) => {
                this.setData(response.data);
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

}

const requestStore = new RequestStore();
export default requestStore;
