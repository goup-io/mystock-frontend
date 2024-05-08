import axios from 'axios'

const springEndPoint = "http://localhost:8080";

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

        console.log("entrou aqui na login")

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

        const resposta = await axios.get(springEndPoint + "/lojas", {
            headers: header
        });

        return resposta;
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
        console.log(funcionario);
        const resposta = await axios.post(springEndPoint + "/usuarios", funcionario, {
            headers: header,
        });

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

    static async userUpdate(id, nome, idCargo, email, telefone, idLoja) {

        try {
            const funcionario = {
                "nome": nome,
                "email": email,
                "telefone": telefone,
                "idCargo": idCargo,
                "idLoja": idLoja
            }

            const resposta = await axios.put(springEndPoint + `/usuarios/${id}`, funcionario, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
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
                "idTamanho": produtoObj.idTamanho,
                "nome": produtoObj.nome,
                "valorCusto": produtoObj.precoC,
                "valorRevenda": produtoObj.precoR
            }

            const resposta = await axios.post(springEndPoint + "/produtos", produto, {
                headers: header,
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async produtoGetAll() {

        try {
            const resposta = await axios.post(springEndPoint + "/produtos", {
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

    static async modeloCreate(codigo, nome, idCategoria, idTipo) {

        try {
            const modelo = {
                "codigo": codigo,
                "nome": nome,
                "idCategoria": idCategoria,
                "idTipo": idTipo
            }

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

    static async modeloGetByCodigo(codigo) {

        try {
            const resposta = await axios.get(springEndPoint + `/modelos/codigo/${codigo}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
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

    static async modeloDeleteByCodigo(codigo) {

        try {

            const resposta = await axios.delete(springEndPoint + `/modelos/codigo/${codigo}`, {
                headers: header
            });

            return resposta;

        } catch (erro) {
            return erro
        }

    }

    static async modeloUpdate(id, codigo, nome, idCategoria, idTipo) {

        try {
            const modelo = {
                "codigo": codigo,
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

    static async modeloUpdateByCodigo(codigo, nome, idCategoria, idTipo) {

        try {

            const modelo = {
                "codigo": codigo,
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


    // static async lojaEstoque(){
    //     var resposta = await fetch(springEndPoint, {
    //         method : "GET",
    //         headers : {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${Cookie.getCookie("token")}`
    //         } 
    //     });

    // }


    // ***************************************************************************
    // *  CSV
    // ***************************************************************************

    static async getCsvUsuario(options = {}) {
        const resposta = await axios.get("http://" + springEndPoint + "/csv/todosUsuarios", {
            headers: header,
            responseType: 'arraybuffer', // Add this line
        });

        return resposta;
    }
}

export default ApiRequest;