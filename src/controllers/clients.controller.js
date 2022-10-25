import service from '../services/client.services.js'

async function getClientsTag(req, res) {
    const { tag } = req.query
    const response = await service.clientTags(tag)
    return res.status(200).json(response)
}

async function getCustomerReviewMedia(req, res) {
    const { dateStart, dateFinal } = req.query
    const response = await service.customerReviewMedia(dateStart, dateFinal)
    return res.status(200).json(response)
}


export default { getClientsTag, getCustomerReviewMedia }