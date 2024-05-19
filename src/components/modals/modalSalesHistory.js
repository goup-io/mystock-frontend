
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TabelaPage from "../tables/tablePage";
import ItemSeparadoPorLinhaTracejada from '../tables/ItemSeparadoPorLinhaTracejada'

import React, { useState, useEffect } from 'react';
import TabelaModal from "../tables/tableModal";

function ModalSalesHistory() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const colunasDoBanco = ['Código', 'Descrição ', 'Preço', 'Quantidade', 'Desconto Unitário', 'Preço Líquido', 'Subtotal'];
        const dadosDoBanco = [
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: '300,00', coluna4: '2', coluna5: '10,00', coluna6: '120,00', coluna7: '200,00' },
        ];

        setColunas(colunasDoBanco);
        setDados(dadosDoBanco);
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
                            infoDireita={"1234"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Data - Hora:"}
                            infoDireita={"22/10/2024 16:15:00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Vendedor:"}
                            infoDireita={"Emilly Mariana"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Tipo da Venda:"}
                            infoDireita={"Varejo"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Total de Itens:"}
                            infoDireita={"12"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Subtotal 1:"}
                            infoDireita={"R$ 300,00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Desconto em Produtos:"}
                            infoDireita={"R$ 10,00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Subtotal 2:"}
                            infoDireita={"R$ 20,00"}
                        />
                        <ItemSeparadoPorLinhaTracejada
                            infoEsquerda={"Desconto da Venda:"}
                            infoDireita={"R$ 250,00"}
                        />

                        <li className="flex flex-row justify-between">
                            <p className="text-sm font-bold">Valor Total:</p>
                            <p className="text-sm font-bold">R$ 200,00</p>
                        </li>


                        <div className="w-full h-[0.1rem] bg-[#355070] mt-2"></div>

                    </div>

                    <div className="w-[40rem] h-[13rem] flex flex-col justify-start mt-2 ">
                        <p className="w-[40rem] h-[0.7rem] text-base font-medium flex justify-start">Itens da Venda</p>

                        <div className=" w-[40rem] h-[10.5rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto mt-4">

                            <TabelaModal colunas={colunas} dados={dados} ></TabelaModal>

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

function AbrirModalSalesHistory() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalSalesHistory />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalSalesHistory;