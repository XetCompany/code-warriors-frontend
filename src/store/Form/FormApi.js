import ApiClass from '../../base/Api/ApiClass';
import {BACKEND_URLS} from '../../base/Api/constants';
import Url from '../../base/Api/Url';
import UserStore from '../User/UserStore';

class FormApi extends ApiClass {
    constructor() {
        super();
        this.form = null;
    }

    setForm(form) {
        this.form = form;
    }

    async register() {
        const route = BACKEND_URLS.REGISTRATION;
        const url = new Url({route}).defaultUrl;
        return await this.sendPost(url, this.form.getFieldsValue(), {});
    }

    async login() {
        const route = BACKEND_URLS.LOGIN;
        const url = new Url({route}).defaultUrl;
        return await this.sendPost(url, this.form.getFieldsValue(), {})
            .then((res) => {
                if (res.status === 200) {
                    UserStore.saveToken(res.data);
                    UserStore.setRole(res.data.role);
                    UserStore.updateUser();
                    return Promise.resolve(res.data);
                }
                return Promise.reject();
            });
    }

    async requests() {
        const route = BACKEND_URLS.REQUESTS;
        const url = new Url({route}).defaultUrl;
        return await this.sendGet(url, {}, {})
            .then((res) => {
                if (res.status === 200) {
                    return Promise.resolve(res.data)
                }
                return Promise.reject();
            });
    }
}

const formApi = new FormApi();
export default formApi;
