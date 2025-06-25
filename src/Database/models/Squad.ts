import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DB.js";

interface SquadAttributes {
    id: number;
    dateOfBirth: Date;
    name: string;
    nationality: string;
    position: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Squad extends Model<SquadAttributes> implements SquadAttributes {
    public id!: number;
    public dateOfBirth!: Date;
    public name!: string;
    public nationality!: string;
    public position!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Squad.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: "Squads",
        timestamps: true,
    }

)
Squad.sync({ force: false })
    .then(() => {
        console.log("Squad model synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing Squad model:", error);
    });

export default Squad;