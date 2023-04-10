import UserStore from "../User/UserStore";
import { USER_IDENTIFICATOR_NAME } from "../../base/Api/constants";

class FormSerializers {
  constructor(props) {}

  createFormData(fields, withUserToken = true) {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (withUserToken) {
      const token = UserStore.myToken;
      formData.append(USER_IDENTIFICATOR_NAME, token);
    }
    return formData;
  }
}

export default new FormSerializers();