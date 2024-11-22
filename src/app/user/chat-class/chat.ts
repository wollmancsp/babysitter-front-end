import { Message } from "../message-class/message";

export class Chat {
    chat_id: number;
    users_id_array: String[];
    messages_array: Message[];

    constructor(chat_id: number, users_id_array: String[], messages_array: Message[]) {
        this.chat_id = chat_id;
        this.users_id_array = users_id_array;
        this.messages_array = messages_array;
    }
}
