import Cookie from './Cookie.js'
import axios from 'axios'

const springEndPoint = "https://mystock-spring-mystock-spring.azuremicroservices.io";

var header = {     
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}

export class ApiRequest{
    
// ***************************************************************************
// *  LOGIN
// ***************************************************************************


    static async userLogin(email, senha){

        const usuario = {
            "user" : email,
            "senha" : senha,
        }

        console.log("entrou aqui na login")
        
        const resposta = await axios.post(springEndPoint + "/auth/login", usuario);


        if(resposta.status === 200){
            const data = JSON.stringify(resposta);
            localStorage.setItem("token", data.token)
            return resposta
        }

        return resposta;
    }

    static async userLogout(){
        const resposta = await fetch(springEndPoint + "/auth/logout", {
            method : "POST",
            headers : {     
            "Content-Type": "application/json",
            }
        });
        
        if(resposta.status ==  200){
            Cookie.setCookie("token", "")
        }

        return resposta
    }
    
    static async userCreate(user, senha, userId){
        
        const usuario = {
            "user": user,
            "senha" : senha,
            "userId" : userId
        }

        const resposta = await fetch(springEndPoint + "/auth/register/user", {
            method : "POST",
            headers : {     
            "Content-Type": "application/json",
            },
            body : JSON.stringify(usuario),
        });

        return resposta;
    }

    static async lojaCreate(user, senha, idAcessoLoja, idLoja){
        
        const loja = {
            "user" : user,
            "senha" : senha,
            "idAcessoLoja" : idAcessoLoja,
            "idLoja" : idLoja
        }

        const resposta = await fetch(springEndPoint + "/auth/register/loja", {
            method : "POST",
            headers : {     
            "Content-Type": "application/json",
            },
            body : JSON.stringify(loja),
        });

        return resposta;
    }

// ***************************************************************************
// *  USUARIO
// ***************************************************************************    

    static async userCreate(nome, idCargo, email, telefone, idLoja){

        const funcionario = {
            "nome": nome,
            "idCargo": idCargo,
            "email": email,
            "telefone": telefone,
            "idLoja": idLoja,
        }

        const resposta = await fetch(springEndPoint + "/usuarios", {
            method : "POST",
            headers : header,
            body : JSON.stringify(funcionario),
        });

        return resposta;
    }

    static async userDelete(id){

        const resposta = await fetch(springEndPoint + `/usuarios/${id}`, {
            method : "DELETE",
            headers : header,
        });

        return resposta;
    }

    static async userUpdate(id, nome, idCargo, email, telefone, idLoja){
        const funcionario = {
            "nome": nome,
            "email": email,
            "telefone": telefone,
            "idCargo": idCargo,
            "idLoja": idLoja
        }

        const resposta = await fetch(springEndPoint + `/usuarios/${id}`, {
            method : "PUT",
            headers : header,
        });

        return resposta;
    }

// ***************************************************************************
// *  CARGO
// ***************************************************************************

    static async cargoCreate(nome, descricao){
        
    const cargo = {
        "nome" : nome,
        "descricao" : descricao,
    }

    const resposta = await fetch(springEndPoint + "/cargos", {
        method : "POST",
        headers : header,
        body : JSON.stringify(cargo),
    });

    return resposta;
    }

