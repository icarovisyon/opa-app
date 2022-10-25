import Consult from '../repositories/attendant.repositores.js'

async function attendantCountDaysAssuming(attendant, dateStart, dateFinal) {
    try {
        const response = await Consult.attendantCountDaysAssuming(attendant, dateStart, dateFinal)
        return {
            description: "Atendimentos assumidos por dia",
            data: response
        }

    } catch (error) {
        console.log(error)
    }
}

async function attendantCountDaysFinished(attendant, dateStart, dateFinal) {
    try {
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