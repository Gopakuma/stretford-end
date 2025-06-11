import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DB.js";
import { hashPassword } from '../../utils/utils.js';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "Users",
        timestamps: true,
        hooks: {
            beforeCreate: async (user: any) => {
                user.password = await hashPassword(user);
            },
        },
    }
);


User.sync({ force: false })
    .then(() => {
        console.log("User model synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing User model:", error);
    });

export default User;
