import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";
import UserStore from "../User/UserStore";

class RequestApi extends ApiClass {
    async getRequests() {
        const route = BACKEND_URLS.REQUESTS;
        const url = new Url({route}).defaultUrl;

        return await this.sendGet(url);
    }
    async getCategories() {
        const route = BACKEND_URLS.CATEGORIES;
        const url = new Url({route}).defaultUrl;

        return await this.sendGet(url, {
            headers: {
                'Authorization': 'Bearer ' + UserStore.accessToken
            }
        });
    }
}


const requestApi = new RequestApi();
export default requestApi;
