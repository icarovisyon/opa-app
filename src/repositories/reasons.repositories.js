import model from '../models/models.js'
import { mongoose } from '../db/db.js'


async function reasonsByDepartment(department) {
    try {
        const conn = mongoose.createConnection('mongodb://localhost:27017/suite_opa')
        const reasons = conn.model('motivo_atendimentos', model.motivoAtendimentos)

        const response = await reasons.find({
            departamentos: department
        }, {
            _id: 1,
            motivo: 1
        }).lean().exec()
        await conn.close()
        return response
    } catch (error) {
        return error
    }
}

export default { reasonsByDepartment }