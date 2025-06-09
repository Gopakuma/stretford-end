import { sequelize } from "../DB.js";
import { hashPassword } from '../../utils/utils.js';
import { DataTypes } from "sequelize";

sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.CHAR(50),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.fn('GETDATE'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.fn('GETDATE'),
  },
}, {
  tableName: 'Users', // Specify the table name
  timestamps: true, // Enable createdAt and updatedAt fields
  createdAt: 'createdAt', // Custom name for createdAt field
  updatedAt: 'updatedAt', // Custom name for updatedAt field
  hooks: {
    beforeCreate: (user: any) => {
      // Hash password before creating user
      user.password = hashPassword(user);
    }
  },
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ['username', 'email'] // Unique index on username and email
  //   }
  // ]
}).sync({ force: false }) // Sync the model with the database, set force to true to drop and recreate the table
  .then(() => {
    console.log('User model synced successfully');
  }
  ).catch((error) => {
    console.error('Error syncing User model:', error);
  }
  );
export const User = sequelize.models.User; 