import service from '../services/attendances.service.js'


async function getTimeAttendancesAll(req, res) {
    const { dateStart, dateFinal } = req.query
    const response = await service.timeAttendancesAll(dateStart, dateFinal)
    return res.status(200).header({ "host": "localhost:8081" }).json(response)
}

async function getAttendances(req, res) {
    const { dateStart, dateFinal } = req.query
    const { department } = req.params
    const response = await service.timeAttendancesDepartment(department, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getTotalAttendancesAll(req, res) {
    const { dateStart, dateFinal } = req.query
    const response = await service.totalAttendancesAll(dateStart, dateFinal)
    return res.status(200).json(response)
}

export default { getTimeAttendancesAll, getAttendances, getTotalAttendancesAll }