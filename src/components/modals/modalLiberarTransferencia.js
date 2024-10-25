import { useState } from "react";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "./headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../connections/ApiRequest";
import Alert from "../alerts/Alert";


function ModalLiberarTransferencia({ idTransferencia, qtdSolicitadaTransf, funcaoUpdateTable }) {

    const [usuario, setUsuario] = useState('');
    const [qtdLiberada, setQtdLiberada] = useState(qtdSolicitadaTransf);

    const clearFields = () => {
        setUsuario('');
        setQtdLiberada(qtdSolicitadaTransf);
    }

    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);
    }

    async function aceitarTransferencia() {
        const requestBody = {
            cod_liberador: usuario,
            quantidadeLiberada: qtdLiberada
        }

        try {
            const response = await ApiRequest.transferenciaAprovar(idTransferencia, requestBody);
            if (response.status === 200) {
                funcaoUpdateTable();
                Alert.alertTop(false, "Transferência aceita com sucesso!");
            } else {
                Alert.alertError("Erro ao aceitar transferência", response.response.data.message);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }


    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[15rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[43rem]">
                    <HeaderModal props="Liberar Tranferência" />
                </div>
                <div className="w-[43rem] h-[7rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                        <InputAndLabelModal
                            type="number"
                            placeholder="digite o seu código de usuário..."
                            value={usuario}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setUsuario}
                        >Código de usuário:</InputAndLabelModal>

                        <InputAndLabelModal
                            type="number"
                            placeholder="digite a quantidade liberada..."
                            value={qtdLiberada}
                            handleInput={handleInputChange}
                            handlerAtributeChanger={setQtdLiberada}
                        >Quantidade liberada:</InputAndLabelModal>
                    </div>
                </div>
                <div className="w-[43rem] flex justify-end h-6 gap-2">
                    <ButtonModal cor="#919191" funcao={clearFields}>Limpar</ButtonModal>
                    <ButtonModal funcao={aceitarTransferencia}>Aprovar transferência</ButtonModal>
                </div>
            </div>

        </>
    );
}

function AbrirModalLiberarTransferencia(idTransferencia, qtdSolicitadaTransf, funcaoUpdateTable) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalLiberarTransferencia idTransferencia={idTransferencia} qtdSolicitadaTransf={qtdSolicitadaTransf} funcaoUpdateTable={funcaoUpdateTable} />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalLiberarTransferencia;
