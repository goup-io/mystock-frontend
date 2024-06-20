import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada';
import React, { useState } from 'react';
import ButtonModalFull from "../../buttons/buttonModalFull";
import ComboBoxModal from "../smallComboBoxModal";

function ModalPaymentCard() {
    const [valorAPagar, setValorAPagar] = useState('');
    const [qtdParcelas, setQtdParcelas] = useState('');
    const [valorTotalCompra, setValorTotalCompra] = useState(10.00); // Exemplo de valor total da compra
    const [valorPagoAteAgora, setValorPagoAteAgora] = useState(20.00); // Exemplo de valor pago até agora

    const handleValorAPagarChange = (e) => {
        setValorAPagar(e.target.value);
    };

    const handleQtdParcelasChange = (e) => {
        setQtdParcelas(e.target.value);
    };

    const handleFinalizar = () => {
        // Lógica para finalizar o pagamento
        console.log('Pagamento finalizado');
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
            <div className="w-[40rem]">
                <HeaderModal props="PAGAMENTO EM CARTÃO"></HeaderModal>
            </div>
            <div className="w-[40rem] h-[20rem] flex flex-col rounded justify-around items-center p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                <div className="w-[40rem] h-[5rem] flex justify-around">
                    <ComboBoxModal>Tipo</ComboBoxModal>
                    <InputAndLabelModal
                        placeholder="Digite o valor aqui..."
                        text="number"
                        value={valorAPagar}
                        onChange={handleValorAPagarChange}
                    >
                        Valor a Pagar:
                    </InputAndLabelModal>
                </div>
                <div className="w-[40rem] h-[3rem] flex justify-start ml-[4rem] mb-12">
                    <InputAndLabelModal
                        placeholder="Digite número de parcelas..."
                        text="number"
                        value={qtdParcelas}
                        onChange={handleQtdParcelasChange}
                    >
                        Qtd. Parcelas:
                    </InputAndLabelModal>
                </div>
                <div className="w-[36rem] h-[6rem] mb-4">
                    <div className="border-[1px] border-dashed mb-4 border-[#355070] rounded"></div>
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda={"Valor total da compra:"}
                        infoDireita={`R$ ${valorTotalCompra.toFixed(2)}`}
                    />
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda={"Valor pago (até agora):"}
                        infoDireita={`R$ ${valorPagoAteAgora.toFixed(2)}`}
                    />
                    <li className="flex flex-row justify-between">
                        <p className="text-sm font-bold">Valor Restante:</p>
                        <p className="text-sm font-bold">{`R$ ${(valorTotalCompra - valorPagoAteAgora).toFixed(2)}`}</p>
                    </li>
                    <div className="w-full h-[0.1rem] bg-[#355070] mt-4"></div>
                </div>
            </div>
            <div className="w-[40rem] flex justify-end h-6">
                <ButtonModalFull onClick={handleFinalizar}>Finalizar</ButtonModalFull>
            </div>
        </div>
    );
}

function AbrirModalPaymentCard() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentCard />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentCard;
