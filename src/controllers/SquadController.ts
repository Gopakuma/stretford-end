import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import SquadService from "../service/SquadService.js";

class SquadController {
    public squadService: SquadService;

    constructor() {
        this.squadService = new SquadService();
    }

    async getSquadData(req: Request, res: Response) {
        try {
            const data = await this.squadService.getSquadData();
            res.status(HttpStatusCode.Ok).json(data)
        } catch (error) {
            res.status(HttpStatusCode.InternalServerError).json({ error })
            throw error;
        }
    }
}

export default SquadController;