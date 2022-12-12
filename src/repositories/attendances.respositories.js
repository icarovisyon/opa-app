import model from '../models/models.js'
import { mongoose } from '../db/db.js'
const ObjectId = mongoose.Types.ObjectId
import messages from '../file/attendances.json' assert { type: "json" }
import fs from 'fs'
import client from './client.repositories.js'

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
                $group: {
                    _id: {
                        hora: {
                            $dateToString: { format: "%H", date: "$inicio", timezone: '-0300' },
                        },
                        dia: {
                            $dateToString: { format: "%d", date: "$inicio", timezone: '-0300' },
                        },
                        mes: {
                            $dateToString: { format: "%m", date: "$inicio", timezone: '-0300' },
                        },
                        ano: {
                            $dateToString: { format: "%Y", date: "$inicio", timezone: '-0300' },
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

async function attendancesById() {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const atendimento = conn.model('atendimentos', model.atendimentos)
        const attendances = []
        const data = []

        for (const message in messages) {
            const response = await atendimento.find({
                _id: ObjectId(messages[message].id_rota)
            }, {
                id_cliente: 1,
                protocolo: 1
            }).lean().exec()
            attendances.push(response[0])

        }

        fs.writeFile('arquivo.json', JSON.stringify(attendances), (err) => {
            if (err) throw err;
            console.log('O arquivo foi criado!');
        });
        await conn.close()
        return
    } catch (error) {
        console.log(error)
        return false
    }
}
attendancesById()
export default {
    attendancesAll,
    attendancesByDepartment,
    totalAttendancesAll,
    countAttendancesByReason,
    attendancesByReason,
    numberOfCallsHours,
    attendancesById
}
