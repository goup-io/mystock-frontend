import { useState } from "react";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "./headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../connections/ApiRequest";
import Alert from "../alerts/Alert";


function ModalRejeitarTransferencia({ idTransferencia, funcaoUpdateTable }) {

    const [usuario, setUsuario] = useState('');

    const clearFields = () => {
        setUsuario('');
    }

    function handleInputChange(event, setStateFunction) {
        setStateFunction(event.target.value);
    }

    async function rejeitarTransferencia() {
        const requestBody = {
            cod_liberador: usuario,
        }

        try {
            const response = await ApiRequest.transferenciaRejeitar(idTransferencia, requestBody);
            if (response.status === 200) {
                funcaoUpdateTable();
                Alert.alertTop(false, "Transferência negada com sucesso!");
            } else {
                Alert.alertError("Erro ao negar transferência", response.response.data.message);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }


    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[15rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[43rem]">
                    <HeaderModal props="Rejeitar Tranferência" />
                </div>
                <div className="w-[43rem] h-[7rem] flex flex-col rounded justify-around p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                    <div className="flex justify-around">
                        <div className="w-full h-1/3 flex">
                            <div className="flex w-full flex-col justify-start items-start">
                                <p className="form-floating text-lg text-black mb-2 font-normal">Código de usuário:</p>
                                <input
                                    value={usuario}
                                    onChange={(e) => { handleInputChange(e, setUsuario) }}
                                    type='number'
                                    placeholder='Digite o seu código de usuário...'
                                    className="w-full h-7 rounded bg-[F5F3F4] pl-2 text-[1rem] font-[300] capitalize text-[#555] form-control border border-[0.1rem] border-slate-600"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[43rem] flex justify-end h-6 gap-2">
                    <ButtonModal cor="#919191" funcao={clearFields}>Limpar</ButtonModal>
                    <ButtonModal funcao={rejeitarTransferencia}>Rejeitar</ButtonModal>
                </div>
            </div>

        </>
    );
}

function AbrirModalRejeitarTransferencia(idTransferencia, funcaoUpdateTable) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalRejeitarTransferencia idTransferencia={idTransferencia} funcaoUpdateTable={funcaoUpdateTable} />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalRejeitarTransferencia;
