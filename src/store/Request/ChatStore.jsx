import {makeAutoObservable} from "mobx";

class ChatStore {
    constructor(props) {
        this.isLoadChat = false;
        this.chatId = null;
        this.chatMessages = [];
        this.messageSend = "";
        this.isNeedScroll = false;

        makeAutoObservable(this);
    }

    setIsLoadChat(isLoadChat) {
        this.isLoadChat = isLoadChat;
    }

    setIsNeedScroll(isNeedScroll) {
        this.isNeedScroll = isNeedScroll;
    }

    setChatId(chatId) {
        this.chatId = chatId;
    }

    setChatMessaged(chatMessages) {
        this.chatMessages = chatMessages;
    }

    setMessageSend(messageSend) {
        this.messageSend = messageSend;
    }

}

const chatStore = new ChatStore();
export default chatStore;
