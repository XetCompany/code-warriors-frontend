import {makeAutoObservable} from "mobx";

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
