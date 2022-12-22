import departments from "../config/department.js"

/**
 * 
 * @param {Date} dateOne 
 * @param {Date} dateTwo 
 * @returns diferanca_em_minutos
 */
function calMinutsDiferenceDate(dateOne, dateTwo) {
    var minuts = (dateOne - dateTwo) / 1000 / 60  //minutos
    return minuts
}

function timeLimiter(hours, minuts) {
    if (hours >= 8 && hours <= 18) {
        if (hours == 18 && minuts > 30) {
            return false
        }
        return true
    }
    return false
}

function departmentSelect(select) {
    if (select == "Diego" || select == "diego") {
        return departments.Diego
    }
    return false
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

export {
    calMinutsDiferenceDate,
    departmentSelect,
    groupBy,
    orderBy,
    timeLimiter
}