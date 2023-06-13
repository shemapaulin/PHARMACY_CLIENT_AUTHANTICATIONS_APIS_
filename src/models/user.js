import { DataTypes } from 'sequelize';
import database from '.'; 

const User = database.define('Users', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
   
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: false,
},

);

export default User;