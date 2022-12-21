import Consult from '../repositories/attendant.repositores.js'
import { ValidateSession } from './session.service.js'

async function attendantCountDaysAssuming(token, attendant, dateStart, dateFinal) {
    try {
        if (!ValidateSession(token)) {
            return {
                type: 'error',
                message: 'Unauthorized'
            }
        }

        const response = await Consult.attendantCountDaysAssuming(attendant, dateStart, dateFinal)
        return {
            description: "Atendimentos assumidos por dia",
            data: response
        }

    } catch (error) {
        console.log(error)
    }
}

async function attendantCountDaysFinished(token, attendant, dateStart, dateFinal) {
    try {
        if (!ValidateSession(token)) {
            return {
                type: 'error',
                message: 'Unauthorized'
            }
        }

        const response = await Consult.attendantCountDaysFinished(attendant, dateStart, dateFinal)
        return {
            description: "Atendimentos finalizados por dia",
            data: response
        }

    } catch (error) {
        console.log(error)
    }
}

export default { attendantCountDaysAssuming, attendantCountDaysFinished }