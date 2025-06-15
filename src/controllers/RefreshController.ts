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
            const data = await this.syncService.refreshata();
            res.status(HttpStatusCode.Accepted).json({ data })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }
    }
}

export default RefreshController;