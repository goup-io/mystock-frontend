import ButtonModalFull from "../../buttons/buttonModalFull";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada';
import React, { useState } from 'react';

function ModalPaymentPix({ valorTotal, valorPagoAteAgora, onFinalizar }) {
    const [valorPagar, setValorPagar] = useState(0);
    const [valorRestante, setValorRestante] = useState(valorTotal - valorPagoAteAgora);

    const handleInputChange = (e) => {
        setValorPagar(Number(e.target.value));
    };

    const handleFinalizar = () => {
        const novoValorRestante = valorRestante - valorPagar;
        setValorRestante(novoValorRestante);
        onFinalizar(novoValorRestante); // Chama a função de callback passando o novo valor restante
    };

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
                        value={valorPagar}
                        handleInput={handleInputChange}
                    >
                        Valor a Pagar:
                    </InputAndLabelModal>
                </div>
                <div className="w-[36rem] h-[6rem] mt-2">
                    <div className="border-[1px] border-dashed mb-4 border-[#355070] rounded"></div>
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda="Valor total da compra:"
                        infoDireita={`R$ ${valorTotal.toFixed(2)}`}
                    />
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda="Valor pago (até agora):"
                        infoDireita={`R$ ${valorPagoAteAgora.toFixed(2)}`}
                    />
                    <li className="flex flex-row justify-between">
                        <p className="text-sm font-bold">Valor Restante:</p>
                        <p className="text-sm font-bold">{`R$ ${valorRestante.toFixed(2)}`}</p>
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

function AbrirModalPaymentPix({ valorTotal, valorPagoAteAgora, onFinalizar }) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentPix
            valorTotal={valorTotal}
            valorPagoAteAgora={valorPagoAteAgora}
            onFinalizar={onFinalizar}
        />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentPix;
