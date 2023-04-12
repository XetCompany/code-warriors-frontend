import {Component} from "react";
import UserStore from "../store/User/UserStore";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.chat_id = props.user_id;
        this.user_id = UserStore.user.id;
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Chat;
