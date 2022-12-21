import service from '../services/attendances.service.js'

async function getTimeAttendancesAll(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal } = req.query
    const response = await service.timeAttendancesAll(token, dateStart, dateFinal)
    return res.status(200).header({ "host": "localhost:8081" }).json(response)
}

async function getAttendances(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal } = req.query
    const { department } = req.params
    const response = await service.timeAttendancesDepartment(token, department, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getTotalAttendancesAll(req, res) {
    const { dateStart, dateFinal } = req.query
    const response = await service.totalAttendancesAll(dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getAttendancesByReason(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal, gestor } = req.query
    const response = await service.attendancesByReason(token, gestor, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getnumberAttendancesByTime(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal, gestor } = req.query
    const response = await service.numberAttendancesByTime(token, gestor, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getTimeOfCallsByReason(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal, gestor } = req.query
    const response = await service.timeOfCallsByReason(token, gestor, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getNumberOfCallsHours(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal, gestor } = req.query
    const response = await service.numberOfCallsHours(token, dateStart, dateFinal, gestor)
    return res.status(200).json(response)
}

export default {
    getTimeAttendancesAll,
    getAttendances,
    getTotalAttendancesAll,
    getAttendancesByReason,
    getnumberAttendancesByTime,
    getTimeOfCallsByReason,
    getNumberOfCallsHours
}