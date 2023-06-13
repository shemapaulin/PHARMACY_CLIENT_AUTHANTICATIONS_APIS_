import { Sequelize } from 'sequelize';
import prop from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = prop[env];

let database;

if (config.url) {
  database = new Sequelize(config.url, {
    dialect: 'mysql',
  });
} else {
  database = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export default database;