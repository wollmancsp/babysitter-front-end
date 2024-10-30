import { Message } from './message';

describe('Message', () => {
  let message_id: string;
  let user_id: string;
  let message_texts: string;
  let message_time: string;
  let chat_id: string;

  it('should create an instance', () => {
    expect(new Message(message_id, user_id, message_texts, message_time, chat_id)).toBeTruthy();
  });
});
