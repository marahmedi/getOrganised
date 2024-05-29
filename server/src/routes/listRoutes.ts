import express, { Router } from 'express';
import {getAllLists} from '../Controllers/listController'

const router: Router = express.Router();

router.get('/', getAllLists)


export default router