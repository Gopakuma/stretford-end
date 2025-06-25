import Matchday from "../Database/models/Matchday.js"
import { TMatchdayDTO } from "../Types/CommonTypes.js";

class MatchdayService {
    async getMatchday(): Promise<Matchday[]> {
        const matchday: Matchday[] = await Matchday.findAll();
        // const response: TMatchdayDTO[] = matchday.map((item) => ({
        //     matchDay: new Date(item.matchDay).toLocaleDateString('en-GB', {
        //         day: '2-digit', month: 'long', year: 'numeric'
        //     }),
        //     matchTime: item.matchTime,
        //     home: item.home,
        //     away: item.away,
        //     status: item.status
        // }))
        return matchday;
    }
}

export default MatchdayService;