let input = document.getElementById('department-search')
let dateStart = document.getElementById('date-start')
let dateFinal = document.getElementById('date-final')

input.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        if (input.value == "") {
            renderGraphic()
            return
        }
        renderGraphic(input.value)
    }
})

document.getElementById('search').addEventListener("click", () => {
    if (input.value == "") {
        renderGraphic()
        return
    }
    renderGraphic(input.value)
})

function loading(action) {
    if (action === true) {
        return document.querySelector(".loading").style.display = "block"
    }
    return document.querySelector(".loading").style.display = "none"
}

/**
 * 
 * @param {endereco} rota 
 * @returns 
 */
function renderGraphic(rota) {
    loading(true)
    const routes = {
        all: "/call-time-all",
        unique: `/call-time-by-department/${rota}?dateStart=${dateStart.value}&dateFinal=${dateFinal.value}`
    }
    request(routes.unique, "get")
        .then(data => {
            if (verifyReturn(data) == false) {
                loading()
                return
            }
            let label = []
            let datasets = []
            data.map(data => {
                label.push(`${data.departamentos}, Quant: ${data.chamados}`)
                datasets.push(data.tempo)
            })
            barGraph(label, datasets, 'Media de tempo por departamento', 'department')
            loading()
            return
        })
        .catch(err => { console.log(err) })
}