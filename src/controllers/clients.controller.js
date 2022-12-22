import service from '../services/client.services.js'

async function getClientsTag(req, res) {
    const { token } = req.headers
    const { tag } = req.query
    const response = await service.clientTags(token, tag)
    return res.status(200).json(response)
}

async function getCustomerReviewMedia(req, res) {
    const { token } = req.headers
    const { dateStart, dateFinal } = req.query
    const response = await service.customerReviewMedia(token, dateStart, dateFinal)
    return res.status(200).json(response)
}

async function getClientByMessageAttendaces(req, res) {
    const { token } = req.headers
    const { message, dateStart, dateFinal } = req.query
    const response = await service.clientByMessageAttendaces(token, message, dateStart, dateFinal)
    return res.status(200).json(response)

}

export default { getClientsTag, getCustomerReviewMedia, getClientByMessageAttendaces }