    static async cargoGetAll(){
    const resposta = await fetch(springEndPoint + "/cargos", {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async cargoGetById(id){
        const resposta = await fetch(springEndPoint + `/cargos/${id}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async cargoDelete(id){
        const resposta = await fetch(springEndPoint + `/cargos/${id}`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async cargoUpdate(id, nome, descricao){

        const cargo = {
            "nome" : nome,
            "descricao" : descricao,
        }

        const resposta = await fetch(springEndPoint + `/cargos/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(cargo),
        });

        return resposta;
    }

    static async cargoUpdateDescricao(id, descricao){

        const cargo = {
            "descricao" : descricao,
        }

        const resposta = await fetch(springEndPoint + `/cargos/descricao/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(cargo),
        });

        return resposta;
    }

// ***************************************************************************
// *  PRODUTO
// ***************************************************************************
    
    static async produtoCreate(idCor, idModelo, valorCusto, valorRevenda){

        const produto = {
            "idCor": idCor,
            "idModelo": idModelo,
            "valorCusto": valorCusto,
            "valorRevenda": valorRevenda
        }

        const resposta = await fetch(springEndPoint + "/produtos", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(produto),
        });

        return resposta;
    }

    static async produtoGetAll(){
        const resposta = await fetch(springEndPoint + "/produtos", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async produtoGetById(id, idCor, idModelo){

        var query = "";

        if(id != undefined){
            query += `id=${id}`;
        }

        if(idCor != undefined){
            if(query != ""){
                query += "&"
            }
            query += `idCor=${id}`;
        }

        if(idModelo != undefined){
            if(query != ""){
                query += "&"
            }
            query += `idModelo=${id}`;
        }

        var resposta = await fetch(springEndPoint + `/produtos/especifico?${query}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

// ***************************************************************************
// *  COR
// ***************************************************************************

    static async corCreate(nome){
        
        const cor = {
            "nome" : nome,
        }

        const resposta = await fetch(springEndPoint + "/cores", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(cor),
        });

        return resposta;
    }
    
    static async corGetAll(){
        const resposta = await fetch(springEndPoint + "/cores", {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async corGetById(id){
        const resposta = await fetch(springEndPoint + `/cores/${id}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }
    
    static async corDelete(id){
        const resposta = await fetch(springEndPoint + `/cores/${id}`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async corUpdate(id, nome){

        const cor = {
            "nome" : nome
        }

        const resposta = await fetch(springEndPoint + `/cores/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(cor),
        });

        return resposta;
    }

// ***************************************************************************
// *  CATEGORIA
// ***************************************************************************

    static async categoriaCreate(nome){
        
    const categoria = {
        "nome" : nome,
    }

    const resposta = await fetch(springEndPoint + "/categorias", {
        method : "POST",
        headers : header,
        body : JSON.stringify(categoria),
    });

    return resposta;
    }

    static async categoriaGetAll(){
    const resposta = await fetch(springEndPoint + "/categorias", {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async categoriaGetById(id){
    const resposta = await fetch(springEndPoint + `/categorias/${id}`, {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async categoriaDelete(id){
    const resposta = await fetch(springEndPoint + `/categorias/${id}`, {
        method : "DELETE",
        headers : header
    });

    return resposta;
    }

    static async categoriaUpdate(id, nome){

    const categoria = {
        "nome" : nome
    }

    const resposta = await fetch(springEndPoint + `/categorias/${id}`, {
        method : "PUT",
        headers : header,
        body : JSON.stringify(categoria),
    });

    return resposta;
    }

// ***************************************************************************
// *  MODELO
// ***************************************************************************  

    static async modeloCreate(codigo, nome, idCategoria, idTipo){
            
        const modelo = {
            "codigo" : codigo,
            "nome" : nome,
            "idCategoria": idCategoria,
            "idTipo" : idTipo
        }

        const resposta = await fetch(springEndPoint + "/modelos", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(modelo),
        });

        return resposta;
    }

    static async modeloGetAll(){
        const resposta = await fetch(springEndPoint + "/modelos", {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async modeloGetById(id){
        const resposta = await fetch(springEndPoint + `/modelos/${id}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async modeloGetByCodigo(codigo){
        const resposta = await fetch(springEndPoint + `/modelos/codigo/${codigo}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async modeloDelete(id){
        const resposta = await fetch(springEndPoint + `/modelos/${id}`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async modeloDeleteByCodigo(codigo){
        const resposta = await fetch(springEndPoint + `/modelos/codigo/${codigo}`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta;
    }

    static async modeloUpdate(id, codigo, nome, idCategoria, idTipo){

        const modelo = {
            "codigo" : codigo,
            "nome" : nome,
            "idCategoria": idCategoria,
            "idTipo" : idTipo
        }

        const resposta = await fetch(springEndPoint + `/modelos/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(modelo),
        });

        return resposta;
    }

    static async modeloUpdateByCodigo(codigo, nome, idCategoria, idTipo){

        const modelo = {
            "codigo" : codigo,
            "nome" : nome,
            "idCategoria": idCategoria,
            "idTipo" : idTipo
        }

        const resposta = await fetch(springEndPoint + `/modelos/codigo/${codigo}`, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(modelo),
        });

        return resposta;
    }


// ***************************************************************************
// *  TAMANHO
// ***************************************************************************

    static async tamanhoCreate(numero){
        
    const tamanho = {
        "numero" : numero,
    }

    const resposta = await fetch(springEndPoint + "/tamanhos", {
        method : "POST",
        headers : header,
        body : JSON.stringify(tamanho),
    });

    return resposta;
    }

    static async tamanhoGetAll(){
    const resposta = await fetch(springEndPoint + "/tamanhos", {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async tamanhoGetById(id){
    const resposta = await fetch(springEndPoint + `/tamanhos/${id}`, {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async tamanhoDelete(id){
    const resposta = await fetch(springEndPoint + `/tamanhos/${id}`, {
        method : "DELETE",
        headers : header
    });

    return resposta;
    }

    static async tamanhoUpdate(id, numero){

    const tamanho = {
        "numero" : numero
    }

    const resposta = await fetch(springEndPoint + `/tamanhos/${id}`, {
        method : "PUT",
        headers : header,
        body : JSON.stringify(tamanho),
    });

    return resposta;
    }

// ***************************************************************************
// *  TIPO
// ***************************************************************************

    static async tipoCreate(nome){
        
    const tipo = {
        "nome" : nome,
    }

    const resposta = await fetch(springEndPoint + "/tipos", {
        method : "POST",
        headers : header,
        body : JSON.stringify(tipo),
    });

    return resposta;
    }

    static async tipoGetAll(){
    const resposta = await fetch(springEndPoint + "/tipos", {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async tipoGetById(id){
    const resposta = await fetch(springEndPoint + `/tipos/${id}`, {
        method : "GET",
        headers : header
    });

    return resposta;
    }

    static async tipoDelete(id){
    const resposta = await fetch(springEndPoint + `/tipos/${id}`, {
        method : "DELETE",
        headers : header
    });

    return resposta;
    }

    static async tipoUpdate(id, nome){

    const tipo = {
        "nome" : nome
    }

    const resposta = await fetch(springEndPoint + `/tipos/${id}`, {
        method : "PUT",
        headers : header,
        body : JSON.stringify(tipo),
    });

    return resposta;
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
}

export default ApiRequest;