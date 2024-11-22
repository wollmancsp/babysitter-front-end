import { LoginRequest } from './login-request';

describe('LoginRequest', () => {
  let email: string;
  let password: string;

  it('should create an instance', () => {
    expect(new LoginRequest(email, password)).toBeTruthy();
  });
});
