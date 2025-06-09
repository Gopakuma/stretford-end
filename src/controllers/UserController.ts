import { Request, Response } from "express";
import UserService from "../service/UserService.js";
import { TuserDto } from "../../Types/CommonTypes.js";
import { HttpStatusCode } from "axios";


class UserController {
    public userService: UserService;

    constructor() {
        this.userService = new UserService();;
        this.init();
    }
    init() {

    }
    async signup(req: Request, res: Response) {
        try {
            const userDto: TuserDto = req.body;
            await this.userService.signup(userDto);
            res.status(HttpStatusCode.Accepted).json({ "data": userDto })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userDto: TuserDto = req.body;
            await this.userService.deleteUser(userDto);
            res.status(HttpStatusCode.Accepted).json({ "data": userDto })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }

    }
}

export default UserController;