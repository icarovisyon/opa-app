import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/app', express.static('./public/index.html'))
app.use('/app/departamento', express.static('./public/pages/departments.html'))
app.use('/app/cliente', express.static('./public/pages/clients.html'))
app.use('/app/css', express.static('./public/css'))
app.use('/app/js', express.static('./public/js'))

app.use('/teste', express.static('./teste'))

app.use(router)

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log('server run, port: ' + PORT)
})