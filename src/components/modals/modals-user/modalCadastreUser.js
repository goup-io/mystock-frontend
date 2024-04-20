import api from "../../../api";
import { useState } from "react";
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal"
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import ComboBoxModal from "../smallComboBoxModal";
import { useNavigate } from "react-router-dom";
import abrirModalCadastreLogin from "./modalCadastreLogin";

function ModalCadastreUser() {

    const navigate = useNavigate();

    const dadosCargo = ['Gerente Geral', 'Gerente', 'Vendedor'];
    const dadosLoja = ['Universo', 'Pérola', 'Pérola Vip'];

    const handleSave = () => {
        const objetoAdicionado = {
            nome,
            email,
            usuario,
            celular,
            cargo,
            loja
        };
        
        if (cargo === 'Vendedor') {
            api.post(``, objetoAdicionado);
        } else {
           
            navigate("/cadastro-login");
        }
    }

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [celular, setCelular] = useState("");
    const [cargo, setCargo] = useState("");
    const [loja, setLoja] = useState("");

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    const handleBack = () => {
        navigate("/???");
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[20.5rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
            <div className="w-[32rem]">
            <HeaderModal
             props="Cadastrar Novo Usuário"
             ></HeaderModal>
            </div>
                <div className="w-[32rem] h-[14rem] flex flex-col rounded justify-around p-3 bg-slate-200 border-solid  shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                       <InputAndLabelModal
                       placeholder="digite o nome..."
                       value={nome}
                       onChange={(e) => handleInputChange(e, setNome)}
                       >Nome</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite o email..."
                        value={email}
                        onChange={(e) => handleInputChange(e, setEmail)}
                        >Email</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                        placeholder="digite o usuário..."
                        value={usuario}
                        onChange={(e) => handleInputChange(e, setUsuario)}
                        >Usuário</InputAndLabelModal>
                        <InputAndLabelModal
                        placeholder="digite o celular..."
                        value={celular}
                        onChange={(e) => handleInputChange(e, setCelular)}
                        >Celular</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                    <ComboBoxModal
                    dadosBanco={dadosCargo}
                    value={cargo}
                    onChange={(e) => handleInputChange(e, setCargo)}
                    >Cargo</ComboBoxModal>
                       <ComboBoxModal
                    dadosBanco={dadosLoja}
                    value={loja}
                    onChange={(e) => handleInputChange(e, setLoja)}
                    >Loja</ComboBoxModal>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end  h-6 ">
                    <ButtonClear
                    
                    >Limpar</ButtonClear>
                   <ButtonModal
                    onClick={handleSave}
                   >Cadastrar</ButtonModal>
                </div>
            </div>
        </>
    );
}

export default ModalCadastreUser;