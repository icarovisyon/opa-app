import Consult from '../repositories/attendances.respositories.js'
import { calMinutsDiferenceDate, departmentSelect, timeLimiter } from '../utils/utils.js'
import reason from '../repositories/reasons.repositories.js'

async function timeAttendancesDepartment(departament, dateStart, dateFinal) {
    try {
        if (dateStart == "" || dateFinal == "") {
            return {
                type: "error",
                message: "Preencha um periodo de datas!"
            }
        }
        const departmentSelected = departmentSelect(departament)
        if (!departmentSelected) {
            return {
                type: "error",
                message: "Gerente inexistente!"
            }
        }
        let data = []
        let minutsAll = 0
        let totalCount = 0


        for (const department in departmentSelected) {
            let timeMinuts = 0
            let count = 0

            let response = await Consult.attendancesByDepartment(departmentSelected[department].id, dateStart, dateFinal)

            for (const attendance in response) {
                if (response[attendance].atendentes[0]) {

                    const createdDate = new Date(response[attendance].createdAt)
                    const assumeDate = new Date(response[attendance].atendentes[0].inicio)

                    if (timeLimiter(createdDate.getHours(), createdDate.getMinutes())) {
                        let minuts = calMinutsDiferenceDate(assumeDate, createdDate);
                        if (minuts < 120) {
                            timeMinuts += minuts
                            count++
                            totalCount++
                        }
                    }
                }
            }
            const averageTime = timeMinuts / count++
            data.push({
                tempo: averageTime.toFixed(2),
                chamados: count,
                departamentos: departmentSelected[department].name
            })
            minutsAll += timeMinuts
        }
        const averageTimeAll = minutsAll / totalCount
        data.push({
            tempo: averageTimeAll.toFixed(2),
            chamados: totalCount,
            departamentos: "Todos departamentos"
        })
        return data
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }
}

async function timeAttendancesAll(dateStart, dateFinal) {
    try {
        const response = await Consult.attendancesAll(dateStart, dateFinal)
        let timeMinuts = 0
        let count = 0

        for (const data in response) {
            if (response[data].atendentes[0]) {
                const createdDate = new Date(response[data].createdAt)
                const assumeDate = new Date(response[data].atendentes[0].inicio)

                if (timeLimiter(createdDate.getHours(), createdDate.getMinutes())) {
                    let minuts = calMinutsDiferenceDate(assumeDate, createdDate);
                    if (minuts < 120) {
                        timeMinuts += minuts
                        count++;
                    }
                }
            }
        }
        const averageTime = timeMinuts / count++
        return {
            tempo: averageTime.toFixed(2),
            chamados: count,
            departamentos: "todos"
        }
    } catch (err) {
        console.log(err)
        return {
            error: true,
            message: err
        }
    }
}

async function totalAttendancesAll(dateStart, dateFinal) {
    try {
        const totalAmount = await Consult.totalAttendancesAll(dateStart, dateFinal)

        const attendancesAll = await Consult.attendancesAll(dateStart, dateFinal)

        let countInteraction = 0
        let countNotInteraction = 0

        for (const attendance in attendancesAll) {
            if (attendancesAll[attendance].atendentes[0]) {
                countInteraction++
            }
            else {
                countNotInteraction++
            }
        }

        return {
            total: totalAmount,
            assumidos: countInteraction,
            semInteracao: countNotInteraction
        }
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }
}

async function attendancesByReason(manager, dateStart, dateFinal) {
    try {
        const departments = departmentSelect(manager)

        let count = 1

        const data = []
        for (const department in departments) {
            const reasons = await reason.reasonsByDepartment(departments[department].id)

            for (const reason in reasons) {
                const countAttendances = await Consult.countAttendancesByReason(
                    reasons[reason]._id,
                    dateStart,
                    dateFinal,
                    departments[department].id

                )
                if (countAttendances > 0) {
                    data.push({
                        id: count++,
                        motivo: reasons[reason].motivo,
                        quantidade: countAttendances
                    })
                }
            }
        }
        return data
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }
}

