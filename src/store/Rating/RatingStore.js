import {makeAutoObservable} from "mobx";

class RatingStore {
    constructor() {
        this.isShowData = false;
        this.error = null;
        this.data = null;
        makeAutoObservable(this);
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

}

const ratingStore = new RatingStore();
export default ratingStore;
