import {makeAutoObservable} from "mobx";

class UserCardStore {
    constructor(props) {
        this.isUserLoaded = false;
        this.user = null;
        this.isUserCommentLoaded = false;
        this.comments = null;
        makeAutoObservable(this);
    }

    setIsUserLoaded(isUserLoaded) {
        this.isUserLoaded = isUserLoaded;
    }

    setUser(user) {
        this.user = user;
    }

    setIsUserCommentLoaded(isUserCommentLoaded) {
        this.isUserCommentLoaded = isUserCommentLoaded;
    }

    setComments(comments) {
        this.comments = comments;
    }
}

const userCardStore = new UserCardStore();
export default userCardStore;
