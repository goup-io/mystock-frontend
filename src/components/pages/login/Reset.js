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

function Reset() {

    const navigate = useNavigate();

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    async function handleClick(event) {

        event.preventDefault()

        if (!senha || senha === " ") {
            Alert.alert(ErrorImage, "Digite a sua nova senha");
            return
        }
        if (!confirmarSenha || confirmarSenha === " ") {
            Alert.alert(ErrorImage, "Confirme sua senha");
            return
        }

        if (senha !== confirmarSenha) {
            Alert.alert(ErrorImage, "As senhas digitadas não coincidem. Por favor, tente novamente.");
            return
        }

        const url = window.location.href;
        const params = new URLSearchParams(new URL(url).search);
        const token = params.get('token');

        const respostaHTTP = await ApiRequest.resetSenha(senha, token);

        console.log(respostaHTTP);
        if (respostaHTTP.status === 404) {
            Alert.alert(ErrorImage, "Não foi possível realizar a redefinição, tente novamente.");
            return
        }
        if (respostaHTTP.status === 401) {
            Alert.alert(ErrorImage, "Este link já foi utilizado anteriormente, tente novamente com um novo.");
            return
        }
        if (respostaHTTP.status === 200) {
            Alert.alert(SucessImage, "Senha redefinida!");
            navigate("/");
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
                    <h1 className="text-[2rem] font-medium">Alterar Senha</h1>
                    <p className="text-[1.2rem] ">Digite sua nova senha.</p>
                </div>

                <form>
                    <div className="flex flex-col items-start mb-[0.5rem]">
                        <p className="text-[1.06rem] mb-[0.5rem]">Nova Senha:</p>
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
                    <div className="flex flex-col items-start mb-[2rem]">
                        <p className="text-[1.06rem] mb-[0.5rem]">Confirmar Senha:</p>
                        <Input
                            id="inputConfirmarSenha"
                            handleInput={handleInput}
                            handlerAtributeChanger={setConfirmarSenha}
                            value={confirmarSenha}
                            type="password"
                            icon={lockIcon}
                            placeholder="*******"
                        ></Input>
                    </div>
                    <ButtonEnter funcao={(event) => handleClick(event)}>Confirmar</ButtonEnter>
                </form>

                <div className=" mb-[2.69rem] mt-[0.6rem]">
                    <a className="text-[1.1rem]" href="/">Entrar</a>
                </div>
            </div>
            <img className="absolute bottom-0 left-0" src={`${dots02}`}></img>
            <img className="absolute bottom-0 right-0" src={`${goUpLogo}`}></img>
        </section>
    )
}

export default Reset;