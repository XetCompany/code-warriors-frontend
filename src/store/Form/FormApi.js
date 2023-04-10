import ApiClass from '../../base/Api/ApiClass';
import { BACKEND_URLS } from '../../base/Api/constants';
import Url from '../../base/Api/Url';
import saveToken from '../User/UserStore';
import axios from 'axios';

class FormApi extends ApiClass {
  constructor() {
    super();
    this.form = null;
  }

  setForm(form) {
    this.form = form;
  }

  async register() {
    let route;
    let data = new FormData();
    for (let key in this.form.getFieldsValue()) {
      data.append(key, this.form.getFieldsValue()[key]);
    }
    let url;
    route = BACKEND_URLS.REGISTRATION;
    url = new Url({ route }).defaultUrl;
    const response = await this.sendPost(url, data, {});
    return response;
  }

  async login() {
    let route;
    let url;
    let data = new FormData();
    for (let key in this.form.getFieldsValue()) {
      data.append(key, this.form.getFieldsValue()[key]);
    }
    route = BACKEND_URLS.LOGIN;
    url = new Url({ route }).defaultUrl;
    const response = await this.sendPost(url, data, {})
    .then((res) => {
      if (res.status === 200) {
          saveToken(JSON.stringify(res.data));
          return Promise.resolve()
      }
      return Promise.reject();
    });
    return response;
  }
}

export default new FormApi();