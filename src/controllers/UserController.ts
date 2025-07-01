import { Request, Response } from "express";
import UserService from "../service/UserService.js";
import { HttpStatusCode } from "axios";
import User from "../Database/models/User.js";

class UserController {
    public userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async signup(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            const response = await this.userService.signup(userDto);
            res.status(HttpStatusCode.Ok).json(response)
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            const data = await this.userService.login(userDto);
            res.status(HttpStatusCode.Ok).json(data)
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userDto: User = req.body;
            await this.userService.deleteUser(userDto);
            res.status(HttpStatusCode.Ok).json({ userDto })
        } catch (error) {
            console.log(`$$ --${error} -- $$`);
            res.status(HttpStatusCode.InternalServerError).json({ "error": error })
        }

    }

    // async notification(req: Request, res: Response) {
    //     try {
    //         const userDto: User = req.body;
    //         await this.userService.notification(userDto);
    //         res.status(HttpStatusCode.Ok).json({ userDto })
    //     } catch (error) {
    //         console.log(`$$ --${error} -- $$`);
    //         res.status(HttpStatusCode.InternalServerError).json({ "error": error })
    //     }
    // }

}

export default UserController;