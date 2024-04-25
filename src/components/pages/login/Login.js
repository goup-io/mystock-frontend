import Input from '../../inputs/Inputs.js';
import ButtonEnter from '../../buttons/buttonEnter.js';
import myStockLogo from '../../../assets/loginPage/Group 88.svg';
import dots01 from '../../../assets/loginPage/dots01.svg';
import dots02 from '../../../assets/loginPage/dots02.svg';
import goUpLogo from '../../../assets/loginPage/Group 89.svg';

import userIcon from '../../../assets/icons/userIcon.svg'
import lockIcon from '../../../assets/icons/lockIcon.svg'
import ApiRequest from '../../../connections/ApiRequest.js'

import { json, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState(""); 
    const [senha, setSenha] = useState(""); 

    async function handleClick() {
        
        const respostaHTTP = await ApiRequest.userLogin(email, senha);
        
        console.log(respostaHTTP);

        if(respostaHTTP == 200){
            alert("Deu certo")
            navigate("/menu")
        }
    }

    function handleInput(evento, stateFunction){

        stateFunction(evento.target.value);
    }

    return(
        <section class="flex flex-col items-center justify-center h-[100vh]">
            <img class="absolute top-4 left-0" src={`${myStockLogo}`}></img>
            <img class="absolute right-8 top-5" src={`${dots01}`}></img>
            <div class="bg-indigo-100 rounded-[0.3125rem] w-[42rem] h-[44rem] flex flex-col justify-evenly items-center shadow-lg z-10">
                <div class="mt-[3.25rem] flex flex-col items-center">
                    <h1 class="text-[2.5rem] font-medium">Bem-Vindo de Volta!</h1>
                    <p class="text-[1.56rem] w-3/4">Faça o login para ter acesso ao seu sistema de vendas e estoque!</p>
                </div>
                
                <div class="flex flex-col items-start mb-[0.5rem]">
                    <p class="form-floating text-[1.56rem] text-black">Usuário:</p>
                    <Input 
                        id="inputEmail"
                        handleInput={handleInput}
                        type="text"
                        handlerAtributeChanger={setEmail}
                        icon={`${userIcon}`}
                        value={email}
                        placeholder="seu@email.com"
                    ></Input>
                </div>
                <div class="flex flex-col items-start mb-[2.56rem]">
                    <p class="text-[1.56rem]">Senha:</p>
                    <Input
                        id="inputSenha"
                        handleInput={handleInput}
                        handlerAtributeChanger={setSenha}
                        value={senha}
                        type="password"
                        icon={lockIcon}
                        placeholder="*******"
                    ></Input>
                </div>  
                <ButtonEnter funcao={handleClick}>Entrar</ButtonEnter>
                <div class=" mb-[2.69rem] mt-[0.6rem]">
                    <a class="text-[1.56rem]" href="">Esqueci a senha</a>
                </div>
                <div class="mb-[1.69rem]">
                    <p class="text-[1.56rem]">Não tem acesso ao nosso sistema?</p>
                    <a class="text-[1.56rem] underline" href="">Entre em contato conosco!</a>   
                </div>
            </div>
            <img class="absolute bottom-0 left-0" src={`${dots02}`}></img>
            <img class="absolute bottom-0 right-0" src={`${goUpLogo}`}></img>
        </section>
    )
}

export default Login;