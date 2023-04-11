import {makeAutoObservable} from "mobx";

class RequestStore {
    constructor() {
        this.isShowData = false;
        this.error = null;
        this.data = null;
        this.categories = null;
        makeAutoObservable(this);
    }

    setCategories(categories) {
        this.categories = categories;
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
