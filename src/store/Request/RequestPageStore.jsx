import {makeAutoObservable} from "mobx";

class RequestPageStore {
    constructor() {
        this.isShowData = false;
        this.data = null;
        makeAutoObservable(this);
    }

    setIsShowData(isShowData) {
        this.isShowData = isShowData;
    }

    setData(data) {
        this.data = data;
    }
}

const requestPageStore = new RequestPageStore();
export default requestPageStore;
