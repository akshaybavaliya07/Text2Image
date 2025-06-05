import express from 'express'
import { forgotPassword, resetPassword } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const route = express.Router();

route
    .post('/forgot-password', forgotPassword)
    .post('/reset-password/:token', resetPassword)

export default route;