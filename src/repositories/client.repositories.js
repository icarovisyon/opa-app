import model from '../models/models.js'
import { mongoose } from '../db/db.js'
import { ObjectID } from 'bson'

async function clients() {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const clients = conn.model('clientes', model.cliente)

        const response = await clients.find({
        }, {
            _id: 1,
            nome: 1,
            status: 1
        }
        )
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

async function clientsTag(tag) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const clients = conn.model('clientes', model.cliente)

        const response = await clients.find({
            tags: tag
        }, {
            _id: 1,
            nome: 1,
            status: 1
        }
        )
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

async function evaluationClient(dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)
        const response = await atendimento.aggregate()
            .match({
                createdAt: {
                    $gt: new Date('2022-09-01'), $lt: new Date('2022-09-30'),
                },
                canal: { $ne: "pabx" }
            })
            .group({ _id: { client: "$id_cliente", avaliacao: "$avaliacoes.nota" }, count: { $sum: 1 } })
            .sort("-avaliacao")
        return response
    } catch (err) {
        return err
    }
}

async function clientsById(id) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const clients = conn.model('clientes', model.cliente)

        const response = await clients.find({
            _id: ObjectID(id)
        }, {
            _id: 1,
            nome: 1,
            status: 1
        }
        )
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

export default {
    clients,
    clientsTag,
    evaluationClient,
    clientsById
}