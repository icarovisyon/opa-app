import service from '../services/attendant.service.js'

async function getAttendatCountDaysAssumin(req, res) {
    const { attendant, dateStart, dateFinal } = req.query
    const response = await service.attendantCountDaysAssuming(attendant, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getAttendatCountDaysFinished(req, res) {
    const { attendant, dateStart, dateFinal } = req.query
    const response = await service.attendantCountDaysFinished(attendant, dateStart, dateFinal)
    return res.status(200).json(response)
}

export default { getAttendatCountDaysAssumin, getAttendatCountDaysFinished }