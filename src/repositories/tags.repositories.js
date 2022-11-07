import model from '../models/models.js'
import { mongoose } from '../db/db.js'



async function tagOnly(tag) {
    try {
        const conn = mongoose.createConnection(process.env.URL_MONGO)
        const tags = conn.model('tags', model.tags)

        const response = await tags.find({
            nome: { $regex: tag }
        })
        await conn.close()
        return response
    } catch (error) {
        console.log(error)
        return false
    }
}


export default { tagOnly }