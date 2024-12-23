import axios from 'axios'
// const dotenv = require('dotenv')

var endpointProxy = process.env.REACT_APP_ENDPOINT_PROXY;

var springEndPoint = `https://${endpointProxy}/api/v1`

// const springEndPoint = "http://localhost:8080/api/v1";

// if(endpointProxy === undefined || endpointProxy === null){
    // springEndPoint = "http://localhost:8080/api/v1";

// }else {
//     springEndPoint = "http://localhost:8080/api/v1";
// }


// const springEndPoint = "my-stock-application.azurewebsites.net";

var header = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}

export class ApiRequest {

    // ***************************************************************************
    // *  LOGIN
    // ***************************************************************************

    static async userLogin(email, senha) {

        const usuario = {
            "user": email,
            "senha": senha,
        }

        try {
            const resposta = await axios.post(springEndPoint + "/auth/login", usuario);
            var data = resposta.data.token;
            localStorage.setItem("token", data);
            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }

    }

    static async loginUpdate(idUsuario, username, novaSenha) {

        try {
            const login = {
                "username": username,
                "senha": novaSenha
            }

            const resposta = await axios.put(springEndPoint + `/auth/atualizar-login/${idUsuario}`, login, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async userLogout() {

        try {
            const resposta = await axios.post(springEndPoint + "/auth/logout");

            if (resposta.status === 200) {
                localStorage.clear();
            }

            return resposta

        } catch (erro) {
            return erro;
        }

    }

    static async loginCreate(user, senha, userId) {

        const usuario = {
            "user": user,
            "senha": senha,
            "userId": userId
        }

        try {
            const resposta = await axios.post(springEndPoint + "/auth/register/user", usuario);

            return resposta;

        } catch (error) {
            return error
        }

    }

    static async recuperarSenha(email) {
        try {
            const resposta = await axios.post(springEndPoint + `/auth/redefinir-senha/enviar-email/${email}`);

            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }


    static async resetSenha(senha, token) {
        const senhaObj = {
            "senha": senha
        }
        try {
            const resposta = await axios.post(springEndPoint + `/auth/redefinir-senha/alterar-senha?token=${token}`, senhaObj);

            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    // ***************************************************************************
    // *  LOJA
    // ***************************************************************************   

    static async lojaCreate(user, senha, idAcessoLoja, idLoja) {

        try {
            const loja = {
                "user": user,
                "senha": senha,
                "idAcessoLoja": idAcessoLoja,
                "idLoja": idLoja
            }

            const resposta = await axios.post(springEndPoint + "/auth/register/loja", loja);

            return resposta;

        } catch (error) {
            return error
        }


    }

    static async lojaGetAll() {
        try {
            const resposta = await axios.get(springEndPoint + "/lojas", {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async lojaGet(idLoja) {
        try {
            const resposta = await axios.get(springEndPoint + `/lojas/${idLoja}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    // ***************************************************************************
    // *  USUARIO
    // ***************************************************************************    

    static async userCreate(objetoAdicionado) {

        const funcionario = {
            "nome": objetoAdicionado.nome,
            "idCargo": objetoAdicionado.idCargo,
            "email": objetoAdicionado.email,
            "telefone": objetoAdicionado.celular,
            "idLoja": objetoAdicionado.idLoja
        }
        try {
            const resposta = await axios.post(springEndPoint + "/usuarios", funcionario, {
                headers: header,
            });

            return resposta;
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data
            };
        }

    }

    static async userDelete(id) {

        try {
            const resposta = await axios.delete(springEndPoint + `/usuarios/${id}`, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }


    }

    static async userUpdate(id, objetoAdicionado) {

        try {
            const funcionario = {
                "nome": objetoAdicionado.nome,
                "email": objetoAdicionado.email,
                "telefone": objetoAdicionado.celular,
                "idCargo": objetoAdicionado.idCargo,
                "idLoja": objetoAdicionado.idLoja
            }

            const resposta = await axios.put(springEndPoint + `/usuarios/${id}`, funcionario, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro;
        }

    }

    static async userGetAll() {
        try {
            const resposta = await axios.get(springEndPoint + "/usuarios", {
                headers: header,
            });
            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }

    }

    static async userGetById(id) {
        try {
            const resposta = await axios.get(springEndPoint + `/usuarios/${id}`, {
                headers: header,
            });
            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }

    }


    static async userGetAllByLoja(idLoja) {
        try {
            const resposta = await axios.get(springEndPoint + `/usuarios/loja/${idLoja}`, {
                headers: header,
            });
            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }

    }

    // ***************************************************************************
    // *  CARGO
    // ***************************************************************************

    static async cargoCreate(nome, descricao) {

        const cargo = {
            "nome": nome,
            "descricao": descricao,
        }

        try {
            const resposta = await axios.post(springEndPoint + "/cargos", cargo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async cargoGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/cargos", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async cargoGetById(id) {

        try {
            const resposta = await axios.get(springEndPoint + `/cargos/${id}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }

    static async cargoDelete(id) {

        try {
            const resposta = await axios.delete(springEndPoint + `/cargos/${id}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }

    static async cargoUpdate(id, nome, descricao) {

        const cargo = {
            "nome": nome,
            "descricao": descricao,
        }

        try {
            const resposta = await axios.put(springEndPoint + `/cargos/${id}`, cargo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async cargoUpdateDescricao(id, descricao) {

        const cargo = {
            "descricao": descricao,
        }

        try {
            const resposta = await axios.put(springEndPoint + `/cargos/descricao/${id}`, cargo, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    // ***************************************************************************
    // *  PRODUTO
    // ***************************************************************************

    static async produtoCreate(produtoObj) {
        try {
            const produto = {
                "idCor": produtoObj.idCor,
                "idModelo": produtoObj.idModelo,
                "tamanho": produtoObj.tamanhoNumero,
                "nome": produtoObj.nome,
                "valorCusto": produtoObj.precoC,
                "valorRevenda": produtoObj.precoR,
                "itemPromocional": produtoObj.isPromocional,
                "idLoja": produtoObj.idLoja,
                "codigo": produtoObj.codigo
            }

            const resposta = await axios.post(springEndPoint + "/produtos", produto, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }

    }

    static async produtoGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/produtos", {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }

    static async produtoGetById(id, idCor, idModelo) {

        var query = "";

        if (id != undefined) {
            query += `id=${id}`;
        }

        if (idCor != undefined) {
            if (query != "") {
                query += "&"
            }
            query += `idCor=${id}`;
        }

        if (idModelo != undefined) {
            if (query != "") {
                query += "&"
            }
            query += `idModelo=${id}`;
        }

        try {
            var resposta = await axios.get(springEndPoint + `/produtos/especifico?${query}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }

    }

    static async editarProduto(id, produtoObj) {
        try {
            const prod = {
                "nome": produtoObj.nome,
                "valorCusto": produtoObj.precoC,
                "valorRevenda": produtoObj.precoR,
                "itemPromocional": produtoObj.isPromocional,
                "codigo": produtoObj.codigo
            }

            const resposta = await axios.put(springEndPoint + "/etps/" + id, prod, {
                headers: header,
            });
            console.log(resposta);
            return resposta;

        } catch (erro) {
            console.log("FODEU")
            return {
                status: erro?.response?.status,
                data: erro?.response?.data
            };
        }
    }

    static async excluirProduto(id) {
        try {
            const resposta = await axios.delete(springEndPoint + "/produtos/" + id, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    // ***************************************************************************
    // *  ETPs
    // ***************************************************************************

    static async etpsGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/etps", {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async etpsGetAllLojaNot(idLoja) {

        try {
            const resposta = await axios.get(springEndPoint + `/etps/filtro/loja/${idLoja}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async etpsGetById(id) {

        try {
            const resposta = await axios.get(springEndPoint + `/etps/${id}`, {
                method: "GET",
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async etpsGetAllByLoja(idLoja) {

        try {
            const resposta = await axios.get(springEndPoint + `/etps/loja/${idLoja}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async etpsGetByIdEditar(id) {

        try {
            const resposta = await axios.get(springEndPoint + "/etps/editar/" + id, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async etpEditar(produtoObj, id) {
        try {
            const etp = {
                "idCor": produtoObj.idCor,
                "idModelo": produtoObj.idModelo,
                "idTamanho": produtoObj.idTamanho,
                "idLoja": produtoObj.idLoja,
                "nome": produtoObj.nome,
                "valorCusto": produtoObj.precoC,
                "valorRevenda": produtoObj.precoR
            }

            console.log("bacnen", etp);

            const resposta = await axios.put(springEndPoint + "/etps/" + id, etp, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }

    }

    static async etpsGetFiltrados(modelo, tamanho, cor, precoInicio, precoFim, lojaId) {
        try {
            let queryParams = [];

            if (modelo !== '') {
                queryParams.push(`modelo=${modelo}`);
            }
            if (cor !== '') {
                queryParams.push(`cor=${cor}`);
            }
            if (tamanho !== '') {
                queryParams.push(`tamanho=${tamanho}`);
            }
            if (precoInicio !== '') {
                queryParams.push(`precoMinimo=${precoInicio}`);
            }
            if (precoFim !== '') {
                queryParams.push(`precoMaximo=${precoFim}`);
            }
            if (lojaId !== '') {
                queryParams.push(`id_loja=${lojaId}`);
            }

            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

            const resposta = await axios.get(springEndPoint + `/etps/filtro${queryString}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async excluirETP(id) {
        try {
            const resposta = await axios.delete(springEndPoint + "/etps/" + id, {
                headers: header,
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async adicionarNoEstoque(soma, idLoja, listaEtpsQuantidade) {
        const etpsEQuantidade = listaEtpsQuantidade;

        try {
            const resposta = await axios.patch(springEndPoint + "/etps/adicionar-estoque/" + idLoja, etpsEQuantidade, {
                params: { "soma": soma },
                headers: header,
            });
            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }


    // ***************************************************************************
    // *  COR
    // ***************************************************************************

    static async corCreate(nome) {

        try {
            const cor = {
                "nome": nome,
            }

            const resposta = await axios.post(springEndPoint + "/cores", cor, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async corGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/cores", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async corGetById(id) {

        try {
            const resposta = await axios.get(springEndPoint + `/cores/${id}`, {
                method: "GET",
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async corDelete(id) {

        try {
            const resposta = await axios.delete(springEndPoint + `/cores/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async corUpdate(id, nome) {

        try {
            const cor = {
                "nome": nome
            }

            const resposta = await axios.put(springEndPoint + `/cores/${id}`, cor, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    // ***************************************************************************
    // *  CATEGORIA
    // ***************************************************************************

    static async categoriaCreate(nome) {

        try {
            const categoria = {
                "nome": nome,
            }

            const resposta = await axios.post(springEndPoint + "/categorias", categoria, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async categoriaGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/categorias", {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro;
        }

    }

    static async categoriaGetById(id) {

        try {
            const resposta = await axios.get(springEndPoint + `/categorias/${id}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro;
        }
    }

    static async categoriaDelete(id) {

        try {
            const resposta = await axios.delete(springEndPoint + `/categorias/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async categoriaUpdate(id, nome) {

        try {
            const categoria = {
                "nome": nome
            }

            const resposta = await axios.put(springEndPoint + `/categorias/${id}`, categoria, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro;
        }

    }

    // ***************************************************************************
    // *  MODELO
    // ***************************************************************************  

    static async modeloCreate(modeloCreate) {

        try {
            const modelo = {
                // "codigo": modeloCreate.codigo, Modelo não tem mais codigo
                "nome": modeloCreate.nome,
                "idCategoria": modeloCreate.idCategoria,
                "idTipo": modeloCreate.idTipo
            }

            console.log("Dados do modelo na por do back", modelo);

            const resposta = await axios.post(springEndPoint + "/modelos", modelo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async modeloGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/modelos", {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }

    }

    static async modeloGetById(id) {

        try {

            const resposta = await axios.get(springEndPoint + `/modelos/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    /*static async modeloGetByCodigo(codigo) {

        try {
            const resposta = await axios.get(springEndPoint + `/modelos/codigo/${codigo}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
            // Modelo nao tem mais codigo
    }*/

    static async modelGetByIdEditar(id) {

        try {
            const resposta = await axios.get(springEndPoint + "/modelos/" + id, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async editarModelo(id, modeloObj) {
        try {
            const modelo = {
                "nome": modeloObj.nome,
                // "codigo": modeloObj.codigo, Modelo não tem mais codigo
                "idCategoria": modeloObj.idCategoria,
                "idTipo": modeloObj.idTipo

            }

            const resposta = await axios.put(springEndPoint + "/modelos/" + id, modelo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }

    static async modeloDelete(id) {
        try {

            const resposta = await axios.delete(springEndPoint + `/modelos/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    /*
    static async modeloDeleteByCodigo(codigo) {

        try {

            const resposta = await axios.delete(springEndPoint + `/modelos/codigo/${codigo}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    //Modelo nao tem mais codigo
    }*/

    static async modeloUpdate(id, /*codigo, Modelo nao tem mais codigo*/ nome, idCategoria, idTipo) {

        try {
            const modelo = {
                // "codigo": codigo, // Modelo nao tem mais codigo
                "nome": nome,
                "idCategoria": idCategoria,
                "idTipo": idTipo
            }

            const resposta = await axios.put(springEndPoint + `/modelos/${id}`, modelo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    /*
    static async modeloUpdateByCodigo(codigo nome, idCategoria, idTipo) {

        try {

            const modelo = {
                // "codigo": codigo, Modelo nao tem mais codigo
                "nome": nome,
                "idCategoria": idCategoria,
                "idTipo": idTipo
            }

            const resposta = await axios.put(springEndPoint + `/modelos/codigo/${codigo}`, modelo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    // Modelo nao tem mais codigo
    }*/

    static async modeloGetByFilter(modelo, categoria, tipo, lojaId) {
        let queryParams = [];

        if (modelo !== '') {
            queryParams.push(`modelo=${modelo}`);
        }
        if (categoria !== '') {
            queryParams.push(`categoria=${categoria}`);
        }
        if (tipo !== '') {
            queryParams.push(`tipo=${tipo}`);
        }
        if (lojaId !== '') {
            queryParams.push(`id_loja=${lojaId}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        try {
            const resposta = await axios.get(springEndPoint + `/modelos${queryString}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    // ***************************************************************************
    // *  TAMANHO
    // ***************************************************************************

    static async tamanhoCreate(numero) {

        try {
            const tamanho = {
                "numero": numero,
            }

            const resposta = await axios.put(springEndPoint + "/tamanhos", tamanho, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tamanhoGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/tamanhos", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tamanhoGetById(id) {

        try {

            const resposta = await axios.get(springEndPoint + `/tamanhos/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tamanhoDelete(id) {

        try {

            const resposta = await axios.delete(springEndPoint + `/tamanhos/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tamanhoUpdate(id, numero) {

        try {

            const tamanho = {
                "numero": numero
            }

            const resposta = await axios.put(springEndPoint + `/tamanhos/${id}`, tamanho, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    // ***************************************************************************
    // *  TIPO
    // ***************************************************************************

    static async tipoCreate(nome) {

        try {

            const tipo = {
                "nome": nome,
            }

            const resposta = await axios.post(springEndPoint + "/tipos", tipo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tipoGetAll() {

        try {

            const resposta = await axios.get(springEndPoint + "/tipos", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tipoGetById(id) {

        try {

            const resposta = await axios.get(springEndPoint + `/tipos/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tipoDelete(id) {

        try {

            const resposta = await axios.delete(springEndPoint + `/tipos/${id}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async tipoUpdate(id, nome) {

        try {
            const tipo = {
                "nome": nome
            }

            const resposta = await axios.put(springEndPoint + `/tipos/${id}`, tipo, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    // ***************************************************************************
    // *  TRANSFERENCIAS 
    // ***************************************************************************
    static async transferenciaGetAll() {

        try {
            const resposta = await axios.get(springEndPoint + "/transferencias", {
                headers: header
            });

            console.log(resposta);
            return resposta;
        } catch (erro) {
            return erro
        }
    }


    // ***************************************************************************
    // *  TIPO-PAGAMENTO
    // ***************************************************************************
    static async getTipoPagamento() {

        try {
            const resposta = await axios.get(springEndPoint + "/tiposPagamento", {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }

    static async getTipoPagamentoById(idPagamento) {
        try {
            const resposta = await axios.get(springEndPoint + `/tiposPagamento/${idPagamento}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }


    // ***************************************************************************
    // *  HISTORICO-PAGAMENTO
    // ***************************************************************************

    static async historicoProdutoGetAll() {

        try {

            const resposta = await axios.get(springEndPoint + "/historico-produtos", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async historicoProdutoGetById(idHistoricoProduto) {

        try {

            const resposta = await axios.get(springEndPoint + `/historico-produtos/${idHistoricoProduto}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async historicoProdutoByIdProdutoVenda(idProdutoVenda) {

        try {

            const resposta = await axios.get(springEndPoint + `/historico-produtos/produto-venda/${idProdutoVenda}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }


    // ***************************************************************************
    // *  CSV
    // ***************************************************************************

    static async getCsvUsuario() {
        const resposta = await axios.get(springEndPoint + "/csv/funcionarios-todas-as-loja", {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvUsuarioByLoja(idLoja) {
        const resposta = await axios.get(springEndPoint + `/csv/funcionarios-por-loja/${idLoja}`, {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvEstoque() {
        const resposta = await axios.get(springEndPoint + "/csv/estoque-geral", {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvEstoqueByLoja(idLoja) {
        const resposta = await axios.get(springEndPoint + `/csv/etp/estoque-por-loja/${idLoja}`, {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvModelos() {
        const resposta = await axios.get(springEndPoint + "/csv/modelos", {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvModelosByLoja(idLoja) {
        const resposta = await axios.get(springEndPoint + `/csv/modelos/${idLoja}`, {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvTransferencias() {
        const resposta = await axios.get(springEndPoint + "/csv/transferencias", {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvTransferenciasByLoja(idLoja) {
        const resposta = await axios.get(springEndPoint + `/csv/transferencias-por-loja/${idLoja}`, {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvHistoricoVendas() {
        const resposta = await axios.get(springEndPoint + "/csv/historico-vendas", {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }

    static async getCsvHistoricoVendasByLoja(idLoja) {
        const resposta = await axios.get(springEndPoint + `/csv/historico-vendas/${idLoja}`, {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }




    // ***************************************************************************
    // *  HISTORICO-PRODUTO
    // ***************************************************************************

    static async historicoProdutoGetAll() {

        try {

            const resposta = await axios.get(springEndPoint + "/historico-produtos", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async historicoProdutoGetById(idHistoricoProduto) {

        try {

            const resposta = await axios.get(springEndPoint + `/historico-produtos/${idHistoricoProduto}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async historicoProdutoByIdProdutoVenda(idProdutoVenda) {

        try {

            const resposta = await axios.get(springEndPoint + `/historico-produtos/produto-venda/${idProdutoVenda}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    // ***************************************************************************
    // *  PAGAMENTO
    // ***************************************************************************

    static async pagamentoGetAll() {

        try {

            const resposta = await axios.get(springEndPoint + "/pagamentos", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async pagamentoGetById(idPagamento) {

        try {

            const resposta = await axios.get(springEndPoint + `/pagamentos/${idPagamento}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async pagamentoCreate(idTipoPagamento, idVenda, valor, qtdParcelas) {

        try {

            const pagamento = {
                "idTipoPagamento": idTipoPagamento,
                "idVenda": idVenda,
                "valor": valor,
                "qtdParcelas": qtdParcelas,
            }

            const resposta = await axios.post(springEndPoint + `/pagamentos`, pagamento, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async getPagamentoFluxoCaixa(idVenda) {

        try {
            const resposta = await axios.get(springEndPoint + `/pagamentos/fluxo-pagamento/${idVenda}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    // ***************************************************************************
    // *  PRODUTO-VENDA
    // ***************************************************************************

    static async produtoVendaGetAll() {

        try {

            const resposta = await axios.get(springEndPoint + "/produto-vendas", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async produtoVendaGetById(idPagamento) {

        try {

            const resposta = await axios.get(springEndPoint + `/produto-vendas/${idPagamento}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async produtoVendaCreate(idTipoPagamento, idVenda, valor, qtdParcelas) {

        try {

            const pagamento = {
                "idTipoPagamento": idTipoPagamento,
                "idVenda": idVenda,
                "valor": valor,
                "qtdParcelas": qtdParcelas,
            }

            const resposta = await axios.post(springEndPoint + `/pagamentos/${idTipoPagamento}`, pagamento, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    // ***************************************************************************
    // *  VENDA
    // ***************************************************************************

    static async vendaGetAll() {

        try {

            const resposta = await axios.get(springEndPoint + "/vendas", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async vendaGetAllByLoja(idLoja) {

        try {
            const resposta = await axios.get(springEndPoint + `/vendas/filtro?id_loja=${idLoja}`, {
                headers: header
            });

            console.log(resposta);
            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async vendaGetAllByLojaPendente(idLoja) {

        try {
            const STATUS = "PENDENTE"
            const resposta = await axios.get(springEndPoint + `/vendas/filtro?id_loja=${idLoja}&statusVenda=${STATUS}`, {
                headers: header
            });

            console.log(resposta);
            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async vendaGetById(idPagamento) {

        try {

            const resposta = await axios.get(springEndPoint + `/vendas/${idPagamento}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async vendaDetalhamentoGetById(idVenda) {

        try {

            const resposta = await axios.get(springEndPoint + `/vendas/detalhamento/${idVenda}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async vendaCreate(desconto, tipoVendaId, codigoVendedor, produtoVendaReq) {

        const produtoMock = {
            "etpId": 1,
            "quantidade": 1,
            "desconto": 0
        }

        try {

            const vendaReq = {
                "desconto": desconto,
                "tipoVendaId": tipoVendaId,
                "codigoVendedor": codigoVendedor,
            }

            const venda = {
                vendaReq,
                "produtosVendaReq": produtoVendaReq
            }

            console.log(venda)

            const resposta = await axios.post(springEndPoint + `/vendas`, venda, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async detalhamentosVendas(idVenda) {

        try {

            const resposta = await axios.get(springEndPoint + `/vendas/detalhamento/${idVenda}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async pagamentoFinalizar(idVenda) {
        try {
            const resposta = await axios.patch(
                `${springEndPoint}/vendas/finalizar/${idVenda}`,
                null,
                { headers: header }
            );

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async qrCodePix(valorPix) {
        try {
            
            const resposta = await axios.get(
                `${springEndPoint}/pagamentos/qrCodePix?valorPix=${valorPix}`,
                { headers: header }
            );

            return resposta;

        } catch (erro) {
            return erro;
        }
    }

    static async vendaCancelar(idVenda) {

        try {

            const resposta = await axios.patch(springEndPoint + `/vendas/cancelar/${idVenda}`, null, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async vendaGetByFilter(dataInicio, dataFim, horaInicio, horaFim, vendedor, tipoVenda, status, lojaId) {
        let queryParams = [];

        const timeInicial = horaInicio + ":00";
        const timeFinal = horaFim + ":00"

        if (dataInicio !== '') {
            queryParams.push(`dataHoraInicio=${dataInicio}T${horaInicio === '' ? '00:00:00' : timeInicial}`);
        }
        if (dataFim !== '') {
            queryParams.push(`dataHoraFim=${dataFim}T${horaFim === '' ? '23:59:59' : timeFinal}`);
        }
        if (vendedor !== '') {
            queryParams.push(`id_vendedor=${vendedor}`);
        }
        if (tipoVenda !== '') {
            queryParams.push(`id_tipo_venda=${tipoVenda}`);
        }
        if (status !== '') {
            queryParams.push(`statusVenda=${status}`);
        }
        if (lojaId !== '') {
            queryParams.push(`id_loja=${lojaId}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        try {
            const resposta = await axios.get(`${springEndPoint}/vendas/filtro${queryString}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro;
        }
    }


    static async transferenciaGetByFilter(dataInicio, dataFim, horaInicio, horaFim, modelo, produto, tamanho, cor, status, lojaId) {
        let queryParams = [];

        if (dataInicio !== '') {
            queryParams.push(`dataInicio=${dataInicio}T${horaInicio === '' ? '00:00:00' : horaInicio}`);
        }
        if (dataFim !== '') {
            queryParams.push(`dataFim=${dataFim}T${horaFim === '' ? '23:59:59' : horaFim}`);
        }
        if (modelo !== '') {
            queryParams.push(`modelo=${modelo}`);
        }
        if (produto !== '') {
            queryParams.push(`produto=${produto}`);
        }
        if (status !== '') {
            queryParams.push(`status=${status}`);
        }
        if (tamanho !== '') {
            queryParams.push(`tamanho=${tamanho}`);
        }
        if (cor !== '') {
            queryParams.push(`cor=${cor}`);
        }
        if (lojaId !== '') {
            queryParams.push(`id_loja=${lojaId}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        try {
            const resposta = await axios.get(springEndPoint + `/transferencias/filtro${queryString}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async transferenciaGetByFilterLiberador(dataInicio, dataFim, horaInicio, horaFim, modelo, produto, tamanho, cor, status, lojaId) {
        let queryParams = [];

        if (dataInicio !== '') {
            queryParams.push(`dataInicio=${dataInicio}T${horaInicio === '' ? '00:00:00' : horaInicio}`);
        }
        if (dataFim !== '') {
            queryParams.push(`dataFim=${dataFim}T${horaFim === '' ? '23:59:59' : horaFim}`);
        }
        if (modelo !== '') {
            queryParams.push(`modelo=${modelo}`);
        }
        if (produto !== '') {
            queryParams.push(`produto=${produto}`);
        }
        if (status !== '') {
            queryParams.push(`status=${status}`);
        }
        if (tamanho !== '') {
            queryParams.push(`tamanho=${tamanho}`);
        }
        if (cor !== '') {
            queryParams.push(`cor=${cor}`);
        }
        if (lojaId !== '') {
            queryParams.push(`id_loja=${lojaId}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        try {
            const resposta = await axios.get(springEndPoint + `/transferencias/filtro/liberador${queryString}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async transferenciaCreate(requestBodyEtps) {
        console.log("requestBodyEtps na api request");
        console.log(requestBodyEtps);

        try {
            const resposta = await axios.post(springEndPoint + `/transferencias`, requestBodyEtps, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async transferenciaAprovar(idTransferencia, requestBody) {

        try {
            const resposta = await axios.post(springEndPoint + `/transferencias/${idTransferencia}/aprovar`, requestBody, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async transferenciaRejeitar(idTransferencia, requestBody) {

        try {

            const resposta = await axios.post(springEndPoint + `/transferencias/${idTransferencia}/rejeitar`, requestBody, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async getTransferenciaLoja(idLoja) {
        try {
            const resposta = await axios.get(springEndPoint + `/transferencias/filtro?id_loja=${idLoja}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }

    static async getTransferenciaLojaLiberador(idLoja) {
        const filtro = idLoja === 0 ? '' : `?id_loja=${idLoja}`

        try {
            const resposta = await axios.get(springEndPoint + `/transferencias/filtro/liberador${filtro}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return erro
        }
    }


    // ***************************************************************************
    // *  TIPO-VENDA
    // ***************************************************************************

    static async tipoVendaGetAll() {
        try {

            const resposta = await axios.get(springEndPoint + "/tiposVenda", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async tipoVendaGetById(idTipoVenda) {
        try {

            const resposta = await axios.get(springEndPoint + `/tiposVenda/${idTipoVenda}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async tipoVendaCreate(tipo, desconto, idTipoVenda) {
        try {

            const tipoVenda = {
                "tipo": tipo,
                "desconto": desconto
            }

            const resposta = await axios.put(springEndPoint + `/tiposVenda/${idTipoVenda}`, tipoVenda, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async tipoVendaUpdate(desconto, idTipoVenda) {
        try {

            const descontoConst = {
                "desconto": desconto
            }

            const resposta = await axios.patch(springEndPoint + `/tiposVenda/${idTipoVenda}`, descontoConst, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    // ***************************************************************************
    // *  AVISOS / ALERTAS
    // ***************************************************************************

    static async alertasGetAll() {
        try {

            const resposta = await axios.get(springEndPoint + "/alertas", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async alertasGetAllByLoja(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/alertas/loja/${idLoja}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async alertasGetByFilter(dataInicio, dataFim, horaInicio, horaFim, lojaId) {
        try {
            let queryParams = [];
            console.log("dataInicio: ", dataInicio);
            console.log("horaInicio: ", horaInicio);
            console.log("dataFim: ", dataFim);
            console.log("horaFim: ", horaFim);
            if (dataInicio !== '') {
                queryParams.push(`dataInicio=${dataInicio}T${horaInicio === '' ? '00:00:00' : horaInicio + ":00"}`);
            }
            if (dataFim !== '') {
                queryParams.push(`dataFim=${dataFim}T${horaFim === '' ? '23:59:59' : horaFim + ":00"}`);
            }
            if (lojaId !== '') {
                queryParams.push(`id_loja=${lojaId}`);
            }

            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            
            console.log(`${springEndPoint}/alertas/filtro${queryString}`)
            const resposta = await axios.get(springEndPoint + `/alertas/filtro${queryString}`, {
                headers: header
            });

            return resposta;
        } catch (erro) {
            return {
                status: erro.response.status,
                data: erro.response.data
            };
        }
    }


    // ***************************************************************************
    // *  DASHBOARDS Geral
    // ***************************************************************************

    static async kpisGetAll() {
        try {

            const resposta = await axios.get(springEndPoint + "/dashboards/dashboard-geral/kpis", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async faturamentoPorLoja() {
        try {

            const resposta = await axios.get(springEndPoint + "/dashboards/dashboard-geral/faturamento-por-loja", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async faturamentoPorLojamesAtual() {
        try {

            const resposta = await axios.get(springEndPoint + "/dashboards/dashboard-geral/faturamento-por-loja/mes-atual", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async GraficomodelosMaisVendidos() {
        try {

            const resposta = await axios.get(springEndPoint + "/dashboards/dashboard-geral/modelos-mais-vendido", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async GraficoFluxoEstoque() {
        try {

            const resposta = await axios.get(springEndPoint + "/dashboards/dashboard-geral/fluxo-estoque", {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }
    static async faturamentoMesVigenteFuncionario(idFuncionario) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idFuncionario}/faturamento-mes-atual`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    // ***************************************************************************
    // *  DASHBOARDS Loja
    // ***************************************************************************

    static async kpisGetAllDashLoja(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-loja/${idLoja}/kpis`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async faturamentoPorLojaDashLoja(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-loja/${idLoja}/faturamento-por-loja`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async faturamentoPorLojamesAtualDashLoja(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-loja/${idLoja}/faturamento-por-loja/mes-atual`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async GraficomodelosMaisVendidosDashLoja(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-loja/${idLoja}/modelos-mais-vendido`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async GraficoFluxoEstoqueDashLoja(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-loja/${idLoja}/fluxo-estoque`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async rankingFuncionarios(idLoja) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-loja/${idLoja}/ranking-funcionarios`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }



    // ***************************************************************************
    // *  DASHBOARDS func
    // ***************************************************************************

    static async kpisGetAllDashFunc(idUser) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idUser}/kpis`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async faturamentoPorLojaDashFunc(idUser) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idUser}/faturamento`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async faturamentoPorLojamesAtualDashFunc(idUser) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idUser}/faturamento-mes-atual`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async GraficomodelosMaisVendidosDashFunc(idUser) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idUser}/modelos-mais-vendido`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }


    static async GraficoItensVendidosDashFunc(idUser) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idUser}/totais-de-itens-vendidos`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async GraficoItensVendidosMesAtualDashFunc(idUser) {
        try {

            const resposta = await axios.get(springEndPoint + `/dashboards/dashboard-funcionario/${idUser}/totais-de-itens-vendidos/mes-atual`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    // ***************************************************************************
    // *  RELATORIO
    // ***************************************************************************

    static async relatorioGetModelosMaisVendidosByQtdDias(qtdDias) {

        try {

            const resposta = await axios.get(springEndPoint + `/relatorios/secao-vendas/modelos-mais-vendidos?qtdDias=${qtdDias}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async relatorioGetResumoGeral(qtdDias) {

        try {

            const resposta = await axios.get(springEndPoint + `/relatorios/secao-resumo/resumo-geral?qtdDias=${qtdDias}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async relatorioRankingVendas(qtdDias) {

        try {

            const resposta = await axios.get(springEndPoint + `/relatorios/secao-funcionarios/ranking-vendas?qtdDias=${qtdDias}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async relatorioProdutosAcabando() {

        try {

            const resposta = await axios.get(springEndPoint + `/relatorios/secao-estoque/produtos-acabando`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }

    static async relatorioFluxoEstoque(qtdDias) {

        try {

            const resposta = await axios.get(springEndPoint + `/relatorios/secao-estoque/fluxo-estoque?qtdDias=${qtdDias}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }
    }
}


export default ApiRequest;