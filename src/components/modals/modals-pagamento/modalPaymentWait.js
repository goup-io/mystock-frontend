import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TabelaPage from "../../tables/tablePage";
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada';
import imgPagamento from '../../../assets/paymentWait.png';
import imgLoading from '../../../assets/loading.png';

import React, { useEffect, useState } from 'react';
import TabelaModal from "../../tables/tableModal";
import ButtonModalFull from "../../buttons/buttonModalFull";
import { LoadingButton } from "@mui/lab";
import ApiRequest from "../../../connections/ApiRequest";


function ModalPaymentWait({ base64String, valorPago = 0, onFinalizar, idTipoPagamento, idVenda}) {
    const [base64, setBase64] = useState(base64String || '');
    const [valorTotalPago, setValorPago] = useState(valorPago ? valorPago : 0);

    useEffect(() => {
        if (valorPago) {
            setValorPago(valorPago);
        }
    }, [base64String, valorPago]);

    async function handleFinalizarPagamento() {

        const response = await ApiRequest.pagamentoCreate(idTipoPagamento, idVenda, valorPago, 1);
        if (response.status === 201) {

            Swal.fire({
                title: "Pagamento finalizado",
                text: `Pagamento de R$ ${valorTotalPago} finalizado com sucesso`,
                icon: "success",
                confirmButtonText: "OK",
            });
            onFinalizar();
        }
    }

    function handleCancelarPagamento() {
        Swal.close();
    }

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[20rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
                <img className="w-[12rem] h-[12rem]" src={base64.length > 0 ? `data:image/jpeg;base64,${base64}` : imgPagamento}></img>
                <img className="w-6 h-6 animate-spin" src={imgLoading}></img>
                <p>Aguardando finalização do pagamento...</p>
                <ButtonModal funcao={handleCancelarPagamento}>Cancelar</ButtonModal>

                {base64.length > 0 && <ButtonModal funcao={handleFinalizarPagamento}>Finalizar pagamento</ButtonModal>}
            </div>
        </>
    );
}

function AbrirModalPaymentWait(base64String, valorPago, onFinalizar, idTipoPagamento, idVenda) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentWait
            base64String={base64String}
            valorPago={valorPago}
            onFinalizar={onFinalizar}
            idTipoPagamento={idTipoPagamento}
            idVenda={idVenda}
        />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentWait;
