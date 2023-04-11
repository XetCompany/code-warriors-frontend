import ApiClass from '../../base/Api/ApiClass';
import {BACKEND_URLS} from '../../base/Api/constants';
import Url from '../../base/Api/Url';
import UserStore from "./UserStore";
import FormApi from "../Form/FormApi";

class UserApi extends ApiClass {
    async getUserInfo() {
        const route = BACKEND_URLS.USER_INFO;
        const url = new Url({route}).defaultUrl;
        const token = UserStore.accessToken;
        return await this.sendGet(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, false);
    }

    async getAccessToken() {
        const route = BACKEND_URLS.REFRESH_TOKEN;
        const url = new Url({route}).defaultUrl;
        const token = UserStore.refreshToken;
        return await this.sendPost(url, {'refresh': token}, {}, false);
    }


    async updateUserInfo() {
        const route = BACKEND_URLS.USER_INFO;
        const url = new Url({route}).defaultUrl;
        const token = UserStore.accessToken;
        const data = FormApi.form.getFieldsValue();
        return await this.sendPut(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, false);
    }
}

const userApi = new UserApi();
export default userApi;

