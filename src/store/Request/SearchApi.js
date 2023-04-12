import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";

class SearchApi extends ApiClass {
    async search(categories) {
        const route = BACKEND_URLS.SEARCH_PERFORMERS;
        const url = new Url({route}).defaultUrl;
        return await this.sendPost(url, {categories: categories});
    }
}

const searchApi = new SearchApi();
export default searchApi;
