import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'

import Button from '../../buttons/buttonsModal.js'
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada.js'
import ApiRequest from "../../../connections/ApiRequest.js"
import AbrirModalPaymentPix from '../../modals/modals-pagamento/modalPaymentPix.js'
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';






//MODAIS
import PaymentCashModal from '../../modals/modals-pagamento/modalPaymentCash.js'
import PaymentCardModal from '../../modals/modals-pagamento/modalPaymentCard.js'
import PaymentPixModal from '../../modals/modals-pagamento/modalPaymentPix.js'

var divPai = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(9, 1fr)",
    gridColumnGap: "25px",
    gridRowGap: "25px",
    padding: "20px",
}

var div1 = {
    gridArea: "1 / 1 / 10 / 7",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

var div2 = {
    gridArea: "7 / 7 / 10 / 9",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

var div3 = {
    gridArea: "4 / 7 / 7 / 9",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

var div4 = {
    gridArea: "1 / 7 / 4 / 9",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

function CaixaTexto(props) {
    return (
        <>
            <p className="text-left font-semibold text-xl">{props.titulo != undefined ? props.titulo : "SEM TITULO"}</p>
            <div className="bg-[#F5F3F4] w-full h-[65vh] rounded-md">
                {props.children}
            </div>
        </>
    )
}




function Pagamento() {

    //FLUXO DE PAGAMENTO

    const [tipoPagamento, setTipoPagamento] = useState([]);
    const [venda, setVenda] = useState();
    const [dinheiro, setDinheiro] = useState(-1);
    const [pix, setPix] = useState(-1);
    const [valorTotal, setValorTotal] = useState(0);
    const [valorPago, setValorPago] = useState(0);
    //const [valorRestante, setValorRestante] = useState(0);

    const { idVenda } = useParams();
    const location = useLocation();
    const { state } = location;
    const vendaId = state ? state.idVenda : null;

    const [fluxoPagamento, setFluxoPagamento] = useState([]);

    async function fetchVenda() {

        try {
            const response = await ApiRequest.detalhamentosVendas(idVenda);


            if (response.status === 200) {
                const dados = response.data;
                setVenda(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }



    async function fetchTipoPagamento() {

        try {
            const response = await ApiRequest.getTipoPagamento();

            if (response.status === 200) {
                const dados = response.data;


                const idPix = dados.filter((tipoVenda) => tipoVenda.metodo.toUpperCase() === "PIX")
                const idDinheiro = dados.filter((tipoVenda) => tipoVenda.metodo.toUpperCase() === "DINHEIRO")

                setPix(idPix[0].id);
                setDinheiro(idDinheiro[0].id);
                setTipoPagamento(dados);

            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    const navigate = useNavigate();

    async function fetchFluxoPagamento() {
        try {
            const response = await ApiRequest.getPagamentoFluxoCaixa(idVenda);
            if (response.status === 200) {
                const dados = response.data;
                var valorPago2 = 0;
                // var valorRestante = 0;
                dados.forEach((pagamento) => {
                    valorPago2 += pagamento.valor;
                    console.log("pagamentos"+pagamento.valor)
                    
                });
                //valorRestante = venda ? venda.valorTotal - valorPago : 0;
                setValorPago(valorPago2);
                //setValorRestante(valorRestante);
                setFluxoPagamento(dados);

            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }
    
    

    async function finalizarVenda() {

        var valorRestanteTemp = 0;
        var valorTotalTemp = 0;
        var valorPagoTemp = 0;

        try {
            const response = await ApiRequest.getPagamentoFluxoCaixa(idVenda);
            if (response.status === 200) {
                const dados = response.data;
                var valorPago2 = 0;
                dados.forEach((pagamento) => {
                    valorPago2 += pagamento.valor;
                });

                valorPagoTemp = valorPago2;
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }


        try {
            const response = await ApiRequest.detalhamentosVendas(idVenda);

            if (response.status === 200) {
                const dados = response.data;
                valorTotalTemp = dados.valorTotal
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }


        if ((valorTotalTemp - valorPagoTemp) === 0) {
            try {
                const response = await ApiRequest.pagamentoFinalizar(idVenda);
                if (response.status === 200) {
                    const dados = response.data;
                    Swal.fire({
                        title: "Venda finalizada",
                        text: `Pagamento de R$ ${valorTotal} finalizado com sucesso`,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    navigate("/venda/caixa");

                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

    }

    const fetchPagamentoRealizado = () => {
        fetchVenda();
        fetchTipoPagamento();
        fetchFluxoPagamento();
        finalizarVenda();
    }


    useEffect(() => {
        fetchVenda();
        fetchTipoPagamento();
        fetchFluxoPagamento();
    }, []);


    useEffect(() => {
        setValorTotal(venda ? venda.valorTotal : 0);
    }, [venda]);



    return (
        <PageLayout>
            <Header telaAtual="Área de Venda - Pagamento" tipo="caixa" />
            <div className="bg-[#fff] w-full h-[75vh] shadow-sm rounded-md px-12 py-6">
                <CaixaTexto titulo="PAGAR COM :">
                    <div style={divPai} className="h-full ">
                        <div style={div1} className="bg-[#E7E7E7] p-4 rounded-md flex flex-col justify-between gap-4 overflow-auto">
                            <div className="flex flex-row justify-between">
                                <p className="text-left font-semibold text-[1.1rem]">RESUMO DA VENDA</p>
                                <Button><p className="text-left font-semibold text-[1.1rem]">Editar Itens</p></Button>
                            </div>
                            <div className="flex flex-col justify-between gap-4 overflow-auto pr-2">
                                <div className="flex flex-col gap-2">
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Horario"}
                                        infoDireita={venda ? venda.hora : "00:00:00"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Vendedor"}
                                        infoDireita={venda ? venda.nomeVendedor : "Vendedor"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Tp. de Venda"}
                                        infoDireita={venda ? venda.tipoVenda : "Venda"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Quant. Itens"}
                                        infoDireita={venda ? venda.qtdItens : "0"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Valor Total"}
                                        infoDireita={venda ? "R$ " + venda.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "R$ 0,00"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Valor Pago"}
                                        infoDireita={"R$ " + valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    />
                                </div>
                                <div className='text-left'>
                                    <p className='text-[1rem] font-medium'>Fluxo de pagamento</p>
                                    <div className='bg-[#CFD0D9] h-[20vh] flex flex-col gap-2 p-3 rounded-md overflow-y-auto'>
                                        {fluxoPagamento && fluxoPagamento.map((pagamento, index) =>
                                            <ItemSeparadoPorLinhaTracejada
                                                infoEsquerda={(index + 1) + " " + pagamento.tipoPagamento}
                                                infoDireita={"R$ " + pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + pagamento.qtdParcelas + "x"}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <hr className='border-2 border-[#8E9BAB] my-2' />
                                <div className="flex flex-row justify-between">
                                    <p className="text-left font-semibold text-[1.6rem]">Restante à Pagar: </p>
                                    <p className="text-left font-semibold text-[1.5rem]">{"R$" + (valorTotal - valorPago).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                        </div>

                        <div style={div2} className="flex flex-col text-2xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-md duration-150 ease-in-out hover:scale-[1.02] hover:bg-[#E1E1E1]">
                            <a onClick={() => PaymentCashModal(idVenda,dinheiro,1,valorPago,venda ? venda.valorTotal : 0, (valorTotal - valorPago),fetchPagamentoRealizado)}>
                                <p>DINHEIRO</p>
                                <p>(F1)</p>
                            </a>
                        </div>

                        <div style={div3} className="flex flex-col text-2xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-md duration-150 ease-in-out hover:scale-[1.02] hover:bg-[#E1E1E1]">
                            <a onClick={() => PaymentCardModal}>
                                <p>CARTÃO</p>
                                <p>(F2)</p>
                            </a>
                        </div>
                        <div style={div4} onClick={() => AbrirModalPaymentPix(idVenda, pix, 1, valorPago, venda ? venda.valorTotal : 0, (valorTotal - valorPago), fetchPagamentoRealizado)} className="flex flex-col text-2xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-md duration-150 ease-in-out hover:scale-[1.02] hover:bg-[#E1E1E1]">
                            <p>PIX</p>
                            <p>(F3)</p>
                        </div>
                    </div>
                </CaixaTexto>
            </div>
        </PageLayout>
    )
}

export default Pagamento