import DataService from "./DataService.js";

class Sync {
    private dataservice: DataService;

    constructor() {
        this.dataservice = new DataService();
    }

    async refreshata() {
        try {
            // await this.dataservice.syncSquadData();
            await this.dataservice.syncMatchdayData();
        } catch (error) {
            console.log(error);
        }
    }
}

export default Sync;