import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import Filter from '../../inputs/filter.js'
import React, { useState, useEffect } from 'react';


function HistoricoVendasGerente() {

    const buttons = [
        { label: "NOVO PEDIDO", },
    ];

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);
    const [isHistoricoSelected, setIsHistoricoSelected] = useState(true);

    const handleHistoricoButtonClick = () => {
        setIsHistoricoSelected(true);
    };

    const handlePendentesButtonClick = () => {
        setIsHistoricoSelected(false);
    };

    useEffect(() => {
        const colunasDoBanco = ['Data', 'Solicitante', 'Destinatário', 'Cod.Modelo', 'Cor', 'Tamanho', 'N.Solic.', 'N.Lib.', 'Liberador', 'Coletor', 'Status'];

        const dadosDoBancoHistoricoCompleto = [
            { id: 1, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 2, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Pendente' },
            { id: 3, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 4, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Negado' },
            { id: 5, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 6, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Negado' },
            { id: 7, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 8, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 9, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 10, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Pendente' },
            { id: 11, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 12, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 13, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 14, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 15, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 16, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 17, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
            { id: 18, data: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9: 'Emilly', coluna10: 'José', status: 'Aceito' },
        ];

        setColunas(colunasDoBanco);
        setDados(dadosDoBancoHistoricoCompleto);
    }, []);

    const qtdTransferenciasPendente = dados.filter(dado => dado.status === 'Pendente').length;

    async function csvTransferencias() {
        alert("Implementar lógica csv!")
    }

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Transferências" buttons={buttons}></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data modelo produto tamanho status></Filter>
                </div>

                <ChartBox>
                    <div className='px-4 pt-1'>
                        <div className='w-full h-[8%] flex justify-between items-center '>
                            <div className='flex items-center gap-4'>
                                <button
                                    className={`bg-inherit px-1 ${isHistoricoSelected ? 'font-medium text-lg border-b-2 border-[#355070]' : 'font-light text-sm'}`}
                                    onClick={handleHistoricoButtonClick}>
                                    HISTÓRICO
                                </button>
                                <div className='flex items-center'>
                                    <button
                                        className={`bg-inherit px-1 ${!isHistoricoSelected ? 'font-medium text-lg border-b-2 border-[#355070] ' : 'font-light text-sm'}`}
                                        onClick={handlePendentesButtonClick}>
                                        PENDENTES DE APROVAÇÃO
                                    </button>
                                    {qtdTransferenciasPendente > 0 && (
                                        <button className='bg-red-600 rounded-2xl w-4 h-4 mb-4 font-medium flex justify-center items-center text-white text-[0.7rem]'>
                                            {qtdTransferenciasPendente}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvTransferencias} ></ButtonDownLoad>
                            </div>
                        </div>
                        <div className='w-full h-[50vh] mt-2 flex justify-center items-center '>
                            <div className='w-full h-full border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                                {isHistoricoSelected ? (
                                    <TabelaPage colunas={colunas} dados={dados.filter(dado => dado.status !== 'Pendente').map(({ id, ...dados }) => dados)} />
                                ) : (
                                    <TabelaPage colunas={colunas} dados={dados.filter(dado => dado.status === 'Pendente').map(({ id, ...dados }) => dados)} negar aceitar />
                                )}
                            </div>
                        </div>
                    </div>
                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default HistoricoVendasGerente;
