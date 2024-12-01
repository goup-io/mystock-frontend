
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
import AbrirModalAddDiscount from "../modalAddDiscount.js";

function ModalEditProd({ id, onUpdate }) {
    const [dadosModelo, setDadosModelo] = useState([]);
    const [dadosTamanho, setDadosTamanho] = useState([]);
    const [dadosCor, setDadosCor] = useState([]);
    const [nome, setNome] = useState("");
    const [precoCusto, setPrecoCusto] = useState(0.00);
    const [precoRevenda, setPrecoRevenda] = useState(0.00);
    const [modelo, setModelo] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [cor, setCor] = useState("");
    const [idProduto, setIdProduto] = useState("");
    const [itemPromocional, setItemPromocional] = useState(false);
    const [codigo, setCodigo] = useState("");

    const setters = [setNome, setPrecoCusto, setPrecoRevenda,setItemPromocional, setCodigo];

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

    const handleCheckboxChange = (event) => {
        setItemPromocional(event.target.checked);
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
                setCodigo(response.data.codigo);
                if (response.data.itemPromocional === 'SIM') {
                    setItemPromocional(true);
                } else {
                    setItemPromocional(false);
                }
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
        const isPromocional = itemPromocional ? 'SIM' : 'NAO';

        const objetoAdicionado = {
            nome,
            precoC,
            precoR,
            isPromocional,
            codigo
        };

        try {
            console.log("TESTE");
            const response = await ApiRequest.editarProduto(idProduto, objetoAdicionado);
            console.log(response);
            if (response?.status === 200) {
                Alert.alertSuccess("Produto atualizado com sucesso!");
                onUpdate();
            } else {
                Alert.alertError("Erro ao atualizar!", response?.response?.data?.message);
            }
        } catch (error) {
            console.log("Erro ao atualizar um produto: ", error);
        }
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal props="Editar informações do Produto" />
                </div>
                <div className="w-[40rem] h-[20rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
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
                                            borderRadius: '25%',
                                            cursor: 'pointer',
                                        }}
                                        checked={itemPromocional} 
                                        onChange={handleCheckboxChange}
                                        />
                                </form>
                                
                            </div>
                        </div>
                    </div>
{/* 
                    <div className="mt-2 flex justify-start items-center">
                        
                    <input type="checkbox" className="w-6 h-6 ml-6" checked={itemPromocional} onChange={handleCheckboxChange}></input>
                       <p className="form-floating text-lg text-black font-normal ml-4">Item Promocional</p>
                    </div> */}

                </div>
                <div className="justify-between flex-row flex w-11/12">
                    {/* <ButtonModal height={"2rem"} width={"16rem"} funcao={() => AbrirModalAddDiscount(setPrecoRevenda, precoRevenda)}>Adicionar Desconto</ButtonModal> */}
                    <div className="w-[40rem] flex justify-end  h-6 ">
                        <ButtonClear
                        setters={setters}
                        >Limpar</ButtonClear>
                        <ButtonModal funcao={handleSave}>Editar</ButtonModal>
                    </div>
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