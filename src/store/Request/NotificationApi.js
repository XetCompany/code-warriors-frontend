import ApiClass from "../../base/Api/ApiClass";
import UserStore from "../User/UserStore";
import {BACKEND_URLS} from "../../base/Api/constants";
import Url from "../../base/Api/Url";

class NotificationApi extends ApiClass {
    async sendReview(to_user_id, rate, comment, notification_id=null) {
        const route = BACKEND_URLS.REVIEW_CREATE;
        const url = new Url({route}).defaultUrl;
        await UserStore.updateAccessToken();
        const token = UserStore.accessToken;
        const data = {
            host: to_user_id,
            rating: rate,
            review_text: comment,
            notification_id: notification_id
        };
        return await this.sendPost(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, false);
    }
}

const notificationApi = new NotificationApi();
export default notificationApi;
