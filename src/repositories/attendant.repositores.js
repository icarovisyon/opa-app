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
                    "atendentes.0.inicio": {
                        $gt: new Date(dateStart), $lt: new Date(dateFinal),
                    },
                    id_atendente: ObjectId(attendant),
                    canal: { $ne: "pabx" }
                }
            },
            {
                $project: {
                    day: { $dayOfMonth: "$atendentes[0]inicio" },
                    month: { $month: "$inicio" },
                    year: { $year: "$inicio" }
                }
            },
            { $group: { _id: { day: "$day", month: "$month", year: "$year", atendente: "$atendente" }, count: { $sum: 1 } } },
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
async function attendantCountDaysFinished(attendant, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.aggregate([
            {
                $match: {
                    fim: {
                        $gt: new Date(dateStart), $lt: new Date(dateFinal),
                    },
                    id_atendente: ObjectId(attendant),
                    canal: { $ne: "pabx" }
                }
            },
            {
                $project: {
                    day: { $dayOfMonth: "$fim" },
                    month: { $month: "$fim" },
                    year: { $year: "$fim" }
                }
            },
            { $group: { _id: { day: "$day", month: "$month", year: "$year" }, count: { $sum: 1 } } },
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

export default { attendantCountDaysAssuming, attendantCountDaysFinished, user }