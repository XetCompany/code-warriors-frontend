import ApiClass from "../../base/Api/ApiClass";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";
import UserStore from "../User/UserStore";

class ChatsApi extends ApiClass {
    async getChats() {
        const route = BACKEND_URLS.CHATS;
        const url = new Url({route}).defaultUrl;
        await UserStore.updateAccessToken();
        return await this.sendGet(url, {
            headers: {
                Authorization: `Bearer ${UserStore.accessToken}`
            }
        });
    }
}

const chatsApi = new ChatsApi();
export default chatsApi;
