import { useState } from "react";
import { useEffect } from "react";
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ModalCadastreLogin({ dadosAdicionais }) {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const setters = [setUsuario, setSenha];

    function handleInputChange(event, setStateFunction) {
        console.log(event.target.value);
        setStateFunction(event.target.value);

    }

    const handleSave = () => {
      
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
                            type="Text"
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
                    onClick={handleSave}
                    >Cadastrar</ButtonModal>
                </div>
            </div>

        </>
    );
}

function AbrirModalCadastreLogin() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreLogin />,
         // width: "60rem",
        // heigth: "170rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreLogin;
