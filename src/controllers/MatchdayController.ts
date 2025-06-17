import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import MatchdayService from "../service/MatchdayService.js";

class MatchdayController {
    public matchdayService: MatchdayService;

    constructor() {
        this.matchdayService = new MatchdayService();
    }

    async getMatchdays(req: Request, res: Response) {
        try {
            const data = await this.matchdayService.getMatchday();
            res.status(HttpStatusCode.Ok).json({ data });
        } catch (error) {
            console.log(error);
        }
    }
}

export default MatchdayController;