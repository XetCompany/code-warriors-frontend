import {makeAutoObservable} from "mobx";

class RequestPageStore {
    constructor() {
        this.isShowData = false;
        this.data = null;
        this.isSuccessfullAddResponse = false;
        this.isLoadRequest = false;
        makeAutoObservable(this);
    }

    setIsShowData(isShowData) {
        this.isShowData = isShowData;
    }

    setIsLoadRequest(isLoadRequest) {
        this.isLoadRequest = isLoadRequest;
    }

    setSuccessfullAddResponse(isSuccessfullAddResponse) {
        this.isSuccessfullAddResponse = isSuccessfullAddResponse;
    }

    setData(data) {
        this.data = data;
    }
}

const requestPageStore = new RequestPageStore();
export default requestPageStore;
