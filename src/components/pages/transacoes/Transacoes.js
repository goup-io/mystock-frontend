import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'
import { Button } from '@mui/material'
import ButtonClear from '../../buttons/buttonClear.js'
import ButtonModal from '../../buttons/buttonsModal.js'
import ComboBoxFilter from '../../inputs/comboBoxFilter.js'
import InputFilterDate from '../../inputs/inputFilterDate.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import React, { useState, useEffect } from 'react';
import Filter from '../../inputs/filter.js'


function Transacoes() {

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

        const colunasDoBanco = ['Data', 'Solicitante', 'Destinatário', 'Produto', 'Modelo', 'Tamanho', 'N.Solic.', 'N.Lib.', 'Liberador','Coletor', 'Status'];

        const dadosDoBanco = [
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
            { id: '24/02/2024', coluna1: 'Pérola Vip', coluna2: 'Universo', coluna4: 'triple Black', coluna5: 'Air Force', coluna6: 39, coluna7: 20, coluna8: 20, coluna9:'Emilly', coluna10: 'José',coluna11: 'pendente'},
        ];

        setColunas(colunasDoBanco);

        setDados(dadosDoBanco);

    }, []);

    return(
        <>
            <PageLayout>
                <Header telaAtual="Área de Transações"></Header>

                <div className='w-full flex md:flex-row md:justify-center rounded-md mt-4 py-4 px-10  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter modelo cor tamanho status data></Filter>
                </div>

                <div className='bg-white mt-4 h-full flex flex-col gap-3 py-4 px-10 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] rounded-md'>
                    <div className='w-full flex justify-between items-center '>

                        <div className='flex items-center gap-4'>
                            <button 
                                className={`bg-inherit px-1 ${isHistoricoSelected ? 'font-medium text-lg border-b-2 border-[#355070]' : 'font-light text-sm'}`} 
                                onClick={handleHistoricoButtonClick}>
                                HISTÓRICO
                            </button>
                            <button 
                                className={`bg-inherit px-1 ${!isHistoricoSelected ? 'font-medium text-lg border-b-2 border-[#355070] ' : 'font-light text-sm'}`}
                                onClick={handlePendentesButtonClick}>
                                PENDENTES DE APROVAÇÃO
                            </button>
                        </div>

                        <InputSearcModal props="text">Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[70%] flex justify-center items-center '>
                        <div className=' w-full h-full border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunas} dados={dados} id={0}></TabelaPage>
                        </div>
                    </div>
                </div>

            </PageLayout>
        </>
    )
}

export default Transacoes