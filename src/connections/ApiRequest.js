import Cookie from './Cookie.js'

const springEndPoint = "https://mystock-spring-mystock-spring.azuremicroservices.io";

export class ApiRequest{


// ***************************************************************************
// *  LOGIN
// ***************************************************************************
    static async userLogin(email, senha){

        const usuario = {
            "user" : email,
            "senha" : senha,
        }
        
        const resposta = await fetch(springEndPoint + "/auth/login", {
            method : "POST",
            headers : {     
            "Content-Type": "application/json",
            },
            body : JSON.stringify(usuario),
        });


        if(resposta.status === 200){
            const data = await resposta.json();
            document.cookie = `token=${data.token}; loja=${data.loja}`
            return resposta.status
        }

        return resposta.status;
    }

    static async userLogout(){
        const resposta = await fetch(springEndPoint + "/auth/logout", {
            method : "POST",
            headers : {     
            "Content-Type": "application/json",
            }
        });

        return resposta.status
    }
    
    // static async userLogout(){

    // }

    // static async userLogout(){
        
    // }

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
            headers : {     
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
            body : JSON.stringify(funcionario),
        });

        return resposta.status;
    }

    static async userDelete(id){

        const resposta = await fetch(springEndPoint + `/usuarios/${id}`, {
            method : "DELETE",
            headers : {     
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
        });

        return resposta.status;
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
            headers : {     
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
            },
        });

        return resposta.status;
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
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(cargo),
    });

    return resposta.status;
    }

    static async cargoGetAll(){
    const resposta = await fetch(springEndPoint + "/cargos", {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
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

        return resposta.status;
    }

    static async cargoUpdate(id, nome){

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

        return resposta.status;
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

        return resposta.status;
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

        return resposta.status;
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

        return resposta.status;
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

        return resposta.status;
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

        return resposta.status;
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
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(categoria),
    });

    return resposta.status;
    }

    static async categoriaGetAll(){
    const resposta = await fetch(springEndPoint + "/categorias", {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta;
    }

    static async categoriaGetById(id){
    const resposta = await fetch(springEndPoint + `/categorias/${id}`, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta;
    }

    static async categoriaDelete(id){
    const resposta = await fetch(springEndPoint + `/categorias/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta.status;
    }

    static async categoriaUpdate(id, nome){

    const categoria = {
        "nome" : nome
    }

    const resposta = await fetch(springEndPoint + `/categorias/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(categoria),
    });

    return resposta.status;
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

        return resposta.status;
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

        return resposta.status;
    }

    static async modeloDeleteByCodigo(codigo){
        const resposta = await fetch(springEndPoint + `/modelos/codigo/${codigo}`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });

        return resposta.status;
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

        return resposta.status;
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

        return resposta.status;
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
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(tamanho),
    });

    return resposta.status;
    }

    static async tamanhoGetAll(){
    const resposta = await fetch(springEndPoint + "/tamanhos", {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta;
    }

    static async tamanhoGetById(id){
    const resposta = await fetch(springEndPoint + `/tamanhos/${id}`, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta;
    }

    static async tamanhoDelete(id){
    const resposta = await fetch(springEndPoint + `/tamanhos/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta.status;
    }

    static async tamanhoUpdate(id, numero){

    const tamanho = {
        "numero" : numero
    }

    const resposta = await fetch(springEndPoint + `/tamanhos/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(tamanho),
    });

    return resposta.status;
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
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(tipo),
    });

    return resposta.status;
    }

    static async tipoGetAll(){
    const resposta = await fetch(springEndPoint + "/tipos", {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta;
    }

    static async tipoGetById(id){
    const resposta = await fetch(springEndPoint + `/tipos/${id}`, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta;
    }

    static async tipoDelete(id){
    const resposta = await fetch(springEndPoint + `/tipos/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    });

    return resposta.status;
    }

    static async tipoUpdate(id, nome){

    const tipo = {
        "nome" : nome
    }

    const resposta = await fetch(springEndPoint + `/tipos/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        },
        body : JSON.stringify(tipo),
    });

    return resposta.status;
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