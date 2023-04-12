import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";

class UserCardApi extends ApiClass {
    async getUser(userId) {
        const route = BACKEND_URLS.USER_DETAILS + userId + '/';
        const url = new Url({route}).defaultUrl;
        return await this.sendGet(url);
    }

    async getCommentsUser(userId) {
        const route = BACKEND_URLS.USER_COMMENTS + userId + '/';
        const url = new Url({route}).defaultUrl;
        return await this.sendGet(url);
    }
}

const userCardApi = new UserCardApi();
export default userCardApi;
