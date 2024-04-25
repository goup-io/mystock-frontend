
import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import TabelaModal from '../../tables/tableModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ModalCadastreKit() {

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

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[26rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
           <div className='w-[35.3rem]'>
           <HeaderModal
                props="Adicionar no Estoque Kit Pré-Cadastrado"
            >
            </HeaderModal>
           </div>
            <div className="w-[35.3rem] h-[2rem] flex justify-end ">
                <InputSearcModal
                    props="text"
                >Pesquisar</InputSearcModal>
            </div>
            <div className='w-[35.3rem] h-[16rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>
                <TabelaModal colunas={colunas} dados={dados} edit remove iptQuantidade></TabelaModal>
            </div>
            <div className="w-[35.3rem] flex justify-end items-end mt-1 h-7">
                <ButtonClear>Limpar</ButtonClear>
                <ButtonModal>Cadastrar</ButtonModal>
            </div>

        </div>

    );
}

function AbrirModalCadastreKit() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalCadastreKit />,
        width: "auto",
        heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalCadastreKit;