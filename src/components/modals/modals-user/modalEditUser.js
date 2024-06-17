
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal"
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import ComboBoxModal from "../smallComboBoxModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AbrirModalCadastreLogin from "../../modals/modals-user/modalCadastreLogin";
import { useEffect } from "react";
import { useState } from "react";
import ApiRequest from "../../../connections/ApiRequest";

function ModalEditUser({ id, onUpdate }) {

    // const navigate = useNavigate();

    const [dadosCargo, setDadosCargo] = useState([]);
    const [nomesCargos, setNomeCargos] = useState([]);
    const [dadosLoja, setDadosLoja] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [cargo, setCargo] = useState("");
    const [loja, setLoja] = useState("");
    const [loading, setLoading] = useState(true);
    const [idUser, setIdUser] = useState("");

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


    async function fetchDadosCargoLoja() {
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

    async function fetchUser() {
        try {
            const response = await ApiRequest.userGetAll(id);
            if (response.status === 200) {
                setNome(response.data.nome);
                setEmail(response.data.email);
                setCelular(response.data.celular);
                setCargo(response.data.cargo);
                setLoja(response.data.loja);
                setIdUser(response.data.idUser);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchDadosCargoLoja();
    }, [])


    const handleSave = async (idUser) => {
        // usando a function find do javascript para percorrer uma lista de objetos baseado na verificação de uma key
        const cargoObj = dadosCargo.find(objCargo => objCargo.nome === cargo);
        const idCargo = cargoObj ? cargoObj.id : null;

        const lojaObj = dadosLoja.find(objLoja => objLoja.nome === loja);
        const idLoja = lojaObj ? lojaObj.id : null;

        if (!idCargo || !idLoja || !nome || !email || !celular) {
            //todo: acionar modal de cadastro incorreto
            alert("Preencha todos os campos corretamente")
            return;
        }

        const objetoAdicionado = {
            nome,
            email,
            celular,
            idCargo,
            idLoja
        };

        try {
            const response = await ApiRequest.userUpdate(idUser, objetoAdicionado);
            console.log(response);
            if (response.status === 200) {
                Alert.alert(SucessImage, "Usuário atualizado!");
                onUpdate();
            } else if (response.status === 409) {
                Alert.alert(ErrorImage, "Este usuário já está cadastrado!");
            }
        } catch (error) {
            console.log("Erro ao cadastrar um usuário: ", error);
        }
    }


    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[40rem]">
                    <HeaderModal
                        props="Editar informações do Usuário"
                    ></HeaderModal>
                </div>
                <div className="w-[40rem] h-[16rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[0_10px_10px_2px_rgba(0,0.3,0.3,0.3)] border-gray-700">
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            placeholder="digite o nome..."
                        >Nome</InputAndLabelModal>
                        <InputAndLabelModal
                            placeholder="digite o email..."
                        >Email</InputAndLabelModal>
                    </div>
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            placeholder="digite o celular..."
                        >Celular</InputAndLabelModal>
                        <ComboBoxModal
                            dadosBanco={dadosCargo.map(value => value.nome)}
                            handleChange={handleChangeCargo}
                        // id={dadosCargo.map(value => value.id)}
                        >Cargo</ComboBoxModal>
                    </div>
                    <div className="flex justify-start ml-[1.6rem]">
                        <ComboBoxModal
                            dadosBanco={dadosLoja.map(value => value.nome)}
                            value={loja}
                            handleChange={handleChangeLoja}
                        >Loja</ComboBoxModal>
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

function AbrirModalEditUser(userId, onUpdate) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalEditUser id={userId} onUpdate={onUpdate} />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalEditUser;