import ApiClass from "../../base/Api/ApiClass";
import Url from "../../base/Api/Url";

class RequestPageApi extends ApiClass {
    async getRequest(id) {
        const route = 'info/request/detail/' + id + '/';
        const url = new Url({route}).defaultUrl;

        return await this.sendGet(url)
    }
}

const requestPageApi = new RequestPageApi();
export default requestPageApi;
