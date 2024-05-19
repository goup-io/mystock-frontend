
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import ComboBoxModal from "../smallComboBoxModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from "react";
import ApiRequest from "../../../connections/ApiRequest";

function ModalEditModel() {

    const [dadosCategoria, setDadosCategoria] = useState([]);
    const [dadosTipo, setDadosTipo] = useState([]);
    const [nome, setNome] = useState("");
    const [codigo, setCodigo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [loading, setLoading] = useState(true);
 
    const setters = [setNome, setCodigo, setCategoria, setTipo];
 
    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);
 
    }
 
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };
 
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };
 
 
    async function fetchDados() {
        setLoading(true);
        await ApiRequest.categoriaGetAll().then((response) => {
            if (response.status === 200) {
                setDadosCategoria(response.data);
                console.log(dadosCategoria);
            }
        }).catch((error) => {
            console.log("Erro ao buscar os dados", error)
        })
 
        await ApiRequest.tipoGetAll().then((response) => {
            if (response.status === 200) {
                setDadosTipo(response.data)
                setLoading(false);
            }
        }).catch((error) => {
            console.log("caiu aqui", error)
        })
        setLoading(false);
    }
 
    useEffect(() => {
        fetchDados();
    },[])
 
 
    const handleSave = () => {
        // usando a function find do javascript para percorrer uma lista de objetos baseado na verificação de uma key
        const categoriaObj = dadosCategoria.find(objCategoria => objCategoria.nome === categoria);
        const idCategoria = categoriaObj ? categoriaObj.id : null;
        
        const tipoObj = dadosTipo.find(objTipo => objTipo.nome === tipo);
        const idTipo = tipoObj ? tipoObj.id : null;
    
        if(!idCategoria || !idTipo || !nome || !codigo ){
            //todo: acionar modal de cadastro incorreto
            alert("Preencha todos os campos corretamente")
            return;
        }
        
        const objetoAdicionado = {
            nome,
            codigo,
            idCategoria,
            idTipo
        };
 
            ApiRequest.modeloCreate(objetoAdicionado).then((response) => {
                if (response.status === 201) {
                    alert("Modelo Cadastrado!!")
                    //todo: mostrar modal de sucesso ao cadastrar
                }
            }).catch((error) => {
                console.log("Erro ao cadastrar um modelo: ", error)
                //todo: mostrar modal de erro ao cadastrar
            });
       
    }
 

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Editar informações do Modelo"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className="flex justify-around ">
                        <InputAndLabelModal
                             type="Text"
                             placeholder="Digite o código..."
                             value={codigo}
                             handleInput={handleInputChange}
                             handlerAtributeChanger={setCodigo}
                        >Código</InputAndLabelModal>
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
                    <ButtonModal
                     
                    >Cadastrar</ButtonModal>
                </div>
            </div>
        </>
    );
}

function AbrirModalEditModel() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditModel />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditModel;