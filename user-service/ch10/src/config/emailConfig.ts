import { registerAs } from "@nestjs/config";

export default registerAs('email', () => ({
  // service: process.env.EMAIL_SERVICE,
  service: 'Gmail',
  auth: {
    // user: process.env.EMAIL_AUTH_USER,
    user: 'jackyu0721@gmail.com',
    // pass: process.env.EMAIL_AUTH_PASSWORD,
    pass: 'wjziozbdlvryeumu',
  },
  // baseUrl: process.env.EMAIL_BASE_URL,
  baseUrl: 'http://localhost:3000',
}));