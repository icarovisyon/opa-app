const input = document.getElementById('department-search')
const dateStart = document.getElementById('date-start')
const dateFinal = document.getElementById('date-final')
const departmentsSelected = document.querySelector('#department-selected')
const attendantSelected = document.querySelector('#attendant-selected')

input.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        if (input.value == "") {
            return
        }
        departmentsSelect()
    }
})

departmentsSelected.addEventListener('change', event => {
    attendantSelected.style.display = 'inline-block'
    let department = departmentsSelected.options[departmentsSelected.selectedIndex].value
    getUser(department)
})

attendantSelected.addEventListener('change', event => {
    let attendant = attendantSelected.options[attendantSelected.selectedIndex].value
    renderTableAttendant(attendant)
})


async function departmentsSelect() {
    try {
        const response = await request(`/departments?department=${input.value}`, 'get')
        if (!response) {
            alert("Gestor inexistente!");
            return
        }

        departmentsSelected.innerHTML = "<option>Escolha um setor</option>"

        response.map(data => {
            const option = document.createElement("option")
            option.innerText = data.name
            option.value = data.id
            departmentsSelected.appendChild(option)
        })
        return departmentsSelected.removeAttribute("disabled")
    } catch (error) {
        console.log(error)
    }
}

async function getUser(department) {
    try {
        attendantSelected.innerHTML = "<option>Escolha um atendente</option>"
        const response = await request(`/user-department?department=${department}`, 'get')
        response.map(data => {
            const option = document.createElement("option")
            option.innerText = data.name
            option.value = data.id
            attendantSelected.appendChild(option)
        })
        return attendantSelected.removeAttribute("disabled")
    } catch (error) {
        console.log(error)
    }
}

async function renderTableAttendant(attendant) {
    try {
        if (!verifyDate()) {
            return alert("Preencha datas")
        }
        const url = {
            finished: `/atendente-finished?attendant=${attendant}&dateStart=${dateStart.value}&dateFinal=${dateFinal.value}`,
            assuming: `/atendente-assuming?attendant=${attendant}&dateStart=${dateStart.value}&dateFinal=${dateFinal.value}`
        }

        const assuming = await request(url.assuming, 'get').then(response => {
            let label = []
            let datasets = []

            response.data.map(data => {
                const date = dateFormat(data._id.day, data._id.month, data._id.year)

                label.push(`${date}`)
                datasets.push(data.count)
            })

            barGraph(label, datasets, response.description, 'assuming')
        })

        const finished = await request(url.finished, 'get').then(response => {
            let label = []
            let datasets = []
            response.data.map(data => {
                const date = dateFormat(data._id.day, data._id.month, data._id.year)

                label.push(`${date}`)
                datasets.push(data.count)
            })

            barGraph(label, datasets, response.description, 'finished')
        })


    } catch (error) {
        console.log(error)
    }
}

function dateFormat(day, month, year) {
    return new Date(year + "-" + month + "-" + day).toLocaleDateString('pt-BR')
}

function verifyDate() {
    if (dateStart.value == "" || dateFinal.value == "") {
        return false
    }
    return true
}