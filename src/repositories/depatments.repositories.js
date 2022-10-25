import model from '../models/models.js'
import { mongoose } from '../db/db.js'

const ObjectId = mongoose.Types.ObjectId


async function userDepartments(department) {
    try {
        const conn = mongoose.createConnection('mongodb://localhost:27017/suite_opa')
        const departamentos_usuarios = conn.model('departamentos_usuarios', model.departamentosUsuarios)

        const response = await departamentos_usuarios.find({
            departamento: department,
            statusVinculo: "A"
        })
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}


export default { userDepartments }