import Cookie from './Cookie.js'

const springEndPoint = "https://mystock-spring-mystock-spring.azuremicroservices.io";

export class ApiRequest{

    static async userLogin(email, senha){

        const usuario = {
            "user" : email,
            "senha" : senha,
        }
        
        console.log(usuario);

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


    static async lojaEstoque(){
        var resposta = await fetch(springEndPoint, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            } 
        });
        
    }
}

export default ApiRequest;