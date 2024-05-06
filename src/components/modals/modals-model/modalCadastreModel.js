
import { useEffect } from "react";
import { useState } from "react";
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import ComboBoxModal from "../smallComboBoxModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";

function ModalCadastreModel() {

    const [dadosCategoria, setDadosCategoria] = useState([]);
    const [dadosTipo, setDadosTipo] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [idCategoria, setCategoria] = useState("");
    const [idTipo, setTipo] = useState("");


    const setters = [setCodigo, setNome, setCategoria, setTipo, setDadosCategoria, setDadosTipo];

    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);

    }

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };


    async function teste() {
        await ApiRequest.categoriaGetAll().then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setDadosCategoria(response.data)
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })

        await ApiRequest.tipoGetAll().then((response) => {
            if (response.status === 200) {
                setDadosTipo(response.data)
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
            codigo,
            nome,
            idCategoria,
            idTipo
        };

        console.log(objetoAdicionado);

        ApiRequest.modeloCreate(objetoAdicionado);

    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Cadastrar Novo Modelo"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className="flex justify-around ">
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite o código..."
                            value={codigo}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setCodigo}
                        >Código</InputAndLabelModal>
                        <InputAndLabelModal
                            type="Text"
                            placeholder="digite o nome..."
                            value={nome}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setNome}
                        >Nome</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <ComboBoxModal
                            dadosBanco={dadosCategoria.map(value => value.nome)}
                            value={idCategoria}
                            onChange={(e) => (e, setCategoria)}
                            handleChange={handleChangeCategoria}
                        >Categoria</ComboBoxModal>
                        <ComboBoxModal
                            dadosBanco={dadosCategoria.map(value => value.nome)}
                            value={idTipo}
                            onChange={(e) => (e, setTipo)}
                            handleChange={handleChangeTipo}
                        >Tipo</ComboBoxModal>
                    </div>
                </div>
                <div className="w-[40rem] flex justify-end  h-6 ">
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

function AbrirModalCadastreModel() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreModel />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreModel;