
import InputSearcModal from '../inputs/inputSearchModal';
import HeaderModal from '../modals/headerModal';
import ButtonClear from '../buttons/buttonClear';
import ButtonModal from '../buttons/buttonsModal';
import Tabela from '../tables/tableModal';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputAndLabelModal from '../inputs/inputAndLabelModal';
import Input from '../inputs/inputAndLabelModal'


function ModalRequestProd() {

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

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
            <div className='w-[40rem]'>
                <HeaderModal
                    props="Solicitar Produto"
                >
                </HeaderModal>
            </div>
            <div className="w-[40rem] h-[2rem] flex justify-between items-center ">
              <div className='w-[15rem] flex justify-between'>
              <p>Cód. vendedor:</p>
               <input className='w-[7rem] h-6 border-[1px] border-slate-700 rounded-lg'></input>

              </div>
                <InputSearcModal
                    props="text"
                >Pesquisar</InputSearcModal>
            </div>
            <div className='w-[40rem] h-[19rem] border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded-md'>
                <Tabela colunas={colunas} dados={dados} edit remove iptQuantidade></Tabela>
            </div>
            <div className="w-[40rem] flex justify-end items-end mt-1 h-7">
                <ButtonClear>Limpar</ButtonClear>
                <ButtonModal>Solicitar</ButtonModal>
            </div>

        </div >

    );
}

function AbrirModalRequestProd() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalRequestProd />,
        //   width: "auto",
        //   heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalRequestProd;