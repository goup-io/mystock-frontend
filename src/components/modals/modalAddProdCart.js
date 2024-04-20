
import InputSearcModal from '../inputs/inputSearchModal';
import HeaderModal from '../modals/headerModal';
import ButtonClear from '../buttons/buttonClear';
import ButtonModal from '../buttons/buttonsModal';
import Tabela from '../tables/tableModal';
import React, { useState, useEffect } from 'react';


export default function ModalAddProdCart() {

  const [colunas, setColunas] = useState([]);
  const [dados, setDados] = useState([]);

  useEffect(() => {

    const colunasDoBanco = ['Cod.', 'Nome', 'Modelo', 'tam.', 'cor', 'preço', 'loja', 'N.Itens'];

    const dadosDoBanco = [
      { id: 1, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 2, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 3, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 4, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 5, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 6, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 7, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 8, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 9, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
      { id: 10, coluna1: 'papete', coluna2: 'papete', coluna3: '37', coluna4: 'vermelho', coluna5: '200,00', coluna6: 'Pérola', coluna7: '20' },
    ];

    setColunas(colunasDoBanco);

    setDados(dadosDoBanco);

  }, []);

  return (

    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[24rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
      <HeaderModal
        props="Adicionar Produto no Carrinho"
      >
      </HeaderModal>
      <div className="w-[32rem] h-[2rem] flex justify-end ">
        <InputSearcModal
          props="text"
        >Pesquisar</InputSearcModal>
      </div>
      <div className='w-[32rem] h-[16rem] bg-slate-700 overflow-y-auto'>
        <Tabela colunas={colunas} dados={dados} iptQuantidade></Tabela>
      </div>
      <div className="w-[32rem] flex justify-end items-end mt-1 h-7">
        <ButtonClear>Limpar</ButtonClear>
        <ButtonModal>Cadastrar</ButtonModal>
      </div>

    </div >

  );
}