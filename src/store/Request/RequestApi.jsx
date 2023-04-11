import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";
import UserStore from "../User/UserStore";
import requestStore from "./RequestStore";
import FormApi from "../Form/FormApi";

class RequestApi extends ApiClass {
    async getRequests() {
        const route = BACKEND_URLS.REQUESTS;
        const url = new Url({route}).defaultUrl;

        return await this.sendGet(url)
    }
    async getMyRequests() {
        let url;
        let route;
        route = BACKEND_URLS.REQUESTS + UserStore.userId + '/';
        url = new Url({route}).defaultUrl;
        return await this.sendGet(url);
    }
    async updateRequest() {
        const route = BACKEND_URLS.REQUESTS_UPDATE + requestStore.myRequests[0].id + '/';
        const url = new Url({route}).defaultUrl;
        const token = UserStore.accessToken;
        const data = FormApi.form.getFieldsValue();
        return await this.sendPut(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, false);
    }
    async getCategories() {
        const route = BACKEND_URLS.CATEGORIES;
        const url = new Url({route}).defaultUrl;

        await UserStore.updateAccessToken();
        return await this.sendGet(url, {
            headers: {
                Authorization: `Bearer ${UserStore.accessToken}`,
            }
        });
    }
}


const requestApi = new RequestApi();
export default requestApi;
