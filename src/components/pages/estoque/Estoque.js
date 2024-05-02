import { Button } from '@mui/material'
import ButtonClear from '../../buttons/buttonClear.js'
import ButtonModal from '../../buttons/buttonsModal.js'
import Header from '../../header/Header.js'
import ComboBoxFilter from '../../inputs/comboBoxFilter.js'
import InputFilterDate from '../../inputs/inputFilterDate.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import AbrirModalCadastreKit from '../../modals/modals-kit/modalCadastreKit.js'
import AbrirModalCadastreModel from '../../modals/modals-model/modalCadastreModel.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'
import AbrirModalCadastreUser from '../../modals/modals-user/modalCadastreUser.js'
import TabelaPage from '../../tables/tablePage.js'
import PageLayout from '../PageLayout.js'


import React, { useState, useEffect } from 'react';

function Estoque() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);
    const [isProdutoSelected, setIsProdutoSelected] = useState(true);
  
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
  
    const handleProdutoButtonClick = () => {
      setIsProdutoSelected(true);
    };
  
    const handleModeloButtonClick = () => {
      setIsProdutoSelected(false);
    };

return (
    <>
        <PageLayout>
            <Header telaAtual="Estoque"></Header>

            <div className=" w-full h-[6rem] flex flex-col rounded-md mt-4 p-2 shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] justify-around items-center text-sm bg-white">
                <div className="w-full h-[2.5rem] p-4 flex justify-center items-center ">
                    <div className="w-[52%]  h-2/2 flex justify-start items-center">

                        <div className='w-[32%]'>
                            <ComboBoxFilter
                                dadosBanco="teste"
                            >Modelo</ComboBoxFilter>
                        </div>
                        <div className='w-[28%] ml-4 '>
                            <ComboBoxFilter
                                dadosBanco="teste"
                            >Cor</ComboBoxFilter>
                        </div>

                        <div className='w-[34%] ml-4 '>
                            <ComboBoxFilter
                                dadosBanco="teste"
                            >Tamanho</ComboBoxFilter>
                        </div>

                    </div>
                    <div className=" w-[28%] h-2/2 flex justify-center">
                        <InputFilterDate
                            type="text"
                            placeholder="HH:MM"
                            inicio="Preço de"
                            fim="á"
                        ></InputFilterDate>
                    </div>
                    <div className='w-[16%] h-[4rem] ml-2 flex items-center justify-around '>
                        <ButtonClear>Limpar</ButtonClear>
                        <ButtonModal>Filtrar</ButtonModal>
                    </div>

                </div>
            </div>

            <div className='bg-white mt-4 h-[37rem] flex flex-col justify-around pl-10 pr-10 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='w-full h-[3rem] flex justify-between items-center'>

                    <div className='w-[18rem] flex justify-between items-center'>

                        <Button onClick={handleProdutoButtonClick}>
                            <span className={isProdutoSelected ? "text-black text-2xl font-medium" : "text-slate-500 text-xl font-medium"}>PRODUTOS</span>
                        </Button>
                        <Button onClick={handleModeloButtonClick}>
                            <span className={!isProdutoSelected ? "text-black text-2xl font-medium" : "text-slate-500 text-xl font-medium"}>MODELOS</span>
                        </Button>

                    </div>

                    <InputSearcModal
                        props="text"
                    >Pesquisar</InputSearcModal>
                </div>
                <div className='w-full h-[28rem] mb-2  flex justify-center items-center'>
                    <div className=' w-full h-[28rem] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                        {isProdutoSelected ? (
                            <TabelaPage colunas={colunas} dados={dados} edit remove />
                        ) : (
                            <TabelaPage colunas={colunas} dados={dados} edit remove />
                        )}
                    </div>
                </div>
                <div className='w-full h-[2.2rem] mb-3 flex justify-end '>
                    <div className='w-4/12 flex justify-between'>
                        <ButtonModal
                            funcao={AbrirModalCadastreKit}
                        >NOVO KIT</ButtonModal>
                        <ButtonModal
                            funcao={AbrirModalCadastreModel}
                        >NOVO MODELO</ButtonModal>
                        <ButtonModal
                            funcao={AbrirModalCadastreProd}
                        >NOVO PRODUTO</ButtonModal>
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
)
}

export default Estoque