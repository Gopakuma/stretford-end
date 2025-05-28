import { Router } from "express";
const router = Router();
import { usersRouter } from './routes';

router.use('/users', usersRouter);