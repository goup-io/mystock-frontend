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
    const [nomesCargos, setNomeCargos] = useState([]);
    const [dadosLoja, setDadosLoja] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [idCargo, setCargo] = useState("");
    const [idLoja, setLoja] = useState("");
    const [loading, setLoading] = useState(true); 

    const setters = [setNome, setEmail, setCelular, setDadosCargo, setLoja];

    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);

    }

    const handleChangeCargo = (event) => {
        setCargo(event.target.value);
      };

      const handleChangeLoja = (event) => {
        setLoja(event.target.value);
      };


    async function teste() {
        setLoading(true); 
        await ApiRequest.cargoGetAll().then((response) => {
            if (response.status === 200) {
                setDadosCargo(response.data);
                console.log(dadosCargo);
            }
        }).catch((error) => {
            console.log("Erro ao buscar os dados", error)
        })

        await ApiRequest.lojaGetAll().then((response) => {
            if (response.status === 200) {
               setDadosLoja(response.data)
               setLoading(false);                 
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })
        setLoading(false);                 
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

        console.log(objetoAdicionado);

        if (idCargo === 'Vendedor') {
            ApiRequest.userCreate(objetoAdicionado);
        } else {
            AbrirModalCadastreLogin(objetoAdicionado);
        }
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
            { loading ? ( 
                    <p>aaaaaaaaaaaaaaaaa</p>
                    ) : (
                        <>
                        <div className="w-[43rem]">
                    <HeaderModal
                        props="Cadastrar Novo Usuário"
                    ></HeaderModal>
                </div>
                <div className="w-[43rem] h-[18rem] flex flex-col rounded justify-around p-3 bg-slate-200 border-solid  shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
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
                            dadosBanco={dadosCargo.map(value => value.nome)}
                            value={idCargo}
                            handleChange={handleChangeCargo}
                        >Cargo</ComboBoxModal>
                    </div>
                    <div className="flex justify-start ml-[2.4rem]">
                        <ComboBoxModal
                            dadosBanco={dadosLoja.map(value => value.nome)}
                            value={idLoja}
                            handleChange={handleChangeLoja}
                        >Loja</ComboBoxModal>
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
               </>
                )}
            </div>
    );
}

function AbrirModalCadastreUser() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreUser />,
        // width: "60rem",
        // heigth: "170rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreUser;