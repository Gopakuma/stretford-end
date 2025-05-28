import { sequelize } from "../DB";

sequelize.define('User', {
  id: {
    type: 'INTEGER',
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: 'STRING',
    allowNull: false,
    unique: true,
  },
  email: {
    type: 'STRING',
    allowNull: false,
    unique: true,
  },
  password: {
    type: 'STRING',
    allowNull: false,
  },
  createdAt: {
    type: 'DATE',
    allowNull: false,
    defaultValue: sequelize.fn('GETDATE'),
  },
  updatedAt: {
    type: 'DATE',
    allowNull: false,
    defaultValue: sequelize.fn('GETDATE'),
  },
}, {
  tableName: 'Users', // Specify the table name
  timestamps: true, // Enable createdAt and updatedAt fields
  createdAt: 'createdAt', // Custom name for createdAt field
  updatedAt: 'updatedAt', // Custom name for updatedAt field
  hooks: {
    beforeCreate: (user) => {
      // Hash password before creating user
      // user.password = hashPassword(user.password);
    }
  },
  indexes: [
    {
      unique: true,
      fields: ['username', 'email'] // Unique index on username and email
    }
  ]
}).sync({ force: false }) // Sync the model with the database, set force to true to drop and recreate the table
  .then(() => {
    console.log('User model synced successfully');
  }
).catch((error) => {
    console.error('Error syncing User model:', error);
  }
);
export const User = sequelize.models.User; 