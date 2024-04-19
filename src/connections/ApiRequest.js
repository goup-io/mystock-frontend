export class ApiRequest{

    static async userLogin(email, senha){
        var resposta = await fetch("https://6619af63125e9bb9f29a8f26.mockapi.io/produtos/users");

        return resposta.status();
    }

    static async lojaEstoque(){
        var resposta = await fetch("https://6619af63125e9bb9f29a8f26.mockapi.io/produtos/users");
        
    }
}

export default ApiRequest;