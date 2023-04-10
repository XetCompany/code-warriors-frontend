import ApiClass from '../../base/Api/ApiClass';
import { BACKEND_URLS } from '../../base/Api/constants';
import Url from '../../base/Api/Url';
import { Form } from 'antd';
import { USER_IDENTIFICATOR_NAME } from '../../base/Api/constants';

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
    route = `${BACKEND_URLS.LOGIN}token/`;
    url = new Url({ route }).defaultUrl;
    const response = await this.sendPost(url, data, {});
    return response;
  }

  createFormData(fields, withUserToken = true) {
    const formData = new FormData();
    for (let key in this.form.getFieldsValue()) {
      if (
        this.form.getFieldsValue()[key] !== null &&
        this.form.getFieldsValue()[key] !== undefined &&
        this.form.getFieldsValue()[key] !== ''
      ) {
        console.log(key, this.form.getFieldsValue()[key]);
        formData.append(key, formData.getFieldsValue()[key]);
      }
    }
    const token = this.isAdminUser ? this.selectedUserToken : localStorage.getItem('user_uid');
    if (withUserToken) {
      formData.append(USER_IDENTIFICATOR_NAME, token);
    }
    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }
    return formData;
  }

}

export default new FormApi();