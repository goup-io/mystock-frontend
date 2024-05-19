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
import Alert from '../../alerts/Alert.js';
import ErrorImage from '../../../assets/icons/error.svg';
import SucessImage from '../../../assets/icons/sucess.svg';

function Forgot() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    async function handleClick(event) {
        event.preventDefault();     
        if (!email) {
            Alert.alert(ErrorImage, "Informe o seu e-mail")
            return;
        }

        const respostaHTTP = await ApiRequest.recuperarSenha(email);

        console.log(respostaHTTP);
        if (respostaHTTP.status === 201) {
            Alert.alert(SucessImage, "Email enviado com sucesso!")
            setEmail("");
        }
        if (respostaHTTP.status === 404) {
            Alert.alert(ErrorImage, "Email não encontrado")
        }
    }

    function handleInput(evento, stateFunction) {

        stateFunction(evento.target.value);
    }

    return (
        <section className="flex flex-col items-center justify-center h-[100vh]">
            <img className="absolute top-4 left-0" src={`${myStockLogo}`}></img>
            <img className="absolute right-8 top-5" src={`${dots01}`}></img>
            <div className="bg-indigo-100 rounded-[0.3125rem] w-[35vw] h-min-[70vh] flex flex-col justify-evenly items-center shadow-lg z-10">
                <div className="mt-[3.25rem] flex flex-col items-center">
                    <h1 className="text-[2rem] font-medium">Esqueci a senha</h1>
                    <p className="text-[1.2rem] w-3/4">Digite seu email para a recuperação de senha.
                        Você receberá um email com o link para a recuperação da senha.</p>
                </div>

                <form>
                    <div className="flex flex-col items-start mb-[1.5rem]">
                        <p className="form-floating text-[1.06rem] mb-[0.5rem] text-black">Email:</p>
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
                    <ButtonEnter funcao={(event) => handleClick(event)}>Recuperar Senha</ButtonEnter>
                </form>

                <div className=" mb-[2rem] mt-[0.6rem]">
                    <a className="text-[1.2rem]" href="/">Entrar</a>
                </div>
                <div className="mb-[1.69rem]">
                    <p className="text-[1.06rem]">Não tem acesso ao nosso sistema?</p>
                    <a className="text-[1.06rem] underline" href="">Entre em contato conosco!</a>
                </div>
            </div>
            <img className="absolute bottom-0 left-0" src={`${dots02}`}></img>
            <img className="absolute bottom-0 right-0" src={`${goUpLogo}`}></img>
        </section>
    )
}

export default Forgot;