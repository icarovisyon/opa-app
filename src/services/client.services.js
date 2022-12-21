import Consult from '../repositories/client.repositories.js'
import tags from '../repositories/tags.repositories.js'
import attendances from '../repositories/attendances.respositories.js'
import messagesAttendances from '../repositories/message.repositories.js'
import { ValidateSession } from './session.service.js'

import listClients from '../file/clients.json' assert { type: "json" }
import { groupBy, orderBy } from '../utils/utils.js'

async function clientTags(token, name) {
    try {
        if (!ValidateSession(token)) {
            return {
                type: 'error',
                message: 'Unauthorized'
            }
        }

        const tag = await tags.tagOnly(name)
        if (!tag[0]) {
            return {
                type: "error",
                message: "tag inexistente!"
            }
        }


        const data = []

        for (const index in tag) {
            const clients = await Consult.clientsTag(tag[index]._id)

            clients.map(client => {
                data.push({
                    id: client._id,
                    nome: client.nome,
                    status: client.status,
                    tag: tag[0].nome,

                })
            })
        }

        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

async function customerReviewMedia(token, dateStart, dateFinal) {
    try {
        if (!ValidateSession(token)) {
            return {
                type: 'error',
                message: 'Unauthorized'
            }
        }
        const response = await Consult.evaluationClient(dateStart, dateFinal)

        const avaliations = groupBy(response, 'client')
        const data = []
        const clients = []

        Object.keys(avaliations).forEach(function (key, index) {
            clients.push(key)
        });

        const clientData = listClients

        for (const cliente in clients) {
            const clientAvaliantion = avaliations[clients[cliente]]

            let totalAvaliations = 0
            let count = 0

            for (const avaliantion in clientAvaliantion) {
                if (clientAvaliantion[avaliantion].avaliacao > 0) {
                    totalAvaliations += clientAvaliantion[avaliantion].avaliacao * clientAvaliantion[avaliantion].quantidade
                    count += clientAvaliantion[avaliantion].quantidade
                }
            }
            const dataClient = clientData.find(client => client._id == clients[cliente])
            const media = (totalAvaliations / count).toFixed(2)
            if (media > 0 && media < 5.00) {
                data.push({
                    media: media,
                    quantidade: count,
                    cliente: dataClient.nome,
                    id: dataClient._id
                })
            }
        }
        return data.sort(orderBy)
    } catch (err) {
        console.log(err)
        return false
    }
}

async function clientByMessageAttendaces(token, message, dateStart, dateFinal) {
    try {
        if (!ValidateSession(token)) {
            return {
                type: 'error',
                message: 'Unauthorized'
            }
        }
        const messages = await messagesAttendances.messagesAttendances(message, dateStart, dateFinal)
        const attendaces = []

        /*         for (const message in messages) {
                    const response = await attendances.attendancesById(message.id_rota)
                    attendaces.push(response)
                } */
        return messages
    } catch (error) {
        console.log(error)
        return false
    }
}

export default { clientTags, customerReviewMedia, clientByMessageAttendaces }
