import {makeAutoObservable} from "mobx";
import RequestStore from "./RequestStore";
import SearchApi from "./SearchApi";

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

    search() {
        let categories = [];
        RequestStore.chosenCategories.forEach((category) => {
            categories.push(category.id);
        });
        SearchApi.search(categories).then((response) => {
            this.setDataSearch(response.data.users);
            this.setIsDataSearchShow(true);
            this.setIsSearch(false);
        });
    }

}

const searchStore = new SearchStore();
export default searchStore;
