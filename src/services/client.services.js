import Consult from '../repositories/client.repositories.js'
import tags from '../repositories/tags.repositories.js'

import listClients from '../file/clients.json' assert { type: "json" }

async function clientTags(name) {
    try {
        const tag = await tags.tagOnly(name)
        if (!tag[0]) {
            return {
                type: "error",
                message: "tag inexistente!"
            }
        }
        const clients = await Consult.clientsTag(tag[0]._id)


        const data = []

        clients.map(client => {
            data.push({
                id: client._id,
                nome: client.nome,
                status: client.status,
                tag: tag[0].nome,

            })
        })

        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

function groupBy(array, key) {
    return array.reduce((acc, item) => {

        if (!acc[item._id[key]]) acc[item._id[key]] = []

        acc[item._id[key]].push({
            cliente: item._id.client,
            avaliacao: item._id.avaliacao[0] || 0,
            quantidade: item.count
        })

        return acc
    }, {})
}

function orderBy(a, b) {
    return a.media > b.media ? 1 : a.media < b.media ? -1 : 0;
}

async function customerReviewMedia(dateStart, dateFinal) {
    try {
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
                    cliente: dataClient.nome
                })
            }
        }
        return data.sort(orderBy)
    } catch (err) {
        console.log(err)
        return false
    }
}


export default { clientTags, customerReviewMedia }
