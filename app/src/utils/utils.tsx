export function dateFormat(day: string, month: string, year: string) {
    return new Date(year + "-" + month + "-" + day + " 00:00:00").toLocaleDateString('pt-BR')
}