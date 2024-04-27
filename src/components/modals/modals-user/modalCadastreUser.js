import api from "../../../api";
import { useState } from "react";
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal"
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import ComboBoxModal from "../smallComboBoxModal";
// import { useNavigate } from "react-router-dom";
import AbrirModalCadastreLogin from "../../modals/modals-user/modalCadastreLogin";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";
import { useEffect } from "react";

function ModalCadastreUser() {

    // const navigate = useNavigate();

    const [dadosCargo, setDadosCargo] = useState([]);
    const [dadosLoja, setDadosLoja] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [idCargo, setCargo] = useState("");
    const [idLoja, setLoja] = useState("");


    const setters = [setNome, setEmail, setCelular, setDadosCargo, setLoja];

    function handleInputChange(event, setStateFunction) {
        console.log(event.target.value);
        setStateFunction(event.target.value);

    }

    const handleChangeCargo = (event) => {
        console.log(event.target.value);
        setCargo(event.target.value);
      };

      const handleChangeLoja = (event) => {
        console.log(event.target.value);
        setLoja(event.target.value);
      };


    async function teste() {
        await ApiRequest.cargoGetAll().then((response) => {
            if (response.status === 200) {
                setDadosCargo(response.data.map(value => value.nome))
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })

        await ApiRequest.lojaGetAll().then((response) => {
            if (response.status === 200) {
                setDadosLoja(response.data.map(value => value.nome))
                console.log(dadosLoja);
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })
    }

    useEffect(() => {
        teste();
    }, [])


    const handleSave = () => {
        const objetoAdicionado = {
            nome,
            email,
            celular,
            idCargo,
            idLoja
        };

        console.log(idCargo);
        console.log(objetoAdicionado);

        if (idCargo === 'Vendedor') {
            ApiRequest.userCreate(objetoAdicionado);
        } else {
            AbrirModalCadastreLogin(objetoAdicionado);
        }
    }

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
                            text="text"
                            value={nome}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setNome}
                        >Nome</InputAndLabelModal>
                        <InputAndLabelModal
                            placeholder="digite o email..."
                            value={email}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setEmail}
                        >Email</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        {/* <InputAndLabelModal
                        placeholder="digite o usuário..."
                        value={usuario}
                        onChange={(e) => handleInputChange(e, setUsuario)}
                        >Usuário</InputAndLabelModal> */}
                        <InputAndLabelModal
                            placeholder="digite o celular..."
                            value={celular}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setCelular}
                        >Celular</InputAndLabelModal>
                        <ComboBoxModal
                            dadosBanco={dadosCargo}
                            value={idCargo}
                            handleChange={handleChangeCargo}
                        >Cargo</ComboBoxModal>
                    </div>
                    <div className="flex justify-start ml-[0.60rem]">
                        <ComboBoxModal
                            dadosBanco={dadosLoja}
                            value={idLoja}
                            onChange={(e) => handleChange(e , setLoja)}
                            handleChange={handleChangeLoja}
                        >Loja</ComboBoxModal>
                    </div>
                </div>
                <div className="w-[32rem] flex justify-end  h-6 ">
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

function AbrirModalCadastreUser() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreUser />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreUser;