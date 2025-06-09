import config from 'config';
import { TconfigApi } from "../../Types/CommonTypes.js";
import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const api: TconfigApi = config.get('api');
const { baseURL } = api;

class Routes {
    public router: Router;
    public userController: UserController;

    constructor(router: Router) {
        this.router = router,
            this.userController = new UserController();
        this.init();
    }

    init() {
        //USER ROUTES
        this.router.post(`${baseURL}/users/signup`, (req, res) => this.userController.signup(req, res))
        this.router.delete(`${baseURL}/users`, (req, res) => this.userController.deleteUser(req, res))
    }
}

export default Routes;