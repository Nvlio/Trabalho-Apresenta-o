import FuncionariMod from "../Modelo/FuncionariosModelo.js";

export default class FuncionarioControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {

            const modelo = new FuncionariMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const cpf = req.params.cpf
            const modelo = new FuncionariMod(cpf);
            const resposta = await modelo.PegarValor()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {

            const body = req.body;
            const tipo = req.params.tipo
            const cpf = body.cpf;
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const especialidade = body.especialidade;
            const unidade = body.unidade;
            const funcao = body.funcao;

            if (cpf, nome, telefone, senha, email,especialidade,unidade,funcao || (email,senha) && tipo==="Login") {
                const modelo = new FuncionariMod(cpf, nome, telefone, senha, email,especialidade,funcao,unidade);
                const resposta = await modelo.Inserir(tipo)
                console.log(resposta.resposta)
                if (resposta.resposta.message) {
                    return resp.json({ msg: { message: resposta.resposta.message} })
                } else if (resposta.resposta.code) {
                    return resp.json({ msg: { message: resposta.resposta.code} })
                } else {
                    return resp.json({ resp: resposta.resposta,token:resposta.token })
                }
            }
        }
        return resp.json({ msg: { message: "falta dados" } })
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {

            const body = req.body;
            const cpf = req.params.cpf
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const especialidade = body.especialidade;
            const unidade = body.unidade;
            const funcao = body.funcao;

            if (cpf != undefined || cpf != "" || cpf != "undefined") {
                const modelo = new FuncionariMod(cpf);
                const resposta = await modelo.Atualizar(nome, telefone, senha, email,especialidade,unidade,funcao)
                console.log(resposta)
                return resp.json({resp:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {

            const cpf = req.params.cpf
            if (cpf) {
                const modelo = new FuncionariMod(cpf);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}