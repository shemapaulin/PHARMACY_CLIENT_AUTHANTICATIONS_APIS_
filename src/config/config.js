import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    url : process.env.DEV_URL,
    dialect: 'mysql',
    port : process.env.PORT,
  },
  test: {
    url : process.env.TEST_URL,
    dialect: 'mysql',
    port : process.env.PORT,
  },
  production: {
    url : process.env.PROD_URL,
    dialect: 'mysql',
    port : process.env.PORT,
  },
};

export default config;