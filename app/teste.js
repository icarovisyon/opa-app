import Consult from '../repositories/attendances.respositories.js'
import { calMinutsDiferenceDate, departmentSelect } from './treatments.js'
import reason from '../repositories/reasonByAttendances.js'

async function timeAttendancesDepartment(departament, dateStart, dateFinal) {
    try {
        const departmentSelected = departmentSelect(departament)
        if (!departmentSelected) {
            return {
                type: "error",
                message: "Gerente inexistente!"
            }
        }
        if (dateStart == "" || dateFinal == "") {
            return {
                type: "error",
                message: "Preencha um periodo de datas!"
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
        console.log(err)
        return false
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
        console.log(err)
        return false
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
        console.log(err)
        return false
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
                const countAttendances = await Consult.attendancesByReason(
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
        console.log(err)
        return false
    }
}

async function numberAttendancesByTime(departament, dateStart, dateFinal) {
    try {
        if (dateStart == "" || dateFinal == "") {
            return {
                type: "error",
                message: "Preencha um periodo de datas!"
            }
        }
        const departmentSelected = departmentSelect(departament)

        let minuts5 = 0
        let minuts10 = 0
        let minuts20 = 0
        let minuts30 = 0


        if (!departmentSelected) {
            return {
                type: "error",
                message: "Gerente inexistente!"
            }
        }
        let data = []

        for (const department in departmentSelected) {

            let response = await Consult.attendancesByDepartment(departmentSelected[department].id, dateStart, dateFinal)

            for (const attendance in response) {
                if (response[attendance].atendentes[0]) {
                    let timeMinuts = calMinutsDiferenceDate(response[attendance].atendentes[0].inicio, response[attendance].createdAt)

                    if (timeMinuts >= 5) {
                        minuts5 += 1
                    }
                    if (timeMinuts >= 10) {
                        minuts10 += 1
                    }
                    if (timeMinuts >= 20) {
                        minuts20 += 1
                    }
                    if (timeMinuts >= 30) {
                        minuts30 += 1
                    }
                }
            }
            const time = timeMinuts / response.length

            data.push({
                tempo: time.toFixed(2),
                chamados: response.length,
                departamentos: departmentSelected[department].name
            })
        }
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export default { timeAttendancesAll, timeAttendancesDepartment, totalAttendancesAll, attendancesByReason }