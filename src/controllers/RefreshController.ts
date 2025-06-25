import { Request, Response } from "express";
import Sync from "../service/Sync.js";
import { HttpStatusCode } from "axios";

class RefreshController {
    public syncService: Sync;

    constructor() {
        this.syncService = new Sync();
    }

    async refreshata(req: Request, res: Response) {
        try {
            await this.syncService.refreshata();
            res.status(HttpStatusCode.Ok).json({ data: "sucess" })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error })
        }
    }
}

export default RefreshController;