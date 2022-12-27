import { mongoose } from '../db/db.js'

const ObjectId = mongoose.Types.ObjectId

const atendimentosSchema = new mongoose.Schema({
    _id: ObjectId,
    idAtendente: ObjectId,
    idAtendimentoOrigem: ObjectId,
    idSetor: ObjectId,
    id_user: ObjectId,
    idCanalComunicacao: ObjectId,
    canalOrigem: ObjectId,
    idCanalOrigem: ObjectId,
    setor: ObjectId,
    nivelPrioridadeListagem: Number,
    status: String,
    data: {
        abertura: Date,
        inicioAtendimento: Date,
        encerramento: Date,
        ultimaAtualizacao: Date,
        ultimaTransferenciaDepartamento: Date
    },
    clienteTerceiro: String,
    clienteContatoTerceiro: {
        _id: ObjectId,
        nome: String,
        telegram: Number,
        historico_email: Boolean,
        habilitarAlerta: Boolean,
        requerAutenticacaoSempre: Boolean,
        contatoEhHumano: Boolean,
        classificacao: String,
        emails: [],
        fones: [],
        opt_in_opt_out: [],
        createdAt: Date,
        updatedAt: Date,
        __v: Number,
        imagem: String
    },
    historico: [],
    tags: [],
    historicoAtendentes: [
        {
            id: ObjectId,
            departamento: ObjectId,
            atendimentoHumano: Boolean,
            _id: ObjectId,
            dataInicioAtendimento: Date,
            dataFimAtendimento: Date
        }
    ],
    avaliacoes: [],
    observacoes: [
        {
            idAtendente: ObjectId,
            dataCriacao: Date,
            mensagem: String,
            _id: ObjectId
        }
    ],
    mensagens: [
        {
            idRemetenteAtendente: ObjectId,
            idMensagemCitada: String,
            idMidia: ObjectId,
            idChamada: ObjectId,
            template: String,
            mensagem: String,
            tipo: String,
            envio: {
                status: String,
                observacao: String
            },
            _id: ObjectId,
            data: Date
        }],
    __v: 0
}, { collection: 'atendimentos' }
)

const usuariosSchema = new mongoose.Schema({
    _id: ObjectId,
    empresa: ObjectId,
    token: String,
    nome: String,
    status: Boolean,
    senha: String,
    online: String,
    imagem: String,
    tipo: String,
    flow: ObjectId,
    departamento: ObjectId,
    encerramento_inatividade: Number,
    msg_encerramento_inatividade: String,
    tipo_acao_inatividade: String,
    departamento_transf_inatividade: String,
    conexoes: [],
    __v: 0
}, { collection: 'usuarios' }
);

const departamentosUsuariosSchema = new mongoose.Schema({
    _id: ObjectId,
    departamento: ObjectId,
    usuario: ObjectId,
    statusVinculo: String
}, { collection: 'departamentos_usuarios' }
);

const tagsSchema = new mongoose.Schema({
    _id: ObjectId,
    empresa: ObjectId,
    id_criador: ObjectId,
    nome: String,
    cor: String,
    _v: String
}, { collection: 'tags' }
);

const motivoAtendimentoSchema = new mongoose.Schema({
    _id: ObjectId,
    motivo: String,
    departamentos: [ObjectId],
    __v: Number
}, { collection: 'motivo_atendimentos' }
);

export default {
    atendimentos: atendimentosSchema,
    departamentosUsuarios: departamentosUsuariosSchema,
    usuario: usuariosSchema,
    tags: tagsSchema,
    motivoAtendimentos: motivoAtendimentoSchema,
    ObjectId: ObjectId
}