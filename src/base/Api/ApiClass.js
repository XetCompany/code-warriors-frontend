import axios from 'axios';
import { USER_IDENTIFICATOR_NAME } from './constants';

class ApiClass { 
  constructor() {}

  get #defaultRequestHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('user_token')}`,
    };
  }

  get #paramsWithUserIdentificationId() {
    let userId;
    userId = localStorage.getItem('user_id');
    return {
      [USER_IDENTIFICATOR_NAME]: userId,
    };
  }

  async sendRequest({ method, params = {}, data, url, withUserIdInParams }) {
    Object.entries(this.#defaultRequestHeaders).forEach(([key, value]) => {
      if (!params.headers) {
        params.headers = {};
      }
      if (!params.hasOwnProperty(key)) {
        params.headers[key] = value;
      }
    });
    if (withUserIdInParams) {
      params = { ...params, ...this.#paramsWithUserIdentificationId };
    }
    let response;
    try {
      if (data === undefined) {
        response = await method(url, params);
      } else {
        response = await method(url, data, params);
      }
    } catch (error) {
      console.error('Error in response:', error);
      response = null;
    }

    return response;
  }

  async sendGet(url, params, withUserIdInParams) {
    return await this.sendRequest({
      method: axios.get,
      url,
      params,
      withUserIdInParams,
    });
  }

  async sendPost(url, data, params) {
    if (!data) {
      data = null;
    }
    return await this.sendRequest({
      method: axios.post,
      url,
      data,
      params,
    });
  }
}

export default ApiClass;

