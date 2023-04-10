import { makeAutoObservable } from 'mobx';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  get myToken() {
    return localStorage.getItem('user_uid');
  }
}

export default new UserStore();
