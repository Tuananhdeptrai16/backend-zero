import express from "express"
import dotenv from 'dotenv'
import { routerAPI } from "./routes/v1/index.js"
import cors from 'cors';

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/', routerAPI)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
