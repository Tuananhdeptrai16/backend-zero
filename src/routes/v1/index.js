import express from 'express'
import { deleteUser, getUser, handleLogin, postCreateUser } from '../../controllers/UserController/index.js'
import authMiddleware from '../../middleware/auth.middleware.js'
import { handleRefreshToken } from '../../controllers/refreshToken.controller.js'
export const routerAPI = express.Router()

routerAPI.use(authMiddleware)
routerAPI.get('/v1/get-user', getUser)
routerAPI.post('/v1/create-user', postCreateUser)
routerAPI.post('/v1/user', deleteUser)
routerAPI.post('/v1/login', handleLogin)
routerAPI.post('/v1/refresh-token', handleRefreshToken)

    