import { Chat } from './chat';
import { Message } from "../message-class/message";

describe('Chat', () => {
  let chat_id: string;
  let users_id_array: string[];
  let messages_array: Message[];

  it('should create an instance', () => {
    expect(new Chat(chat_id, users_id_array, messages_array)).toBeTruthy();
  });
});
