import ButtonClear from '../../buttons/buttonClear.js'
import ButtonModal from '../../buttons/buttonsModal.js'
import Header from '../../header/Header.js'
import InputFilter from '../../inputs/inputFilter.js'
import InputFilterDate from '../../inputs/inputFilterDate.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'
import PageLayout from '../PageLayout.js'


import React, { useState, useEffect } from 'react';

function Estoque() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {

        const colunasDoBanco = ['Código', 'Nome', 'Modelo', 'Cor', 'Preço', 'Loja', 'N.Itens', 'teste'];

        const dadosDoBanco = [
            { id: 1, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20', coluna8: 'aaaaaa' },
            { id: 2, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 3, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 4, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 5, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 6, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 7, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 8, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 9, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 10, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 11, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 12, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 13, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 14, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
            { id: 15, coluna1: 'papete', coluna2: 'papete', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
        ];

        setColunas(colunasDoBanco);

        setDados(dadosDoBanco);

    }, []);

    return (
        <>
            <PageLayout>
                <Header telaAtual="Estoque"></Header>

                <div className=" w-full h-[4rem] flex flex-col rounded-md mt-4 p-2 shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] justify-around items-center text-sm bg-white">
                    <div className="w-full h-[2.5rem] flex justify-center ">
                        <div className="w-[40rem] mr-2 h-2/2 flex ">
                            <InputFilter
                                placeholder="selecione..."
                            >Modelo</InputFilter>
                            <InputFilter
                                placeholder="selecione..."
                            >Cor</InputFilter>
              
                            <InputFilter
                                placeholder="selecione..."
                            >Tamanho</InputFilter>
                        </div>
                        <div className="w-[21rem] h-2/2 flex ">
                            <InputFilterDate
                                type="text"
                                placeholder="HH:MM"
                                inicio="Preço de"
                                fim="á"
                            ></InputFilterDate>
                        </div>
                        <div className='w-[15rem] flex items-center ml-2 justify-between '>
                        <ButtonModal>Filtrar</ButtonModal>
                        <ButtonClear>Limpar</ButtonClear>
                        </div>
                        
                    </div>
                </div>

                <div className='bg-white mt-4 h-[30rem] flex flex-col justify-start items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)]'>
                    <div className='w-[80rem] h-[3rem] flex justify-between items-center'>
                       <p className=' font-medium text-2xl'>PRODUTOS</p>
                        <InputSearcModal
                            props="text"
                        >Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-[80rem] h-[22rem] mt-3 flex justify-center items-center bg-yellow-400'>
                        <div className=' w-full h-[23.5rem] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                            <TabelaPage colunas={colunas} dados={dados} edit remove></TabelaPage>
                        </div>
                    </div>
                    <div className='w-[27rem] h-[1.8rem] mr-[53.2rem] mt-7 flex justify-between'>
                        <ButtonModal>NOVO KIT</ButtonModal>
                        <ButtonModal>NOVO MODELO</ButtonModal>
                        <ButtonModal>NOVO PRODUTO</ButtonModal>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Estoque