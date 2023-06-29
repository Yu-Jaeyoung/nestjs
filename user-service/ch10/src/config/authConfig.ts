import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  jwtSecret: 'test',
}));