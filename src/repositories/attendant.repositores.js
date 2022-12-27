import model from '../models/models.js'
import { mongoose } from '../db/db.js'

const ObjectId = mongoose.Types.ObjectId

async function attendantCountDaysAssuming(attendant, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.aggregate([
            {
                $match: {
                    "data.ultimaTransferenciaDepartamento": {
                        $gt: new Date(dateStart),
                        $lt: new Date(dateFinal)
                    },
                    idAtendente: ObjectId(attendant),
                    canal: { $ne: "pabx" }
                }
            },
            {
                $project: {
                    day: { $dayOfMonth: "$data.ultimaTransferenciaDepartamento" },
                    month: { $month: "$data.ultimaTransferenciaDepartamento" },
                    year: { $year: "$data.ultimaTransferenciaDepartamento" }
                }
            },
            {
                $group: {
                    _id: {
                        day: "$day",
                        month: "$month",
                        year: "$year", atendente: "$idAtendente"
                    }, count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
    dafeads
}
async function attendantCountDaysFinished(attendant, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.aggregate([
            {
                $match: {
                    "data.encerramento": {
                        $gt: new Date(dateStart), $lt: new Date(dateFinal),
                    },
                    idAtendente: ObjectId(attendant),
                    canal: { $ne: "pabx" },
                    status: "F"
                }
            },
            {
                $project: {
                    day: { $dayOfMonth: "$data.encerramento" },
                    month: { $month: "$data.encerramento" },
                    year: { $year: "$data.encerramento" }
                }
            },
            {
                $group: {
                    _id: {
                        day: "$day",
                        month: "$month",
                        year: "$year"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

async function user(id) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const user = conn.model('usuarios', model.usuario)

        const response = await user.find({
            status: "A",
            _id: id
        })
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

export default {
    attendantCountDaysAssuming,
    attendantCountDaysFinished,
    user
}

