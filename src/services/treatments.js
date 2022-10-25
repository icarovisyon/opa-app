import departments from "../config/department.js"

function calMinutsDiferenceDate(dateOne, dateTwo) {
    var minuts = (new Date(dateOne) - new Date(dateTwo)) / 1000 / 60
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

export { calMinutsDiferenceDate, departmentSelect }