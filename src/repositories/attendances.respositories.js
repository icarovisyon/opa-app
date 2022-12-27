import model from '../models/models.js'
import { mongoose } from '../db/db.js'
const ObjectId = mongoose.Types.ObjectId

async function attendancesAll(dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)
        const response = await atendimento.find({
            "data.abertura": {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            canal: { $ne: "pabx" }
        }, {
            _id: 1,
            data: 1,
            departartamento: 1,
            status: 1,
            historicoAtendentes: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

async function attendancesByDepartment(department, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.find({
            idSetor: ObjectId(department),
            "data.abertura": {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            status: "F",
        }, {
            _id: 1,
            idSetor: 1,
            data: 1,
            historicoAtendentes: 1
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
            "data.abertura": {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
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
            "data.abertura": {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            idMotivoAtendimento: ObjectId(reason),
            idSetor: ObjectId(departament)
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
            "data.encerramento": {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            idMotivoAtendimento: ObjectId(reason),
            idSetor: ObjectId(departament),
            status: "F"
        }, {
            _id: 1,
            data: 1,
            historicoAtendentes: 1
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
                    "data.abertura": {
                        $gt: new Date(dateStart), $lt: new Date(dateFinal),
                    },
                    canal: { $ne: "pabx" },
                    idSetor: ObjectId(departament),
                }
            },
            {
                $group: {
                    _id: {
                        hora: {
                            $dateToString: { format: "%H", date: "$data.abertura", timezone: '-0300' },
                        },
                        dia: {
                            $dateToString: { format: "%d", date: "$data.abertura", timezone: '-0300' },
                        },
                        mes: {
                            $dateToString: { format: "%m", date: "$data.abertura", timezone: '-0300' },
                        },
                        ano: {
                            $dateToString: { format: "%Y", date: "$data.abertura", timezone: '-0300' },
                        }
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
