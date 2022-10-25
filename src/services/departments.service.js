import departments from '../repositories/depatments.repositories.js'
import attendent from '../repositories/attendant.repositores.js'

async function userDepartments(department) {
    try {
        const response = await departments.userDepartments(department)
        const user = []

        for (const index in response) {
            const data = await attendent.user(response[index].usuario)
            if (data[0]) {
                user.push({
                    id: data[0]._id,
                    name: data[0].nome
                })
            }
        }
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}

export default { userDepartments }