
import ApiClass from '../../base/Api/ApiClass';
import FormStore from '../Form/FormStore';
import ModalStore from '../Modal/ModalStore';
import { NOTIFICATION_PLACEMENT, USER_IDENTIFICATOR_NAME } from '../../common/constants';
import AppStore from '../App/AppStore';
import UserSerializers from './UserSerializers';
import UserStore from './UserStore';
import { BACKEND_URLS } from '../../base/Api/constants';
import AdminStore from '../Admin/AdminStore';
import Url from '../../base/Api/Url';

class UserApi extends ApiClass {
  constructor() {
    super();
  }

  async getServerInfo() {
    const queries = {};
    let saveRoute;
    let urlForServerValues;
    if (AdminStore.isAdminUser) {
      saveRoute = BACKEND_URLS.SAVE_ADMIN;
      queries[USER_IDENTIFICATOR_NAME] = AdminStore.selectedUserToken;
      urlForServerValues = new Url({ route: saveRoute, queries }).formattedUrlWithQuery;
    } else {
      saveRoute = BACKEND_URLS.SAVE_USER;
      urlForServerValues = new Url({ route: saveRoute }).defaultUrl;
    }

    return await this.sendGet(urlForServerValues, {}, true)
      .then((response) => {
        const data = response.data;
        this.setUserStoreInfo(data, true);
        return data;
      })
      .catch(() => null);
  }

  async getFormattedUserInfo() {
    AppStore.setIsRequesting(true);
    const serverValues = await this.getServerInfo();
    AppStore.setIsRequesting(false);
    if (serverValues) {
      const neededServerValues = UserSerializers.serverInfoOnlyWithFieldNames(serverValues);
      return UserSerializers.getFormattedInfoFromServerInfo(neededServerValues, neededDraftValues);
    } else {
      ModalStore.openNotification(
        NOTIFICATION_PLACEMENT.BOTTOM_RIGHT,
        'Ошибка получения данных',
        'Произошла ошибка получения данных, попробуйте позже или обратитесь к администратору',
        'error',
      );
      throw new Error('Ошибка');
    }
  }
}

export default new UserApi();

