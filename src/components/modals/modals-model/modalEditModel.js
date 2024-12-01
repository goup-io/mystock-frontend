
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

function ModalEditModel({ id, onUpdate }) {

    const [dadosCategoria, setDadosCategoria] = useState([]);
    const [dadosTipo, setDadosTipo] = useState([]);
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [idModelo, setIdModelo] = useState("");
    const [loading, setLoading] = useState(true);
 
    const setters = [setNome];
 
    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);
 
    }
 
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };
 
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };
 
 
    async function fetchDadosCategoriaTipo() {
        try {
            const responseCategoria = await ApiRequest.categoriaGetAll();
            if (responseCategoria.status === 200) {
                setDadosCategoria(responseCategoria.data);
            }

            const responseTipo = await ApiRequest.tipoGetAll();
            if (responseTipo.status === 200) {
                setDadosTipo(responseTipo.data);
            }

        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchModel() {
        try {
            const response = await ApiRequest.modelGetByIdEditar(id);
            if (response.status === 200) {
                setNome(response.data.nome);
                setCategoria(response.data.categoria);
                setTipo(response.data.tipo);
                setIdModelo(response.data.id);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchModel();
        fetchDadosCategoriaTipo();
    }, []);
 
    const handleSave = async () => {
        if (!categoria || !tipo || !nome ) {
            alert("Preencha todos os campos corretamente");
            return;
        }

        // usando a function find do javascript para percorrer uma lista de objetos baseado na verificação de uma key
        const categoriaObj = dadosCategoria.find(objCategoria => objCategoria.nome === categoria);
        const idCategoria = categoriaObj ? categoriaObj.id : null;

        const tipoObj = dadosTipo.find(objTipo => objTipo.nome === tipo);
        const idTipo = tipoObj ? tipoObj.id : null;

        const objetoAdicionado = {
            nome,
            idCategoria,
            idTipo
        };

        console.log(objetoAdicionado)

        try {
           
            const response = await ApiRequest.editarModelo(idModelo, objetoAdicionado);
            if (response.status === 200) {
                Alert.alert(SucessImage, "Modelo atualizado!");
                onUpdate();
            } else if (response.status === 409) {
                Alert.alert(ErrorImage, "Este modelo já está cadastrado!");
            }
        } catch (error) {
            console.log("Erro ao cadastrar um modelo: ", error);
        }
    };
 

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Editar informações do Modelo"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="px-8 flex justify-between ">
                        <InputAndLabelModal
                               type="Text"
                               placeholder="Digite o nome..."
                               value={nome}
                               handleInput={handleInputChange}
                               handlerAtributeChanger={setNome}
                        >Nome</InputAndLabelModal>
                    </div>
                    <div className="px-8 flex justify-between">
                        <ComboBoxModal
                            dadosBanco={dadosCategoria.map(value => value.nome)}
                            value={categoria}
                            onChange={(e) => (e, setCategoria)}
                            handleChange={handleChangeCategoria}
                            disabled={true}
                        >Categoria</ComboBoxModal>
                        <ComboBoxModal
                          dadosBanco={dadosTipo.map(value => value.nome)}
                          value={tipo}
                          onChange={(e) => (e, setTipo)}
                          handleChange={handleChangeTipo}
                          disabled={true}
                        >Tipo</ComboBoxModal>
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

function AbrirModalEditModel(modelId, onUpdate) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditModel id={modelId} onUpdate={onUpdate} />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditModel;