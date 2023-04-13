import {makeAutoObservable} from "mobx";

class ChatsStore {
    constructor(props) {
        this.chats = [];
        this.isChatsLoaded = false;
        makeAutoObservable(this);
    }

    setChats(chats) {
        this.chats = chats;
    }

    setIsChatsLoaded(isChatsLoaded) {
        this.isChatsLoaded = isChatsLoaded;
    }

}

const chatsStore = new ChatsStore();
export default chatsStore;
