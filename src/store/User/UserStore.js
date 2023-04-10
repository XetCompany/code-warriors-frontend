import { makeAutoObservable } from 'mobx';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  saveToken(token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }
}

export default new UserStore();
