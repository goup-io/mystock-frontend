import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'

import Button from '../../buttons/buttonsModal.js'
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada.js'
import ApiRequest from "../../../connections/ApiRequest.js"
import AbrirModalPaymentPix from '../../modals/modals-pagamento/modalPaymentPix.js'
const { useState, useEffect } = require("react");



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




function Pagamento({ idVenda }) {

    const [tipoPagamento, setTipoPagamento] = useState([]);
    const [venda, setVenda] = useState();
    const [dinheiro, setDinheiro] = useState(-1);
    const [pix, setPix] = useState(-1);

    async function fetchVenda() {

        try {
            const response = await ApiRequest.detalhamentosVendas(1);

            if (response.status === 200) {
                const dados = response.data;
                console.log(dados);
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

    useEffect(() => {
        fetchVenda();

        fetchTipoPagamento();
    },[]);

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
                                        infoDireita={"12:12:12"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Vendedor"}
                                        infoDireita={"Fabio O."}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Tp. de Venda"}
                                        infoDireita={"Varejo"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Quant. Itens"}
                                        infoDireita={"4"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Valor Total"}
                                        infoDireita={"R$ 400,00"}
                                    />
                                    <ItemSeparadoPorLinhaTracejada
                                        infoEsquerda={"Valor Pago"}
                                        infoDireita={"R$ 395,00"}
                                    />
                                </div>
                                <div className='text-left'>
                                    <p className='text-[1rem] font-medium'>Fluxo de pagamento</p>
                                    <div className='bg-[#CFD0D9] h-[20vh] flex flex-col gap-2 p-3 rounded-md overflow-y-auto'>
                                        <ItemSeparadoPorLinhaTracejada
                                            infoEsquerda={"1. Dinheiro"}
                                            infoDireita={"R$ 35,00  1x"}
                                        />
                                        <ItemSeparadoPorLinhaTracejada
                                            infoEsquerda={"2. Crédito"}
                                            infoDireita={"R$ 350,00  4x"}
                                        />
                                        <ItemSeparadoPorLinhaTracejada
                                            infoEsquerda={"3. Débito"}
                                            infoDireita={"R$ 10,00  1x"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <hr className='border-2 border-[#8E9BAB] my-2' />
                                <div className="flex flex-row justify-between">
                                    <p className="text-left font-semibold text-[1.6rem]">Restante à Pagar: </p>
                                    <p className="text-left font-semibold text-[1.5rem]">R$ --{ }</p>
                                </div>
                            </div>
                        </div>
                        <div style={div2} className="flex flex-col text-2xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-md duration-150 ease-in-out hover:scale-[1.02] hover:bg-[#E1E1E1]">
                            <p>DINHEIRO</p>
                            <p>F1</p>
                        </div>
                        <div style={div3} className="flex flex-col text-2xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-md duration-150 ease-in-out hover:scale-[1.02] hover:bg-[#E1E1E1]">
                            <p>CARTÃO</p>
                            <p>F2</p>
                        </div>
                        <div style={div4} onClick={() => AbrirModalPaymentPix(1,pix,1,0.0,venda.valorTotal,venda.valorTotal - 0.0)} className="flex flex-col text-2xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-md duration-150 ease-in-out hover:scale-[1.02] hover:bg-[#E1E1E1]">
                            <p>PIX</p>
                            <p>F3</p>
                        </div>
                    </div>
                </CaixaTexto>
            </div>
        </PageLayout>
    )
}

export default Pagamento