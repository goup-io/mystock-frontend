
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputAndLabelModal from "../inputs/inputAndLabelModal";
import HeaderModal from "../modals/headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TabelaPage from "../tables/tablePage";

import React, { useState, useEffect } from 'react';
import TabelaModal from "../tables/tableModal";

function ModalSalesHistory() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const colunasDoBanco = ['Código', 'Nome', 'Modelo', 'Cor', 'Preço', 'Loja', 'N.Itens'];
        const dadosDoBanco = [
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12439, coluna1: 'papete duas tiras com brilho', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
        ];

        setColunas(colunasDoBanco);
        setDados(dadosDoBanco);
    }, []);

    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[40rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
                <div className="w-[42rem]">
                    <HeaderModal
                        props="Detalhamento da Venda"
                    ></HeaderModal>
                </div>
                <div className="w-[42rem] h-[34rem] flex flex-col rounded justify-start p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

                    <div className=" w-[40rem] h-[18rem] ">

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded  ">
                            <p className="mr-4 font-medium">Valor Atual:</p>
                            <p> R$ 230,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded ">
                            <p className="mr-4 font-medium">Valor Atual:</p>
                            <p> R$ 230,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded ">
                            <p className="mr-4 font-medium">Valor Atual:</p>
                            <p> R$ 230,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                        <div className="w-full h-[0.1rem]  bg-slate-500 mt-3"></div>

                        <div className="w-full h-[1rem]  flex items-center justify-between rounded">
                            <p className="mr-4 font-medium">Valor Após o Desconto: </p>
                            <p>R$ 200,00</p>
                        </div>

                    </div>

                    <div className="w-[40rem] h-[14rem] flex flex-col justify-start mt-4">
                    <h2 className="w-[40rem] h-[1rem] flex justify-start">Itens da Venda</h2>

                        <div className=" w-[40rem] h-[12rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto mt-4">

                            <TabelaModal colunas={colunas} dados={dados} ></TabelaModal>

                        </div>

                    </div>


                </div>
                <div className="w-[42rem] flex justify-end h-6 ">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal>Trocar Itens</ButtonModal>
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