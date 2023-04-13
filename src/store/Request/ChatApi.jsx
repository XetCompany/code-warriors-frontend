import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";
import UserStore from "../User/UserStore";

class ChatApi extends ApiClass {
    async getChatMessages(user_id) {
        const route = BACKEND_URLS.CHAT_MESSAGES + user_id + '/';
        const url = new Url({route}).defaultUrl;
        return await this.sendGet(url, {
            headers: {
                Authorization: `Bearer ${UserStore.accessToken}`
            }
        })
    }

    async sendChatMessage(user_id, message) {
        const route = BACKEND_URLS.CHAT_MESSAGES + user_id + '/create/';
        const url = new Url({route}).defaultUrl;
        return await this.sendPost(url, {
            message: message
        }, {
            headers: {
                Authorization: `Bearer ${UserStore.accessToken}`
            }
        })
    }
}

const chatApi = new ChatApi();
export default chatApi;
