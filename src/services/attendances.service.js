import Consult from '../repositories/attendances.respositories.js'
import { calMinutsDiferenceDate, departmentSelect } from '../utils/utils.js'
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
        let totalAmount = 0

        for (const department in departmentSelected) {
            let timeMinuts = 0

            let response = await Consult.attendancesByDepartment(departmentSelected[department].id, dateStart, dateFinal)

            for (const attendance in response) {
                if (response[attendance].atendentes[0]) {
                    timeMinuts += calMinutsDiferenceDate(response[attendance].atendentes[0].inicio, response[attendance].createdAt);
                }
            }
            totalAmount += response.length
            const averageTime = timeMinuts / response.length
            data.push({
                tempo: averageTime.toFixed(2),
                chamados: response.length,
                departamentos: departmentSelected[department].name
            })
            minutsAll += timeMinuts
        }
        const averageTimeAll = minutsAll / totalAmount
        data.push({
            tempo: averageTimeAll.toFixed(2),
            chamados: totalAmount,
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

        for (const data in response) {
            if (response[data].atendentes[0]) {
                timeMinuts += calMinutsDiferenceDate(response[data].atendentes[0].inicio, response[data].createdAt)
            }
        }
        const averageTime = timeMinuts / response.length
        return {
            tempo: averageTime.toFixed(2),
            chamados: response.length,
            departamentos: "todos"
        }
    } catch (err) {
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
                    let timeMinuts = calMinutsDiferenceDate(response[attendance].atendentes[0].inicio, response[attendance].createdAt)

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
                    if (timeMinuts > 31 && timeMinuts < 90) {
                        minutsGreater30 += 1
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
                        const teste = attendances[attendance].atendentes.length
                        timeMinuts += calMinutsDiferenceDate(attendances[attendance].fim, attendances[attendance].atendentes[teste - 1].inicio)
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

export default {
    timeAttendancesAll,
    timeAttendancesDepartment,
    totalAttendancesAll,
    attendancesByReason,
    numberAttendancesByTime,
    timeOfCallsByReason
}