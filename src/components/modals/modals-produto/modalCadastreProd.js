
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

function ModalCadastreProd() {

    const [dadosModelo, setDadosModelo] = useState([]);
    const [dadosTamanho, setDadosTamanho] = useState([]);
    const [dadosCor, setDadosCor] = useState([]);
    const [nome, setNome] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [precoRevenda, setPrecoRevenda] = useState("");
    const [idModelo, setModelo] = useState("");
    const [idTamanho, setTamanho] = useState("");
    const [idCor, setCor] = useState("");


    const setters = [setNome, setPrecoCusto, setPrecoRevenda, setModelo, setTamanho, setCor];

    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);

    }

    const handleChangeModelo = (event) => {
        setModelo(event.target.value);
    };

    const handleChangeTamanho = (event) => {
        setTamanho(event.target.value);
    };

    const handleChangeCor = (event) => {
        setCor(event.target.value);
    };

console.log(dadosModelo);
console.log(dadosTamanho);

    async function teste() {
        await ApiRequest.modeloGetAll().then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setDadosModelo(response.data)
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })

        await ApiRequest.tamanhoGetAll().then((response) => {
            if (response.status === 200) {
                setDadosTamanho(response.data)
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })

        await ApiRequest.corGetAll().then((response) => {
            if (response.status === 200) {
                setDadosCor(response.data)
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })
    }

    useEffect(() => {
        teste();
    }, [])


    const handleSave = () => {
        // const objetoAdicionado = {
        //     codigo,
        //     nome,
        //     idCategoria,
        //     idTipo
        // };

        // console.log(objetoAdicionado);

        // ApiRequest.modeloCreate(objetoAdicionado);

    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[43rem]">
                    <HeaderModal
                        props="Cadastrar Novo Produto"
                    ></HeaderModal>
                </div>
                <div className="w-[43rem] h-[18rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className="flex justify-around mb-4">
                        <ComboBoxModal
                            dadosBanco={dadosModelo.map(value => value.nome)}
                            value={idModelo}
                            onChange={(e) => (e, setModelo)}
                            handleChange={handleChangeModelo}
                        >Modelo</ComboBoxModal>
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
                            dadosBanco={dadosTamanho.map(value => value.nome)}
                            value={idTamanho}
                            onChange={(e) => (e, setTamanho)}
                            handleChange={handleChangeTamanho}
                        >Tamanho</ComboBoxModal>
                        <ComboBoxModal
                            dadosBanco={dadosCor.map(value => value.nome)}
                            value={idCor}
                            onChange={(e) => (e, setCor)}
                            handleChange={handleChangeCor}
                        >Cor</ComboBoxModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            type="Number"
                            placeholder="digite o preço de custo..."
                            value={precoCusto}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setPrecoCusto}
                        >Preço Custo</InputAndLabelModal>
                        <InputAndLabelModal
                            type="Number"
                            placeholder="digite o preço de revenda..."
                            value={precoRevenda}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setPrecoRevenda}
                        >Preço Revenda</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[43rem] flex justify-end  h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal>Cadastrar</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalCadastreProd() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreProd />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreProd;

