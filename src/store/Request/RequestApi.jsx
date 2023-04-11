import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";

class RequestApi extends ApiClass {
    async getRequests() {
        const route = BACKEND_URLS.REQUESTS;
        const url = new Url({route}).defaultUrl;

        return await this.sendGet(url);
    }
}


const requestApi = new RequestApi();
export default requestApi;
