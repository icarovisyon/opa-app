import departments from "../config/department.js"

/**
 * 
 * @param {Date} dateOne 
 * @param {Date} dateTwo 
 * @returns diferanca_em_minutos
 */
function calMinutsDiferenceDate(dateOne, dateTwo) {
    var minuts = (new Date(dateOne) - new Date(dateTwo)) / 1000 / 60  //minutos
    return minuts
}


function departmentSelect(select) {
    if (select == "Pamela" || select == "pamela") {
        return departments.pamela
    }
    if (select == "Marcelo" || select == "marcelo") {
        return departments.marcelo
    }
    if (select == "Kenedi" || select == "kenedi") {
        return departments.kenedi
    }
    if (select == "Giulia" || select == "giulia") {
        return departments.giulia
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

export { calMinutsDiferenceDate, departmentSelect, groupBy, orderBy }