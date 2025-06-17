import config from 'config';
import { TconfigApi } from "../../Types/CommonTypes.js";
import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { authenticateJWT } from "../../middlewares/AuthJWT.js";
import DataController from '../controllers/RefreshController.js';
import SquadController from '../controllers/SquadController.js';
import MatchdayController from '../controllers/MatchdayController.js';

const api: TconfigApi = config.get('api');
const { baseURL } = api;

class Routes {
    public router: Router;
    public userController: UserController;
    public dataController: DataController;
    public squadController: SquadController;
    public matchdayController: MatchdayController;

    constructor(router: Router) {
        this.router = router,
            this.userController = new UserController();
        this.dataController = new DataController();
        this.squadController = new SquadController();
        this.matchdayController = new MatchdayController();
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

        //Data Sync
        this.router.get(`${baseURL}/refresh`, (req, res) => this.dataController.refreshata(req, res))

        //Squad
        this.router.get(`${baseURL}/squad`, authenticateJWT, (req, res) => this.squadController.getSquadData(req, res))

        //matchday
        this.router.get(`${baseURL}/matchday`, authenticateJWT, (req, res) => this.matchdayController.getMatchdays(req, res))

    }
}

export default Routes;