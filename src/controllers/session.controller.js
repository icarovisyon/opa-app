import { GenerateTokenSession } from "../services/session.service.js";

async function Login(req, res) {
    const { login, password } = req.body;
    const response = await GenerateTokenSession(login, password)
    return res.status(response.status).send(response.data);
}

export { Login }