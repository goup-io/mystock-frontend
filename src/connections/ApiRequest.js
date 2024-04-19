
const springEndPoint = "https://6619af63125e9bb9f29a8f26.mockapi.io/produtos/users";

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if the cookie by that name does not exist
    return null;
}

export class ApiRequest{

    static async userLogin(email, senha){

        const usuario = {
            "user" : email,
            "senha" : senha,
        }

        const resposta = await fetch(springEndPoint, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(usuario),
        });

        if(resposta.status == 200){
            document.cookie = `token=${resposta.json().token}; loja=${resposta.json().loja}`
            return resposta.status
        }

        return resposta.status();
    }

    static async lojaEstoque(){
        var resposta = await fetch(springEndPoint, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie("token")}`
            } 
        });
        
    }
}

export default ApiRequest;