
import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import TabelaModal from '../../tables/tableModal';


export default function ModalAddKitCart() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {

        const colunasDoBanco = ['Cod.', 'Modelo', 'N.Itens', 'Cor' ];

        const dadosDoBanco = [
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
            { id: 1, coluna1: 'papete', coluna2: 20 , coluna4: 'vermelho'},
        ];

        setColunas(colunasDoBanco);

        setDados(dadosDoBanco);

    }, []);

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[37rem] h-[26rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
           <div className='w-[35rem]'>
           <HeaderModal
                props="Adicionar Kit no Carrinho"
            >
            </HeaderModal>
           </div>
            <div className="w-[35rem] h-[2rem] flex justify-end ">
                <InputSearcModal
                    props="text"
                >Pesquisar</InputSearcModal>
            </div>
            <div className='w-[35rem] h-[16rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>
                <TabelaModal colunas={colunas} dados={dados} iptQuantidade></TabelaModal>
            </div>
            <div className="w-[35rem] flex justify-end items-end mt-1 h-7">
                <ButtonClear>Limpar</ButtonClear>
                <ButtonModal>Cadastrar</ButtonModal>
            </div>

        </div>

    );
}