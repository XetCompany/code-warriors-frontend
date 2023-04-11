import {makeAutoObservable} from "mobx";

class RequestStore {
    constructor() {
        this.isRequesting = false;
        this.error = null;
        this.data = null;
        makeAutoObservable(this);
    }

    setRequesting(isRequesting) {
        this.isRequesting = isRequesting;
    }

    setError(error) {
        this.error = error;
    }

    setData(data) {
        this.data = data;
    }

}

const requestStore = new RequestStore();
export default requestStore;
