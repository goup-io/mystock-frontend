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


function Transacoes() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

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

                <div className=" w-full h-[4rem] flex flex-col rounded-md mt-4 p-2 shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] justify-around items-center text-sm bg-white">
                    <div className="w-full h-[2.5rem] flex justify-center">
                        <div className="w-[60%] mr-2 h-2/2 flex justify-between items-center">

                            <div className='w-[15rem]'>
                                <ComboBoxFilter
                                    dadosBanco="teste"
                                >Modelo</ComboBoxFilter>
                            </div>
                            <div className='w-[13rem] '>
                                <ComboBoxFilter
                                    dadosBanco="teste"
                                >Cor</ComboBoxFilter>
                            </div>

                            <div className='w-[15rem] '>
                                <ComboBoxFilter
                                    dadosBanco="teste"
                                >Tamanho</ComboBoxFilter>
                            </div>

                            <div className='w-[14rem] '>
                                <ComboBoxFilter
                                    dadosBanco="teste"
                                >Status</ComboBoxFilter>
                            </div>

                        </div>
                        <div className=" w-[25%] h-2/2 flex justify-center ">
                            <InputFilterDate
                                type="text"
                                placeholder="HH:MM"
                                inicio="Data de"
                                fim="á"
                            ></InputFilterDate>
                        </div>
                        <div className='w-[15%] flex items-center ml-2 justify-evenly '>
                            <ButtonClear>Limpar</ButtonClear>
                            <ButtonModal>Filtrar</ButtonModal>
                        </div>

                    </div>
                </div>

                <div className='bg-white mt-4 h-[30rem] flex flex-col justify-start pl-10 pr-10 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)]'>
                    <div className='w-full h-[3rem] flex justify-between items-center'>

                        <div className='w-[22rem] flex justify-between items-center'>
                            <p className=' font-medium text-2xl'>HISTÓRICO</p>
                            <div className=' mt-1'>
                                <Button >Pendentes de aprovação</Button>
                            </div>
                        </div>

                        <InputSearcModal
                            props="text"
                        >Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[22rem] mt-3 flex justify-center items-center '>
                        <div className=' w-full h-[23.5rem] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                            <TabelaPage colunas={colunas} dados={dados} ></TabelaPage>
                        </div>
                    </div>
                </div>

            </PageLayout>
        </>
    )
}

export default Transacoes