import { Request, Response } from "express";
import UserService from "../service/UserService.js";
import { HttpStatusCode } from "axios";
import User from "../../Database/models/User.js";
import { getData } from "../../utils/utils.js";

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
            const userDto: User = req.body;
            const response = await this.userService.signup(userDto);
            res.status(HttpStatusCode.Accepted).json({ response })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            const data = await this.userService.login(userDto);
            res.status(HttpStatusCode.Accepted).json({ data })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            await this.userService.deleteUser(userDto);
            res.status(HttpStatusCode.Accepted).json({ userDto })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }

    }

    async notification(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            await this.userService.notification(userDto);
            res.status(HttpStatusCode.Accepted).json({ userDto })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }
    }

    async data(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            const data = await getData();
            res.status(HttpStatusCode.Accepted).json({ data })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error.message })
        }
    }
}

export default UserController;