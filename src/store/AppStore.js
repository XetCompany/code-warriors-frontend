import { makeAutoObservable } from 'mobx';

class AppStore {
  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }

  resetState() {
    this.isRequesting = false;
  }

  setIsRequesting(isRequesting) {
    this.isRequesting = isRequesting;
  }


}

const appStore = new AppStore();
export default appStore;
