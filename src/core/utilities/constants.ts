import dotenv from 'dotenv';

dotenv.config();

export default class Constants {
  static port = process.env.PORT || '3000';

  static timezone = process.env.TIMEZONE;

  static language = process.env.LANGUAGE;
}
