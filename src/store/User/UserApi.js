import ApiClass from '../../base/Api/ApiClass';
import { USER_IDENTIFICATOR_NAME } from '../../common/constants';
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
}
export default new UserApi();

