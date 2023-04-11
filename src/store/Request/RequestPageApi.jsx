import ApiClass from "../../base/Api/ApiClass";
import Url from "../../base/Api/Url";
import UserStore from "../User/UserStore";

class RequestPageApi extends ApiClass {
    async getRequest(id) {
        const route = 'info/request/detail/' + id + '/';
        const url = new Url({route}).defaultUrl;

        return await this.sendGet(url)
    }

    async addResponseToRequest({id, data}) {
        const route = 'info/request/' + id + '/add_response/';
        const url = new Url({route}).defaultUrl;

        await UserStore.updateAccessToken();
        return await this.sendPost(url, data, {
            headers: {
                Authorization: `Bearer ${UserStore.accessToken}`
            }
        })
    }
}

const requestPageApi = new RequestPageApi();
export default requestPageApi;
