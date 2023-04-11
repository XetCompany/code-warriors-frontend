import axios from 'axios';

class ApiClass {

    get #defaultRequestHeaders() {
        return {
            // Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        };
    }

    async sendRequest({method, params = {}, data, url, isAuth = false}) {
        if (!params.headers) {
            params.headers = {};
        }
        for (const [key, value] of Object.entries(this.#defaultRequestHeaders)) {
            if (!params.headers) {
                params.headers = {};
            }
            if (!params.hasOwnProperty(key)) {
                params.headers[key] = value;
            }
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

    async sendGet(url, params, isAuth) {
        return await this.sendRequest({
            method: axios.get,
            url,
            params,
            isAuth,
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

    async sendPut(url, data, params) {
        if (!data) {
            data = null;
        }
        return await this.sendRequest({
            method: axios.put,
            url,
            data,
            params,
        });
    }
}

export default ApiClass;

