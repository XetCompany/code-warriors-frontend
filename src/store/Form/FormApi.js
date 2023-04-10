import ApiClass from '../../base/Api/ApiClass';
import { BACKEND_URLS } from '../../base/Api/constants';
import Url from '../../base/Api/Url';

class FormApi extends ApiClass {
  constructor() {
    super();
    this.form = null;
  }

  setForm(form) {
    this.form = form;
  }

  async register() {
    let date = this.form.getFieldsValue();
    let route;
    let data = new FormData();
    for (let key in this.form.getFieldsValue()) {
      data.append(key, this.form.getFieldsValue()[key]);
    }
    let url;
    route = BACKEND_URLS.REGISTRATION;
    url = new Url({ route }).defaultUrl;
    const response = await this.sendPost(url, date, {});
    return response;
  }

  async login() {
    let route;
    let data = new FormData();
    for (let key in this.form.getFieldsValue()) {
      data.append(key, this.form.getFieldsValue()[key]);
    }
    let url;
    route = BACKEND_URLS.LOGIN;
    url = new Url({ route }).defaultUrl;
    const response = await this.sendPost(url, data, {});
    return response;
  }
}

export default new FormApi();