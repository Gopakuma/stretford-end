import Squad from "../Database/models/Squad.js";
import { TSquadResponseDTO } from "../Types/CommonTypes.js";

class SquadService {
    async getSquadData(): Promise<TSquadResponseDTO> {
        const squadData = await Squad.findAll();
        const formattedData = squadData.map(player => ({
            name: player.name,
            nationality: player.nationality,
            position: player.position
        }));

        const response: TSquadResponseDTO = {
            data: formattedData.sort()
        }
        return response;
    }
}

export default SquadService;
