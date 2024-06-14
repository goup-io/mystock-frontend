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

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    async function handleClick(event) {

        event.preventDefault()
        if (usuario === "" || usuario === null || usuario === undefined) {
            Alert.alert(ErrorImage, "Informe o seu usuario")
            return;
        }

        if (senha === "" || senha === null || senha === undefined) {
            Alert.alert(ErrorImage, "Informe a sua senha")
            return;
        }

        const respostaHTTP = await ApiRequest.userLogin(usuario, senha);
        console.log(respostaHTTP);

        if (respostaHTTP.status === 403) {
            Alert.alert(ErrorImage, "Credenciais inválidas");
        }

        if (respostaHTTP.status === 200) {
            var data = respostaHTTP.data.token;
            console.log(respostaHTTP.data)
            localStorage.setItem("token", data);
            if (respostaHTTP.data.contexto === "usuario") {
                localStorage.setItem("loja_id", respostaHTTP.data.idLoja)
                localStorage.setItem("cargo", respostaHTTP.data.cargo)
                localStorage.setItem("user_id", respostaHTTP.data.idUser);
                Alert.alertTimer(SucessImage, "Seja bem-vindo!");
                if (respostaHTTP.data.cargo === 'ADMIN') {
                    localStorage.setItem("visao_loja", 0)
                    navigate("/dashboard-geral");
                } else {
                    localStorage.setItem("visao_loja", respostaHTTP.data.idLoja)
                    navigate(`/dashboard-loja`)
                }
            }
            if (respostaHTTP.data.contexto === "loja") {
                localStorage.setItem("loja_id", respostaHTTP.data.idLoja);
                localStorage.setItem("tipo_acesso", respostaHTTP.data.tipoLogin);
                if (respostaHTTP.data.tipoLogin === "AREA_VENDA") {
                    Alert.alertTimer(SucessImage, "Seja bem-vindo!");
                    navigate("/menu");
                } else {
                    Alert.alertTimer(SucessImage, "Seja bem-vindo!");
                    navigate("/venda/caixa");
                }
            }
        }
    }

    function handleInput(evento, stateFunction) {

        stateFunction(evento.target.value);
    }

    return (
        <section className="flex flex-col items-center justify-center h-[100vh]">
            <img className="absolute top-4 left-0" src={`${myStockLogo}`}></img>
            <img className="absolute right-8 top-5" src={`${dots01}`}></img>
            <div className="bg-indigo-100 rounded-[0.3125rem] w-[35vw] h-min-[75vh] flex flex-col justify-evenly items-center shadow-lg z-10">
                <div className="mt-[3.25rem] flex flex-col items-center">
                    <h1 className="text-[2rem] font-medium">Bem-Vindo de Volta!</h1>
                    <p className="text-[1.2rem] w-3/4">Faça o login para ter acesso ao seu sistema de vendas e estoque!</p>
                </div>

                <form>
                    <div className="flex flex-col items-start mb-[0.5rem]">
                        <p className="form-floating text-[1.06rem] text-black mb-[0.5rem]">Usuário:</p>
                        <Input
                            id="inputEmail"
                            handleInput={handleInput}
                            type="text"
                            handlerAtributeChanger={setUsuario}
                            icon={`${userIcon}`}
                            value={usuario}
                            placeholder="usuario"
                        ></Input>
                    </div>
                    <div className="flex flex-col items-start mb-[2.1rem]">
                        <p className="text-[1.06rem] mb-[0.5rem]">Senha:</p>
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
                <div className=" mb-[1rem] mt-[0.6rem]">
                    <a className="text-[1.2rem]" href="/forgot">Esqueci a senha</a>
                </div>
                <div className="mb-[1rem]">
                    <p className="text-[1.2rem]">Não tem acesso ao nosso sistema?</p>
                    <a className="text-[1.2rem] underline" href="mailto:goup.contactus@gmail.com">Entre em contato conosco!</a>
                </div>
            </div>
            <img className="absolute bottom-0 left-0" src={`${dots02}`}></img>
            <img className="absolute bottom-0 right-0" src={`${goUpLogo}`}></img>
        </section>
    )
}

export default Login;