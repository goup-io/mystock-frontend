
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import ComboBoxModal from "../smallComboBoxModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";

import ApiRequest from "../../../connections/ApiRequest";

import Alert from '../../alerts/Alert.js';
import ErrorImage from '../../../assets/icons/error.svg'
import SucessImage from '../../../assets/icons/sucess.svg'

function ModalEditProd({ id, onUpdate }) {
    const [dadosModelo, setDadosModelo] = useState([]);
    const [dadosTamanho, setDadosTamanho] = useState([]);
    const [dadosCor, setDadosCor] = useState([]);
    const [nome, setNome] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [precoRevenda, setPrecoRevenda] = useState("");
    const [modelo, setModelo] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [idProduto, setIdProduto] = useState("");

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

    async function fetchDadosModeloCorTamanho() {
        try {
            const responseModelo = await ApiRequest.modeloGetAll();
            if (responseModelo.status === 200) {
                setDadosModelo(responseModelo.data);
            }

            const responseCor = await ApiRequest.corGetAll();
            if (responseCor.status === 200) {
                setDadosCor(responseCor.data);
            }

            const responseTamanho = await ApiRequest.tamanhoGetAll();
            if (responseTamanho.status === 200) {
                setDadosTamanho(responseTamanho.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchEtp() {
        try {
            const response = await ApiRequest.etpsGetByIdEditar(id);
            if (response.status === 200) {
                setNome(response.data.nome);
                setModelo(response.data.modelo);
                setTamanho(response.data.tamanho);
                setCor(response.data.cor);
                setPrecoCusto(response.data.precoCusto);
                setPrecoRevenda(response.data.precoRevenda);
                setIdProduto(response.data.idProduto);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchEtp();
        fetchDadosModeloCorTamanho();
    }, []);

    const handleSave = async () => {
        if (!modelo || !cor || !tamanho || !nome || !precoCusto || !precoRevenda) {
            alert("Preencha todos os campos corretamente");
            return;
        }

        const precoC = parseFloat(precoCusto);
        const precoR = parseFloat(precoRevenda);

        const objetoAdicionado = {
            nome,
            precoC,
            precoR
        };

        try {
            const response = await ApiRequest.editarProduto(idProduto, objetoAdicionado);
            if (response.status === 200) {
                Alert.alert(SucessImage, "Produto atualizado!");
                onUpdate();
            } else if (response.status === 409) {
                Alert.alert(ErrorImage, "Este produto já está cadastrado!");
            }
        } catch (error) {
            console.log("Erro ao cadastrar um produto: ", error);
        }
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal props="Editar informações do Produto" />
                </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                        <ComboBoxModal
                            dadosBanco={dadosModelo.map(value => value.nome)}
                            value={modelo}
                            onChange={(e) => (e, setModelo)}
                            handleChange={handleChangeModelo}
                            disabled={true}
                        >Modelo</ComboBoxModal>
                        <InputAndLabelModal
                            type="Text"
                            placeholder="Digite o nome..."
                            value={nome}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setNome}
                        >Nome</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <ComboBoxModal
                            dadosBanco={dadosTamanho.map(value => value.numero)}
                            value={tamanho}
                            handleChange={handleChangeTamanho}
                            disabled={true}
                        >Tamanho</ComboBoxModal>
                        <ComboBoxModal
                            dadosBanco={dadosCor.map(value => value.nome)}
                            value={cor}
                            handleChange={handleChangeCor}
                            disabled={true}
                        >Cor</ComboBoxModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            type="number"
                            placeholder="Digite o preço de custo..."
                            value={precoCusto}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setPrecoCusto}
                        >Preço Custo</InputAndLabelModal>
                        <InputAndLabelModal
                            type="number"
                            placeholder="Digite o preço de revenda..."
                            value={precoRevenda}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setPrecoRevenda}
                        >Preço Revenda</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[40rem] flex justify-end h-6">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal funcao={handleSave}>Editar</ButtonModal>
                </div>
            </div>
        </>
    );
}


function AbrirModalEditProd(etpId, onUpdate) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditProd id={etpId} onUpdate={onUpdate} />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditProd;