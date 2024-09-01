import ButtonModalFull from "../../buttons/buttonModalFull";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada';
import React, { useEffect, useState } from 'react';
import ApiRequest from "../../../connections/ApiRequest.js"
import { Await } from "react-router-dom";
import AbrirModalPaymentWait from "./modalPaymentWait";
import { Alert } from "@mui/lab";
import Alertt from "../../alerts/Alert.js";


function ModalPaymentPix({ idVenda, idTipoPagamento, qtdParcelas,valorPagoAteAgora,valorTotal,valorRestante, onFinalizar}) {

    const [valorRealTotal, setValorTotal] = useState(valorTotal ? valorTotal : 0);
    const [valorPago, setValorPagoAteAgora] = useState(valorPagoAteAgora ? valorPagoAteAgora : 0);
    const [valorAPagar, setValorPagar] = useState(0);
    const [valorQueResta, setValorRestante] = useState(valorTotal - valorPagoAteAgora ? valorTotal - valorPagoAteAgora : 0);
    const [base64String, setBase64String] = useState("");

    const handleInputChange = (e) => {
        setValorPagar(Number(e.target.value));
        setValorRestante((valorRealTotal - valorPago) - Number(e.target.value))
    };

    const handleFinalizar = () => {

        if(valorAPagar + valorPago > valorRealTotal){
            return
        }

        const novoValorRestante = valorRestante - valorAPagar;
        setValorRestante(novoValorRestante);
        realizarPagamento();
    };

    function ImageComponent() {
        return (
            <img src={`data:image/jpeg;base64,${base64String}`} alt="Converted from base64" />
        );
    }


     async function realizarPagamento() {
        try {
            const response = await ApiRequest.pagamentoCreate(idTipoPagamento, idVenda, valorAPagar, 1);
            if (response.status === 201) {
                const dados = response.data;
                AbrirModalPaymentWait(dados.Base64QRCode,valorAPagar,onFinalizar);                
            }
        } catch (error) {
            console.log("Erro ao gerar pagamento", error);
        }
     }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
            <div className="w-[40rem]">
                <HeaderModal props="PAGAMENTO EM PIX" />
            </div>
            <div className="w-[40rem] h-[14rem] flex flex-col rounded justify-center items-center p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                <div className="w-[40rem] h-[5rem] flex justify-between ml-[4rem]">
                    <InputAndLabelModal
                        placeholder="Digite o valor aqui..."
                        text="number"
                        value={valorAPagar}
                        handleInput={handleInputChange}
                    >
                        Valor a Pagar:
                    </InputAndLabelModal>
                </div>
                <div className="w-[36rem] h-[6rem] mt-2">
                    <div className="border-[1px] border-dashed mb-4 border-[#355070] rounded"></div>
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda="Valor total da compra:"
                        infoDireita={`R$ ${valorRealTotal.toFixed(2) }`}
                    />
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda="Valor pago (até agora):"
                        infoDireita={`R$ ${valorPago.toFixed(2)}`}
                    />
                    <li className="flex flex-row justify-between">
                        <p className="text-sm font-bold">Valor Restante:</p>
                        { valorQueResta < 0 ? <p className="text-sm font-bold text-red-600">{`R$ ${valorQueResta.toFixed(2)}`}</p> : <p className="text-sm font-bold">{`R$ ${valorQueResta.toFixed(2)}`}</p> }
                    </li>
                    <div className="w-full h-[0.1rem] bg-[#355070] mt-4"></div>
                </div>
            </div>
            <div className="w-[40rem] flex justify-end h-6">
                <ButtonModalFull funcao={handleFinalizar}>Finalizar</ButtonModalFull>
            </div>
        </div>
    );
}

function AbrirModalPaymentPix( idVenda, idTipoPagamento, qtdParcelas,valorPagoAteAgora,valorTotal,valorRestante, onFinalizar) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentPix
            idVenda={idVenda}
            idTipoPagamento={idTipoPagamento}
            qtdParcelas={qtdParcelas}
            valorPagoAteAgora={valorPagoAteAgora}
            valorTotal={valorTotal}
            valorRestante={valorRestante}
            onFinalizar={onFinalizar}
        />,
        showConfirmButton: false,
        heightAuto: true,
    });
}



export default AbrirModalPaymentPix;
