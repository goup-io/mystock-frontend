import { useState } from "react";
import { useEffect } from "react";
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";


import Alert from '../../alerts/Alert.js'
import ErrorImage from "../../../assets/icons/error.svg"
import SucessImage from '../../../assets/icons/sucess.svg'


function ModalCadastreLogin({ dadosAdicionais, editar, onUpdate }) {

    const [dadosUsuario, setDadosUsuario] = useState(dadosAdicionais);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const setters = [setUsuario, setSenha];

    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);
    }

    const handleSave = async () => {

        console.log(dadosUsuario)

        // primeiramente é necessário validar os campos da criação de login(usuario, senha)
        if (!usuario || !senha) {
            //todo: mostrar modal de campos de login vazios
            console.log("campos de login não estão preenchidos")
            return;
        }
        const limiteTextoUsuario = 20;
        const limiteTextoSenha = 20;
        if (usuario.length >= limiteTextoUsuario || senha.length >= limiteTextoSenha) {
            console.log("que isso amigo? mucho texto")
            return
        }

        if (editar) {
            try {
                const response = await ApiRequest.userUpdate(dadosAdicionais.id, dadosAdicionais);
                console.log(response);
                if (response.status === 200) {
                    Alert.alert(SucessImage, "Usuário atualizado!");
                    onUpdate();
                } else if (response.status === 400) {
                    Alert.alert(ErrorImage, "Dados incorretos, não foi possível cadastrar!");
                }
            } catch (error) {
                console.log("Erro ao atualizar um usuário: ", error);
            }

            ApiRequest.loginUpdate(dadosAdicionais.id, usuario, senha).then((response) => {
                if (response.status === 200) {
                    console.log("login atualizado")
                    //todo: mostrar modal de sucesso ao cadastrar

                    // pegando o ID que foi inserido, baseado no nosso DTO do backend.  
                    const idUsuario = response.data.id;
                    console.log("ID do usuário inserido:", idUsuario);
                    // momento da criação do login

                }
            }).catch((error) => {
                console.log("Erro ao cadastrar um usuário: ", error)
                if (error.response.status === 400) {
                    Alert.alert(ErrorImage, "Dados incorretos, não foi possível atualizar!");
                }
            });
        } else {
            ApiRequest.userCreate(dadosAdicionais).then((response) => {
                if (response.status === 201) {
                    alert("Usuário Cadastrado!!")
                    const idUsuario = response.data.id;
                    ApiRequest.loginCreate(usuario, senha, idUsuario).then((response) => {
                        Alert.alert(SucessImage, "Login criado!")
                        console.log("Login cadastrado: " + response)
                    }).catch((error) => {
                        console.log("Erro ao cadastrar o login: ", error)
                    })
                }
            }).catch((error) => {
                console.log("Erro ao cadastrar um usuário: ", error)
                //todo: mostrar modal de erro ao cadastrar
            });
        }
    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[15rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[43rem]">
                    <HeaderModal props="Cadastrar Login do Usuário" />
                </div>
                <div className="w-[43rem] h-[7rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite o usuário..."
                            value={usuario}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setUsuario}
                        >Usuário:</InputAndLabelModal>
                        <InputAndLabelModal
                            type="password"
                            placeholder="digite a senha..."
                            value={senha}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setSenha}
                        >Senha:</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[43rem] flex justify-end  h-6 ">
                    <ButtonClear
                        setters={setters}
                    >Limpar</ButtonClear>
                    <ButtonModal
                        funcao={handleSave}
                    >Cadastrar</ButtonModal>
                </div>
            </div>

        </>
    );
}

function AbrirModalCadastreLogin(dadosUsuario, edit, onUpdate) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreLogin dadosAdicionais={dadosUsuario} editar={edit} onUpdate={onUpdate} />,
        // width: "60rem",
        // heigth: "170rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreLogin;
