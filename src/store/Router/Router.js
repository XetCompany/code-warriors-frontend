import { RouterStore } from 'mobx-router';

class Router {
  constructor() {
    this.router = new RouterStore(this);
  }

  get currentRouteIs() {
    return (rootPath) => {
      if (!this.router?.currentRoute) {
        return false;
      }
      return this.router.currentRoute.rootPath === rootPath;
    };
  }

  goTo(path) {
    return this.router.goTo(path);
  }

  get currentRouteName() {
    return this.router.currentRoute?.path.slice(1);
  }
}

export default new Router();
