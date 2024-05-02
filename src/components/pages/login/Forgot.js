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

function Forgot() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleClick() {

        const respostaHTTP = await ApiRequest.userLogin(email, senha);

        console.log(respostaHTTP);
        if (respostaHTTP.status == 200) {
            alert("Deu certo")
            navigate("/menu")
        }
    }

    function handleInput(evento, stateFunction) {

        stateFunction(evento.target.value);
    }

    return (
        <section class="flex flex-col items-center justify-center h-[100vh]">
            <img class="absolute top-4 left-0" src={`${myStockLogo}`}></img>
            <img class="absolute right-8 top-5" src={`${dots01}`}></img>
            <div class="bg-indigo-100 rounded-[0.3125rem] w-[35vw] h-[70vh] flex flex-col justify-evenly items-center shadow-lg z-10">
                <div class="mt-[3.25rem] flex flex-col items-center">
                    <h1 class="text-[2rem] font-medium">Esqueci a senha</h1>
                    <p class="text-[1.2rem] w-3/4">Digite seu email para a recuperação de senha.
                        Você receberá um email com o link para a recuperação da senha.</p>
                </div>

                <div class="flex flex-col items-start mb-[1.5rem]">
                    <p class="form-floating text-[1.06rem] mb-[0.5rem] text-black">Email:</p>
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
                <ButtonEnter funcao={handleClick}>Recuperar Senha</ButtonEnter>
                <div class=" mb-[2rem] mt-[0.6rem]">
                    <a class="text-[1.2rem]" href="">Entrar</a>
                </div>
                <div class="mb-[1.69rem]">
                    <p class="text-[1.06rem]">Não tem acesso ao nosso sistema?</p>
                    <a class="text-[1.06rem] underline" href="">Entre em contato conosco!</a>
                </div>
            </div>
            <img class="absolute bottom-0 left-0" src={`${dots02}`}></img>
            <img class="absolute bottom-0 right-0" src={`${goUpLogo}`}></img>
        </section>
    )
}

export default Forgot;