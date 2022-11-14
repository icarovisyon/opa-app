import model from '../models/models.js'
import { mongoose } from '../db/db.js'
const ObjectId = mongoose.Types.ObjectId

async function attendancesAll(dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)
        const response = await atendimento.find({
            createdAt: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            canal: { $ne: "pabx" }
        }, {
            _id: 1,
            createdAt: 1,
            atendentes: 1,
            departartamento: 1,
            fim: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

async function attendancesByDepartment(departament, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.find({
            setor: departament,
            createdAt: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            status: "F"
        }, {
            _id: 1,
            createdAt: 1,
            atendentes: 1,
            departartamento: 1,
            fim: 1,
            ultimaTransferencia: 1,
            ultimaTransferenciaFilaDepartamento: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

async function totalAttendancesAll(dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.find({
            createdAt: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal)
            },
            canal: { $ne: "pabx" }
        }).count()
        await conn.close()
        return response
    } catch (error) {
        return error
    }
}


async function countAttendancesByReason(reason, dateStart, dateFinal, departament) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.find({
            createdAt: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            id_motivo_atendimento: reason,
            setor: ObjectId(departament)
        }).count()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

async function attendancesByReason(reason, dateStart, dateFinal, departament) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.find({
            fim: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            id_motivo_atendimento: reason,
            setor: departament,
            status: "F"
        }, {
            _id: 1,
            fim: 1,
            atendentes: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

async function numberOfCallsHours(dateStart, dateFinal, departament) {
    try {

        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.aggregate([
            {
                $match: {
                    inicio: {
                        $gt: new Date(dateStart), $lt: new Date(dateFinal),
                    },
                    canal: { $ne: "pabx" },
                    setor: ObjectId(departament),
                }
            },
            {
                $project: {
                    hour: { $hour: "$inicio" },
                    day: { $dayOfMonth: "$inicio" },
                    month: { $month: "$inicio" },
                    year: { $year: "$inicio" }
                }
            },
            {
                $group: {
                    _id: {
                        hour: "$hour",
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
        return response
    } catch (error) {
        console.log(error)
    }
}

export default {
    attendancesAll,
    attendancesByDepartment,
    totalAttendancesAll,
    countAttendancesByReason,
    attendancesByReason,
    numberOfCallsHours
}
