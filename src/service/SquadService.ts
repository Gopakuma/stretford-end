import Squad from "../Database/models/Squad.js";
import { TSquadResponseDTO } from "../Types/CommonTypes.js";

class SquadService {
    async getSquadData(): Promise<TSquadResponseDTO> {
        const squadData = await Squad.findAll();
        console.log(squadData.values, `squadData`);

        const formattedData = squadData.map(item => ({
            name: item.dataValues.name,
            nationality: item.dataValues.nationality ? item.dataValues.nationality : ``,
            position: item.dataValues.position
        }));

        const response: TSquadResponseDTO = {
            data: formattedData
        }
        return response;
    }
}

export default SquadService;
