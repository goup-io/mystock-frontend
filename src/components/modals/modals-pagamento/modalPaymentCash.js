import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada';
import React, { useState, useEffect } from 'react';
import ButtonModalFull from "../../buttons/buttonModalFull";
import ApiRequest from "../../../connections/ApiRequest.js"

function ModalPaymentCash({ idVenda, idTipoPagamento, qtdParcelas, valorPagoAteAgora, valorTotal, valorRestante, onFinalizar }) {
    const [valorAPagar, setValorAPagar] = useState(0);
    const [valorRecebido, setValorRecebido] = useState('');
    const [valorTotalCompra, setValorTotalCompra] = useState(valorTotal ? valorTotal : 0);
    const [valorPagoAteAgora2, setValorPagoAteAgora] = useState(valorPagoAteAgora ? valorPagoAteAgora : 0);
    const [troco, setTroco] = useState(0.00);
    const [valorQueResta, setValorRestante] = useState(valorTotal - valorPagoAteAgora ? valorTotal - valorPagoAteAgora : 0);

    const handleValorAPagarChange = (e) => {
        setValorAPagar(Number(e.target.value));
        console.log('Valor a pagar:', valorAPagar);
    };

    const handleValorRecebidoChange = (e) => {
        const valor = (Number(e.target.value));
        setValorRecebido(valor);
        const trocoCalculado = valor - valorAPagar;
        setTroco(trocoCalculado > 0 ? trocoCalculado : 0.00);
        console.log('Troco calculado:', trocoCalculado);
    };

    function handleFinalizarPagamento() {
        const novoValorRestante = valorRestante - valorAPagar;
        setValorRestante(novoValorRestante);
        realizarPagamento();
    }


    async function realizarPagamento() {
        try {
            const response = await ApiRequest.pagamentoCreate(idTipoPagamento, idVenda, valorAPagar, 1);
            if (response.status === 201) {
                const dados = response.data;
                console.log("Dados do pagamento", dados)
                setValorRestante(dados.valorRestante)
                console.log("valor restante", dados.valorRestante)
                Swal.fire({
                    title: "Pagamento finalizado ",
                    text: `Pagamento de ${valorRecebido} finalizado com sucesso, devolva um troco de ${troco}`,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    onFinalizar();
                })
            }
        } catch (error) {
            console.log("Erro ao gerar pagamento", error);
        }
    }


    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[23rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
            <div className="w-[40rem]">
                <HeaderModal props="PAGAMENTO EM DINHEIRO"></HeaderModal>
            </div>
            <div className="w-[40rem] h-[15rem] flex flex-col rounded justify-start items-center p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">
                <div className="w-[40rem] h-[5rem] flex justify-around">
                    <InputAndLabelModal
                        placeholder="Digite o valor aqui..."
                        type="number"
                        value={valorAPagar}
                        handleInput={handleValorAPagarChange}
                    >
                        Valor a Pagar:
                    </InputAndLabelModal>
                    <InputAndLabelModal
                        placeholder="Digite o valor aqui..."
                        type="number"
                        value={valorRecebido}
                        handleInput={handleValorRecebidoChange}
                    >
                        Valor Recebido:
                    </InputAndLabelModal>
                </div>
                <div className="w-[36rem] h-[6rem]">
                    <div className="border-[1px] border-dashed mb-4 border-[#355070] rounded"></div>
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda={"Valor total da compra:"}
                        infoDireita={`R$ ${valorTotalCompra.toFixed(2)}`}
                    />
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda={"Valor pago (até agora):"}
                        infoDireita={`R$ ${valorPagoAteAgora2.toFixed(2)}`}
                    />
                    <ItemSeparadoPorLinhaTracejada
                        infoEsquerda={"Valor restante:"}
                        infoDireita={`R$ ${(valorTotalCompra - valorPagoAteAgora2).toFixed(2)}`}
                    />
                    <li className="flex flex-row justify-between">
                        <p className="text-sm font-bold">Troco em Dinheiro:</p>
                        <p className="text-sm font-bold">{`R$ ${troco}`}</p>
                    </li>
                    <div className="w-full h-[0.1rem] bg-[#355070] mt-4"></div>
                </div>
            </div>
            <div className="w-[40rem] flex justify-end h-6">
                <ButtonModalFull funcao={handleFinalizarPagamento}>Finalizar</ButtonModalFull>
            </div>
        </div>
    );
}

function AbrirModalPaymentCash(idVenda, idTipoPagamento, qtdParcelas, valorPagoAteAgora, valorTotal, valorRestante, onFinalizar) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentCash
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

export default AbrirModalPaymentCash;
