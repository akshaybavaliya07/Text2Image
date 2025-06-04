import express from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import {generateImage} from '../controllers/image.controller.js'

const route = express.Router();

route
    .use(verifyJWT)
    .post('/generate-image', generateImage)