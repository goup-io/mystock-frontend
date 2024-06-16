import ButtonModal from "../buttons/buttonsModal";
import HeaderModal from "../modals/headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ItemSeparadoPorLinhaTracejada from '../tables/ItemSeparadoPorLinhaTracejada'

import React, { useState, useEffect } from 'react';
import TabelaModal from "../tables/tableModal";
import ApiRequest from "../../connections/ApiRequest.js";

function ModalSalesHistory({idVenda}) {

    const [infosVenda, setInfosVenda] = useState([]);
    const [colunasItens, setColunasItens] = useState([]);
    const [dadosItens, setDadosItens] = useState([]);

    async function fetchData() {
        const colunas = ['Código', 'Descrição ', 'Preço Un.', 'Quantidade', 'Desconto Un.', 'Preço Líquido', 'Subtotal'];

        try{
            const response = await ApiRequest.vendaDetalhamentoGetById(idVenda);

            if (response.status === 200) {
                const dados = response.data;

                const filtrarProdutosVenda = dados.produtosVenda

                setInfosVenda(dados)
                setDadosItens(filtrarProdutosVenda);
                console.log(infosVenda, dadosItens);
            }

        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunasItens(colunas);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[34rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[42rem]">
                    <HeaderModal
                        props="Detalhamento da Venda"
                    ></HeaderModal>
                </div>
                <div className="w-[42rem] h-[28rem] flex flex-col rounded justify-start p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className=" w-[40rem] h-[14rem] ">

                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Código da Venda:"}
                            infoDireita={infosVenda.id}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Data - Hora:"}
                            infoDireita={`${infosVenda.data} ${infosVenda.hora}`}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Vendedor:"}
                            infoDireita={infosVenda.nomeVendedor}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Tipo da Venda:"}
                            infoDireita={infosVenda.tipoVenda}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Total de Itens:"}
                            infoDireita={infosVenda.qtdItens}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor Bruto:"}
                            infoDireita={infosVenda.valorBruto}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Desconto em Produtos:"}
                            infoDireita={infosVenda.descontoProdutos}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Valor Liquido:"}
                            infoDireita={infosVenda.valorLiquido}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Desconto da Venda:"}
                            infoDireita={infosVenda.descontoVenda}
                        />

                        <li className="flex flex-row justify-between">
                            <p className="text-sm font-bold">Valor Total:</p>
                            <p className="text-sm font-bold">{infosVenda.valorTotal}</p>
                        </li>

                        <div className="w-full h-[0.1rem] bg-[#355070] mt-2"></div>

                    </div>

                    <div className="w-[40rem] h-[13rem] flex flex-col justify-start mt-2 ">
                        <p className="w-[40rem] h-[0.7rem] text-base font-medium flex justify-start">Itens da Venda</p>

                        <div className="w-[40rem] h-[10.5rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto mt-4 rounded">
                            <TabelaModal colunas={colunasItens} dados={dadosItens} ></TabelaModal>
                        </div>

                    </div>

                </div>
                <div className="w-[42rem] flex justify-between h-6 ">
                    <ButtonModal cor="#6A8ACF">Histórico de pagamento</ButtonModal>
                    <div className="w-5/12 flex justify-between">
                        <ButtonModal cor="#919191">Cancelar Venda</ButtonModal>
                        <ButtonModal>Trocar Itens</ButtonModal>
                    </div>

                </div>
            </div>
        </>
    );
}

function AbrirModalSalesHistory(idVenda) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalSalesHistory idVenda={idVenda} />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalSalesHistory;