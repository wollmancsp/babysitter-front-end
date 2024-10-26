export class Message {
    message_id: string;
    user_id: string;
    message_text: string;
    message_time: string;
    chat_id: string;

    constructor(message_id: string, user_id: string, message_text: string, message_time: string, chat_id: string) {
        this.message_id = message_id;
        this.user_id = user_id;
        this.message_text = message_text;
        this.message_time = message_time;
        this.chat_id = chat_id;
    }
}