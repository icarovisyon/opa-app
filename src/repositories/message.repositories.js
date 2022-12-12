import model from '../models/models.js'
import { mongoose } from '../db/db.js'

async function messagesAttendances(message, dateStart, dateFinal) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const messages = conn.model('atendimentos_mensagens', model.mensagemAtendimentos)

        const response = await messages.find({
            createdAt: {
                $gt: new Date(dateStart), $lt: new Date(dateFinal)
            },
            mensagem: { $regex: message }
        }, {
            id_rota: 1
        })
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}


export default { messagesAttendances }