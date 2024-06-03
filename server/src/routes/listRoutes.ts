import express, { Router } from 'express';
import {getAllLists, newList} from '../Controllers/listController'

const router: Router = express.Router();

const authorization = require("../middleware/authorization")

router.get('/all', authorization, getAllLists)

// create new list
router.post('/', authorization, newList)


export default router