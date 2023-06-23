import { Sequelize } from 'sequelize';
import prop from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = prop[env];

let database;
let db;
if (config.url) {
  db = new Sequelize(config.url, {
    dialect: 'mysql',
  });
} else {
  db= new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

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

export {db, database};