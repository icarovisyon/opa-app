import model from '../models/models.js'
import { mongoose } from '../db/db.js'

async function attendancesAll(dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection('mongodb://localhost:27017/suite_opa')
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
        const teste = await attendancesAll()
        if (teste) {
            return teste
        }
        return false
    }
}

async function attendancesByDepartment(departament, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection('mongodb://localhost:27017/suite_opa')
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
            fim: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

async function totalAttendancesAll(dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection('mongodb://localhost:27017/suite_opa')
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


async function attendancesByReason(reason, dateStart, dateFinal, departament) {
    try {
        const conn = mongoose.createConnection('mongodb://localhost:27017/suite_opa')
        const atendimento = conn.model('atendimentos', model.atendimentos)

        const response = await atendimento.find({
            createdAt: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal),
            },
            id_motivo_atendimento: reason,
            setor: departament
        }).count()
        await conn.close()
        return response
    } catch (error) {
        return false
    }
}

export default { attendancesAll, attendancesByDepartment, totalAttendancesAll, attendancesByReason }