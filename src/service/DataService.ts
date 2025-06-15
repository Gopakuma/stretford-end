import { sequelize } from "../../Database/DB.js";
import Squad from "../../Database/models/Squad.js";
import Matchday from "../../Database/models/Matchday.js";
import { getmatchdays, getSquadData } from "../../utils/utils.js";

class DataService {

    async syncSquadData() {
        const transaction = await sequelize.transaction();
        try {
            const data = await getSquadData();
            const { squad } = data;
            await Squad.bulkCreate(squad, { transaction });
            await transaction.commit();
        } catch (error) {
            console.log(error);
            await transaction.rollback();
        }
    }

    async syncMatchdayData() {
        const transaction = await sequelize.transaction();
        try {
            const matchDayData = await getmatchdays();
            console.log(matchDayData);

            for (const item of matchDayData) {
                const formattedMatchDay = this.formatDate(item.matchDay);
                await Matchday.create(
                    {
                        matchDay: new Date(formattedMatchDay),
                        matchTime: item.matchTime,
                        home: item.teams[0],
                        away: item.teams[1]
                    }
                );
            }
            await transaction.commit();
        } catch (error) {
            console.log(error);
            await transaction.rollback();
        }
    }

    formatDate(item: any) {
        const [day, month, year] = item.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
}

export default DataService;