import { sequelize } from "../DB.js";
import { DataTypes, Model } from "sequelize";

interface MatchdayAttributes {
    id: number;
    matchDay: Date;
    matchTime: string;
    home: string;
    away: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

enum MatchStatus {
    NOT_STARTED = "NOT_STARTED",
    FINISHED = "FINISHED",
    NO_RESULT = "NO_RESULT"
}


class Matchday extends Model<MatchdayAttributes> implements MatchdayAttributes {
    public id!: number;
    public matchDay!: Date;
    public matchTime!: string;
    public home!: string;
    public away!: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
)

Matchday.sync({ force: false })
    .then(() => {
        console.log("Matchday model synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing Matchday model:", error);
    });

export default Matchday;