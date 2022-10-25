const searchTags = document.getElementById('search-tags')
let sidBarSelected = "dashboard"

document.getElementById(sidBarSelected).style.background = "#8a8a8a"

searchTags.addEventListener("keypress", event => {
    const table = document.querySelector(".data-table")

    if (event.key === "Enter") {
        if (searchTags.value == "") {
            return
        }
        request(`/clients-by-tags?tag=` + searchTags.value, 'get')
            .then(response => {
                table.innerHTML = ""
                if (response.type == "error") {
                    return
                }
                response.map(data => {
                    table.innerHTML += `<tr>
                <td class="id-child">${data.id}</td>
                <td class="name-child">${data.nome}</td>
                <td class="status-child">${data.status}</td>
                <td class="tag-child">${data.tag}</td>
                </tr>`
                })
            })
            .catch(err => { console.log(err) })

    }
})


function getPage(id) {
    alteredDisplayElement(sidBarSelected, "#6741d9")
    alteredDisplayElement(id, "#8a8a8a")
    sidBarSelected = id

    const element = document.querySelector('.' + id)
    element.style.display = 'block'
}

function alteredDisplayElement(id, value) {
    document.getElementById(id).style.background = value
}