import { DataTypes } from 'sequelize';
import {db,database} from '.'; 

const User = database.define('users', {
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

const Appointment = db.define('appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    
  },
  pharmacist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
   
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'declined'),
      allowNull: false,
      defaultValue: 'pending',
    },
  
},{
  tableName:'appointment',
  timestamps:false,
});


//Appointment.belongsTo(users, { foreignKey: 'user_id' });
//Appointment.belongsTo(pharmacist, { foreignKey: 'pharmacist_id' });






export  {User,Appointment};