async function numberAttendancesByTime(departament, dateStart, dateFinal) {
    try {
        if (dateStart == "" || dateStart == undefined || dateFinal == "" || dateFinal == undefined) {
            return {
                type: "error",
                message: "Preencha um periodo de datas!"
            }
        }
        const departmentSelected = departmentSelect(departament)



        if (!departmentSelected) {
            return {
                type: "error",
                message: "Gerente inexistente!"
            }
        }
        const data = []
        for (const department in departmentSelected) {
            let minuts5 = 0
            let minuts10 = 0
            let minuts15 = 0
            let minuts20 = 0
            let minuts30 = 0
            let minutsGreater30 = 0

            let response = await Consult.attendancesByDepartment(departmentSelected[department].id, dateStart, dateFinal)

            for (const attendance in response) {
                if (response[attendance].atendentes[0]) {

                    const startDate = new Date(response[attendance].createdAt)
                    const assumeDate = new Date(response[attendance].atendentes[0].inicio)

                    if (timeLimiter(startDate.getHours(), startDate.getMinutes())) {
                        let timeMinuts = calMinutsDiferenceDate(assumeDate, startDate)

                        if (timeMinuts < 6) {
                            minuts5 += 1
                        }
                        if (timeMinuts > 5 && timeMinuts < 11) {
                            minuts10 += 1
                        }
                        if (timeMinuts > 11 && timeMinuts < 16) {
                            minuts15 += 1
                        }
                        if (timeMinuts > 16 && timeMinuts < 21) {
                            minuts20 += 1
                        }
                        if (timeMinuts > 21 && timeMinuts < 31) {
                            minuts30 += 1
                        }
                        if (timeMinuts > 31 && timeMinuts < 120) {
                            minutsGreater30 += 1
                        }
                    }
                }
            }
            data.push({
                cinco: minuts5,
                dez: minuts10,
                quinze: minuts15,
                vinte: minuts20,
                trinta: minuts30,
                maior: minutsGreater30,
                setor: departmentSelected[department].name,
                id: departmentSelected[department].id
            })
        }

        return data
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }
}

async function timeOfCallsByReason(manager, dateStart, dateFinal) {
    try {
        if (dateStart == "" || dateStart == undefined || dateFinal == "" || dateFinal == undefined) {
            return {
                type: "error",
                message: "Preencha um periodo de datas!"
            }
        }
        const departments = departmentSelect(manager)
        let data = []
        let id = 0
        for (const department in departments) {
            const reasons = await reason.reasonsByDepartment(departments[department].id)
            for (const reason in reasons) {
                let timeMinuts = 0
                let count = 0
                const attendances = await Consult.attendancesByReason(
                    reasons[reason]._id,
                    dateStart,
                    dateFinal,
                    departments[department].id
                )
                for (const attendance in attendances) {
                    if (attendances[attendance].atendentes) {

                        const index = attendances[attendance].atendentes.length - 1
                        const dateFinal = new Date(attendances[attendance].fim)
                        const dateStart = new Date(attendances[attendance].atendentes[index].inicio)

                        timeMinuts += calMinutsDiferenceDate(
                            dateFinal,
                            dateStart
                        )
                        count++
                    }
                }
                if (timeMinuts > 0) {
                    data.push({
                        id: id++,
                        media: (timeMinuts / 60 / count).toFixed(2), //media em horas
                        chamados: count,
                        motivo: reasons[reason].motivo,
                        departamento: departments[department].name
                    })
                }
            }
        }
        return data
    } catch (err) {
        console.log(err)
        return {
            error: true,
            message: err
        }
    }
}

async function numberOfCallsHours(dateStart, dateFinal, manager) {
    try {
        if (dateStart == "" || dateStart == undefined || dateFinal == "" || dateFinal == undefined) {
            return {
                type: "error",
                message: "Preencha um periodo de datas!"
            }
        }
        const data = []

        const departments = departmentSelect(manager)
        for (const department in departments) {

            const attendances = await Consult.numberOfCallsHours(dateStart, dateFinal, departments[department].id)
            const teste = []
            attendances.map(attendace => {
                teste.push({
                    hora: attendace._id.hour,
                    dia: attendace._id.day,
                    mes: attendace._id.month,
                    ano: attendace._id.year,
                    quantidade: attendace.count
                })
            })
            data.push({
                departamento: departments[department].name,
                data: teste
            })

        }

        return data
    } catch (error) {
        console.log(error)
    }
}

export default {
    timeAttendancesAll,
    timeAttendancesDepartment,
    totalAttendancesAll,
    attendancesByReason,
    numberAttendancesByTime,
    timeOfCallsByReason,
    numberOfCallsHours
}
