import Input from '../../inputs/Inputs.js';
import ButtonEnter from '../../buttons/buttonEnter.js';
import myStockLogo from '../../../assets/loginPage/Group 88.svg';
import dots01 from '../../../assets/loginPage/dots01.svg';
import dots02 from '../../../assets/loginPage/dots02.svg';
import goUpLogo from '../../../assets/loginPage/Group 89.svg';

import userIcon from '../../../assets/icons/userIcon.svg'
import lockIcon from '../../../assets/icons/lockIcon.svg'
import ApiRequest from '../../../connections/ApiRequest.js'

import Alert from '../../alerts/Alert.js';
import ErrorImage from '../../../assets/icons/error.svg'
import SucessImage from '../../../assets/icons/sucess.svg'


//Hooks
import { json, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleClick(event) {

        event.preventDefault()
        if (email === "" || email === null || email === undefined) {
            Alert.alert(ErrorImage, "Informe o seu e-mail")
            return
        }

        if (senha === "" || senha === null || senha === undefined) {
            Alert.alert(ErrorImage, "Informe a sua senha")
            return
        }

        const respostaHTTP = await ApiRequest.userLogin(email, senha);

        console.log(respostaHTTP);
        
        if(respostaHTTP.status === 200){
            const data = respostaHTTP.data.token;
            localStorage.setItem("token", data)
            Alert.alertTimer(SucessImage, "Seja bem-vindo!");
            navigate("/menu")
        }
        
        if(respostaHTTP.status === 403){
            Alert.alert(ErrorImage, "Credenciais inválidas");
        }

    }

    function handleInput(evento, stateFunction) {

        stateFunction(evento.target.value);
    }

    return (
        <section class="flex flex-col items-center justify-center h-[100vh]">
            <img class="absolute top-4 left-0" src={`${myStockLogo}`}></img>
            <img class="absolute right-8 top-5" src={`${dots01}`}></img>
            <div class="bg-indigo-100 rounded-[0.3125rem] w-[35vw] h-min-[75vh] flex flex-col justify-evenly items-center shadow-lg z-10">
                <div class="mt-[3.25rem] flex flex-col items-center">
                    <h1 class="text-[2rem] font-medium">Bem-Vindo de Volta!</h1>
                    <p class="text-[1.2rem] w-3/4">Faça o login para ter acesso ao seu sistema de vendas e estoque!</p>
                </div>

                <form>
                    <div class="flex flex-col items-start mb-[0.5rem]">
                        <p class="form-floating text-[1.06rem] text-black mb-[0.5rem]">Usuário:</p>
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
                    <div class="flex flex-col items-start mb-[2.1rem]">
                        <p class="text-[1.06rem] mb-[0.5rem]">Senha:</p>
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
                    <ButtonEnter funcao={(event) => handleClick(event)}>Entrar</ButtonEnter>
                </form>
                <div class=" mb-[1rem] mt-[0.6rem]">
                    <a class="text-[1.2rem]" href="">Esqueci a senha</a>
                </div>
                <div class="mb-[1rem]">
                    <p class="text-[1.2rem]">Não tem acesso ao nosso sistema?</p>
                    <a class="text-[1.2rem] underline" href="">Entre em contato conosco!</a>
                </div>
            </div>
            <img class="absolute bottom-0 left-0" src={`${dots02}`}></img>
            <img class="absolute bottom-0 right-0" src={`${goUpLogo}`}></img>
        </section>
    )
}

export default Login;