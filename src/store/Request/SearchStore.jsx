import {makeAutoObservable} from "mobx";

class SearchStore {
    constructor(props) {
        this.isDataSearchShow = false;
        this.dataSearch = null;
        this.isSearch = false;
        makeAutoObservable(this);
    }

    setIsDataSearchShow(isDataSearchShow) {
        this.isDataSearchShow = isDataSearchShow;
    }

    setIsSearch(isSearch) {
        this.isSearch = isSearch;
    }

    setDataSearch(dataSearch) {
        this.dataSearch = dataSearch;
    }

}

const searchStore = new SearchStore();
export default searchStore;
