import express, { Router } from 'express'
import {registerUser, loginUser, userCredits} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const route = Router();

route
    .post('/register', registerUser)
    .post('/login', loginUser)
    .use(verifyJWT)
    .get('/credits', userCredits)

export default route;