import config from 'config';
import { TconfigApi } from "../../Types/CommonTypes.js";
import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { authenticateJWT } from "../../middlewares/AuthJWT.js";

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
        this.router.post(`${baseURL}/users/login`, (req, res) => this.userController.login(req, res))
        this.router.delete(`${baseURL}/users`, (req, res) => this.userController.deleteUser(req, res))

        //DashBoard
        this.router.delete(`${baseURL}/dashboard`, authenticateJWT, (req, res) => this.userController.deleteUser(req, res))
        this.router.post(`${baseURL}/notification`, authenticateJWT, (req, res) => this.userController.notification(req, res))
        this.router.get(`${baseURL}/data`, (req, res) => this.userController.data(req, res))
    }
}

export default Routes;