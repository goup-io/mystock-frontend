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

import Alert from '../../alerts/Alert.js';
import ErrorImage from '../../../assets/icons/error.svg'
import SucessImage from '../../../assets/icons/sucess.svg'

function ModalCadastreProd() {

    const [dadosModelo, setDadosModelo] = useState([]);
    const [dadosTamanho, setDadosTamanho] = useState([]);
    const [dadosCor, setDadosCor] = useState([]);
    const [nome, setNome] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [precoRevenda, setPrecoRevenda] = useState("");
    const [modelo, setModelo] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [isPromocional, setIsPromocional] = useState("Não"); // Inicializa como "Não"
    const [codigo, setCodigo] = useState("");

    const setters = [setNome, setPrecoCusto, setPrecoRevenda, setModelo, setTamanho, setCor, setIsPromocional, setCodigo];
    
    console.log(cor)

    const handleCheckboxChange = () => {
        setIsPromocional(prev => (prev === "Sim" ? "Não" : "Sim"));
    };

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
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })
    }

    useEffect(() => {
        fetchDadosModeloCorTamanho();
    }, [])

    const handleSave = () => {

        if (!modelo || !cor || !tamanho || !nome || !precoCusto || !precoRevenda || !codigo) {
            Alert.alert(ErrorImage, "Preencha todos os campos!")
            return;
        }

        var precoC = parseFloat(precoCusto)
        var precoR = parseFloat(precoRevenda)

        // usando a function find do javascript para percorrer uma lista de objetos baseado na verificação de uma key
        const modeloObj = dadosModelo.find(objModelo => objModelo.nome === modelo);
        const idModelo = modeloObj ? modeloObj.id : null;

        const corObj = dadosCor.find(objCor => objCor.nome === cor);
        const idCor = corObj ? corObj.id : null;

        const tamanhoObj = dadosTamanho.find(objTamanho => objTamanho.numero.toString() === tamanho.toString());
        const tamanhoNumero = tamanhoObj ? tamanhoObj.numero : null;

        const objetoAdicionado = {
            nome,
            precoC,
            precoR,
            idModelo,
            idCor,
            tamanhoNumero,
            isPromocional: isPromocional === "Sim" ? "SIM" : "NAO",
            idLoja: localStorage.getItem("loja_id"),
            codigo
        };

        ApiRequest.produtoCreate(objetoAdicionado).then((response) => {
            if (response.status === 201) {
                Alert.alert(SucessImage, "Produto cadastrado no sistema!")
            }
            if (response.status === 409) {
                Alert.alert(ErrorImage, "Produto já está cadastrado no sistema!")
            }
        }).catch((error) => {
            console.log("Erro ao cadastrar um produto: ", error)
            //todo: mostrar modal de erro ao cadastrar
        });

    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Cadastrar Novo Produto"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[20rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className="flex justify-around ">
                        <ComboBoxModal
                            dadosBanco={dadosModelo.map(value => value.nome)}
                            value={modelo}
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
                            dadosBanco={dadosTamanho.map(value => value.numero)}
                            value={tamanho}
                            handleChange={handleChangeTamanho}
                        >Tamanho</ComboBoxModal>
                        <ComboBoxModal
                            dadosBanco={dadosCor.map(value => value.nome)}
                            value={cor}
                            handleChange={handleChangeCor}
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

                    <div className="flex justify-around">
                        <InputAndLabelModal
                            type="text"
                            placeholder="Digite o código do produto..."
                            value={codigo}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setCodigo}
                        >Código</InputAndLabelModal>
                        <div class="w-2/2 h-1/3 flex">   
                            <div className="flex flex-col justify-start items-start">
                                <p className="form-floating text-lg text-black mb-2 font-normal">
                                    Item Promocional
                                </p>
                                <form class="relative" className="w-[16rem] h-7 flex flex-col justify-start items-start">
                                    <input 
                                        type="checkbox"  
                                        className="w-7 h-7 bg-[F5F3F4] pl-2 text-[1rem] font-[300] capitalize text-[#555] form-control border border-[0.1rem] border-slate-600"
                                        style={{
                                            appearance: 'none',
                                            WebkitAppearance: 'none',
                                            borderRadius: '25%',
                                            cursor: 'pointer',
                                        }}
                                        checked={isPromocional === "Sim"} 
                                        onChange={handleCheckboxChange}
                                        />
                                </form>
                                
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-[40rem] flex justify-end  h-6 ">
                    <ButtonClear setters={setters}>Limpar</ButtonClear>
                    <ButtonModal funcao={handleSave}>Cadastrar</ButtonModal>
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