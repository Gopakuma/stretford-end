import { sequelize } from "../DB.js";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

enum MatchStatus {
    NOT_STARTED = "NOT_STARTED",
    FINISHED = "FINISHED",
    NO_RESULT = "NO_RESULT"
}

class Matchday extends Model<
    InferAttributes<Matchday>,
    InferCreationAttributes<Matchday, { omit: 'id' | 'createdAt' | 'updatedAt' }>
> {
    declare id: CreationOptional<number>;
    declare matchDay: Date | null;
    declare matchTime: string | null;
    declare home: string | null;
    declare away: string | null;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Matchday.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        matchDay: {
            type: DataTypes.DATE,
            allowNull: true
        },
        matchTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        home: {
            type: DataTypes.STRING,
            allowNull: true
        },
        away: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM(...Object.values(MatchStatus)),
            allowNull: true,
            defaultValue: MatchStatus.NOT_STARTED
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
        tableName: "Matchdays",
        timestamps: true,
        indexes: [{ fields: ["matchDay"] }]
    }
);

Matchday.sync({ force: false })
    .then(() => {
        console.log("Matchday model synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing Matchday model:", error);
    });

export default Matchday;