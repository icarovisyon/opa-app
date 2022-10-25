/**
 * @param {rota} url 
 * @param {metodo_http} method 
 * @returns response ||false
 */
async function request(url, method) {
    try {
        const response = await fetch(url, {
            method: 'get'
        }).then(result => result.json())
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

function verifyReturn(data) {
    if (!data) {
        return false
    }
    if (data.type == "error") {
        alert(data.message)
        return false
    }
    return true
}
