import Cookie from './Cookie.js'
import axios from 'axios'

const springEndPoint = "http://localhost:8080";

var header = {     
    "Content-Type": "application/json",
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoZW50aWNhdGlvbiIsInN1YiI6InRlc3RlIiwiaWQiOjEsImV4cCI6MTcxNDMyMjExOH0.TjQ8MWgc3ZUSiougLOXSxNRHIaZFqn7aOu4kVlTUK3g`
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
        const resposta = await axios.post(springEndPoint + "/auth/logout");
        
        if(resposta.status ==  200){
            localStorage.setItem("token", "")
        }

        return resposta
    }
    
    static async loginCreate(user, senha, userId){
        
        const usuario = {
            "user": user,
            "senha" : senha,
            "userId" : userId
        }

        const resposta = await axios.post(springEndPoint + "/auth/register/user", usuario);

        return resposta;
    }

    // ***************************************************************************
// *  LOJA
// ***************************************************************************   

    static async lojaCreate(user, senha, idAcessoLoja, idLoja){
        
        const loja = {
            "user" : user,
            "senha" : senha,
            "idAcessoLoja" : idAcessoLoja,
            "idLoja" : idLoja
        }

        const resposta = await axios.post(springEndPoint + "/auth/register/loja", loja);

        return resposta;
    }

    static async lojaGetAll(){

        const resposta = await axios.get(springEndPoint + "/lojas", {
            headers : header
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

        const resposta = await axios.post(springEndPoint + "/usuarios", funcionario, {
            headers : header,
        });

        return resposta;
    }

    static async userDelete(id){

        const resposta = await axios.delete(springEndPoint + `/usuarios/${id}`, {
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

        const resposta = await axios.put(springEndPoint + `/usuarios/${id}`, funcionario, {
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

        const resposta = await axios.post(springEndPoint + "/cargos", cargo, {
            headers : header,
        });

        return resposta;
    }

    static async cargoGetAll(){

        const resposta = await axios.get(springEndPoint + "/cargos", {
            headers : header
        });

        return resposta;
    }

    static async cargoGetById(id){
        const resposta = await axios.get(springEndPoint + `/cargos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async cargoDelete(id){
        const resposta = await axios.delete(springEndPoint + `/cargos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async cargoUpdate(id, nome, descricao){

        const cargo = {
            "nome" : nome,
            "descricao" : descricao,
        }

        const resposta = await axios.put(springEndPoint + `/cargos/${id}`, cargo, {
            headers : header,
        });

        return resposta;
    }

    static async cargoUpdateDescricao(id, descricao){

        const cargo = {
            "descricao" : descricao,
        }

        const resposta = await axios.put(springEndPoint + `/cargos/descricao/${id}`, cargo, {
            headers : header
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

        const resposta = await  axios.post(springEndPoint + "/produtos", produto, {
            headers : header,
        });

        return resposta;
    }

    static async produtoGetAll(){
        const resposta = await axios.post(springEndPoint + "/produtos", {
            headers : header
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

        var resposta = await axios.get(springEndPoint + `/produtos/especifico?${query}`, {
            headers : header
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

        const resposta = await axios.post(springEndPoint + "/cores", cor, {
            headers : header,
        });

        return resposta;
    }
    
    static async corGetAll(){
        const resposta = await axios.get(springEndPoint + "/cores", {
            headers : header
        });

        return resposta;
    }

    static async corGetById(id){
        const resposta = await axios.get(springEndPoint + `/cores/${id}`, {
            method : "GET",
            headers : header
        });

        return resposta;
    }
    
    static async corDelete(id){
        const resposta = await axios.delete(springEndPoint + `/cores/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async corUpdate(id, nome){

        const cor = {
            "nome" : nome
        }

        const resposta = await axios.put(springEndPoint + `/cores/${id}`, cor, {
            headers : header,
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

        const resposta = await axios.post(springEndPoint + "/categorias", categoria, {
            headers : header,
        });

    return resposta;
    }

    static async categoriaGetAll(){
        const resposta = await axios.get(springEndPoint + "/categorias", {
            headers : header
        });

    return resposta;
    }

    static async categoriaGetById(id){
        const resposta = await axios.get(springEndPoint + `/categorias/${id}`, {
            headers : header
        });

    return resposta;
    }

    static async categoriaDelete(id){
        const resposta = await axios.delete(springEndPoint + `/categorias/${id}`, {
            headers : header
        });

    return resposta;
    }

    static async categoriaUpdate(id, nome){

        const categoria = {
            "nome" : nome
        }

        const resposta = await axios.put(springEndPoint + `/categorias/${id}`, categoria, {
            headers : header,
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

        const resposta = await axios.post(springEndPoint + "/modelos", modelo, {
            headers : header,
        });

        return resposta;
    }

    static async modeloGetAll(){
        const resposta = await axios.get(springEndPoint + "/modelos", {
            headers : header
        });

        return resposta;
    }

    static async modeloGetById(id){
        const resposta = await axios.get(springEndPoint + `/modelos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async modeloGetByCodigo(codigo){
        const resposta = await axios.get(springEndPoint + `/modelos/codigo/${codigo}`, {
            headers : header
        });

        return resposta;
    }

    static async modeloDelete(id){
        const resposta = await axios.delete(springEndPoint + `/modelos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async modeloDeleteByCodigo(codigo){
        const resposta = await axios.delete(springEndPoint + `/modelos/codigo/${codigo}`, {
            headers : header
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

        const resposta = await axios.put(springEndPoint + `/modelos/${id}`, modelo, {
            headers : header,
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

        const resposta = await axios.put(springEndPoint + `/modelos/codigo/${codigo}`, modelo, {
            headers : header,
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

        const resposta = await axios.put(springEndPoint + "/tamanhos", tamanho, {
            headers : header,
        });

        return resposta;
    }

    static async tamanhoGetAll(){
        const resposta = await axios.get(springEndPoint + "/tamanhos", {
            headers : header
        });

        return resposta;
    }

    static async tamanhoGetById(id){
        const resposta = await axios.get(springEndPoint + `/tamanhos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async tamanhoDelete(id){
        const resposta = await axios.delete(springEndPoint + `/tamanhos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async tamanhoUpdate(id, numero){

        const tamanho = {
            "numero" : numero
        }

        const resposta = await axios.put(springEndPoint + `/tamanhos/${id}`, tamanho, {
            headers : header,
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

        const resposta = await axios.post(springEndPoint + "/tipos", tipo, {
            headers : header,
        });

        return resposta;
    }

    static async tipoGetAll(){
        const resposta = await axios.get(springEndPoint + "/tipos", {
            headers : header
        });

        return resposta;
    }

    static async tipoGetById(id){
        const resposta = await axios.get(springEndPoint + `/tipos/${id}`, {
            headers : header
        });

    return resposta;
    }

    static async tipoDelete(id){
        const resposta = await axios.delete(springEndPoint + `/tipos/${id}`, {
            headers : header
        });

        return resposta;
    }

    static async tipoUpdate(id, nome){

        const tipo = {
            "nome" : nome
        }

        const resposta = await axios.put(springEndPoint + `/tipos/${id}`, tipo, {
            headers : header,
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