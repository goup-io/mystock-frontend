
const springEndPoint = "https://6619af63125e9bb9f29a8f26.mockapi.io/produtos/users";

export class ApiRequest{

    static async userLogin(email, senha){

        const usuario = {
            "user" : email,
            "senha" : senha,
        }

        var resposta = await fetch(springEndPoint, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(usuario),
        });

        if(resposta.status == 200){
            document.cookie = `token=${resposta.text}`
            return resposta.status
        }

        return resposta.status();
    }

    static async lojaEstoque(){
        var resposta = await fetch(springEndPoint);
        
    }
}

export default ApiRequest;