import ClienteMod from "../Modelo/ClienteModelo.js";

export default class ClienteControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {

            const modelo = new ClienteMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const cpf = req.params.cpf
            const modelo = new ClienteMod(cpf);
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

            if (cpf, nome, telefone, senha, email || (email,senha) && tipo==="Login") {
                const modelo = new ClienteMod(cpf, nome, telefone, senha, email);
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
            if (cpf != undefined || cpf != "" || cpf != "undefined") {
                const modelo = new ClienteMod(cpf);
                const resposta = await modelo.Atualizar(nome, telefone, senha, email)
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
                const modelo = new ClienteMod(cpf);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}