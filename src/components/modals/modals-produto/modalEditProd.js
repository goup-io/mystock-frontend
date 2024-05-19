
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
import { Navigate } from "react-router-dom";

function ModalEditProd(idEtp) {
    const [dadosModelo, setDadosModelo] = useState([]);
    const [dadosTamanho, setDadosTamanho] = useState([]);
    const [dadosCor, setDadosCor] = useState([]);
    const [nome, setNome] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [precoRevenda, setPrecoRevenda] = useState("");
    const [modelo, setModelo] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [loja, setIdLoja] = useState("");
    const [loading, setLoading] = useState(true);


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

    async function fetchDadosModeloCorTamanho() {
        setLoading(true);
        await ApiRequest.modeloGetAll().then((response) => {
            if (response.status === 200) {
                setDadosModelo(response.data);
                console.log(dadosModelo);
            }
        }).catch((error) => {
            console.log("Erro ao buscar os dados", error)
        })

        await ApiRequest.corGetAll().then((response) => {
            if (response.status === 200) {
                setDadosCor(response.data);
                console.log(dadosCor);
            }
        }).catch((error) => {
            console.log("Erro ao buscar os dados", error)
        })

        await ApiRequest.tamanhoGetAll().then((response) => {
            if (response.status === 200) {
                setDadosTamanho(response.data)
                setLoading(false);
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })
        setLoading(false);
    }

    async function fetchEtp() {
        await ApiRequest.etpsGetByIdEditar(idEtp.id).then((response) => {
            if (response.status === 200) {
                setNome(response.data.nome)
                setModelo(response.data.modelo)
                setTamanho(response.data.tamanho)
                setCor(response.data.cor)
                setPrecoCusto(response.data.precoCusto)
                setPrecoRevenda(response.data.precoRevenda)
                setIdLoja(response.data.idLoja)
            }
        }).catch((error) => {
            console.log("Erro ao buscar os dados", error)
        })
    }

    useEffect(() => {
        fetchEtp()
        fetchDadosModeloCorTamanho();
    }, [])


    const handleSave = () => {

        if (!modelo || !cor || !tamanho || !nome || !precoCusto || !precoRevenda) {
            //todo: acionar modal de cadastro incorreto
            alert("Preencha todos os campos corretamente")
            return;
        }

        var precoC = parseFloat(precoCusto)
        var precoR = parseFloat(precoRevenda)

        // usando a function find do javascript para percorrer uma lista de objetos baseado na verificação de uma key
        const modeloObj = dadosModelo.find(objModelo => objModelo.nome === modelo);
        const idModelo = modeloObj ? modeloObj.id : null;

        const corObj = dadosCor.find(objCor => objCor.nome === cor);
        const idCor = corObj ? corObj.id : null;

        //const tamanhoObj = dadosTamanho.find(objTamanho => objTamanho.numero.toString() === tamanho.toString());
        //const idTamanho = tamanhoObj ? tamanhoObj.id : null;

        const objetoAdicionado = {
            nome,
            precoC,
            precoR,
            idModelo,
            idCor
        };

        ApiRequest.editarProduto(idEtp.id, objetoAdicionado).then((response) => {
            console.log(response);
            if (response.status === 200) {
                Alert.alert(SucessImage, "Produto atualizado!")
            }
            if (response.status === 409) {
                Alert.alert(ErrorImage, "Este produto já está cadastrado!")
            }
        }).catch((error) => {
            console.log("Erro ao cadastrar um produto: ", error)
            //todo: mostrar modal de erro ao cadastrar
        });

    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Editar informações do Produto"
                    ></HeaderModal>
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
                <div className="w-[40rem] flex justify-end  h-6 ">
                    <ButtonClear
                      setters={setters}
                    >Limpar</ButtonClear>
                    <ButtonModal funcao={handleSave}>Editar</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalEditProd(etpId) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditProd id={etpId} />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditProd;