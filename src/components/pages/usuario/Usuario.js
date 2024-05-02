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
import ApiRequest from '../../../connections/ApiRequest.js'



import React, { useState, useEffect } from 'react';

async function csvTodosUsuarios() {
    const response = await ApiRequest.getCsvUsuario();
    if (response.status === 200) {
        const csvData = new TextDecoder('utf-8').decode(new Uint8Array(response.data));
        const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Funcionarios.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(csvData);
    }
}

function Usuario() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {

        const colunasDoBanco = ['Código', 'Nome', 'Email', 'Celular', 'Cargo', 'Loja', 'Usuario'];

        const dadosDoBanco = [
            { id: 12439, Código: '123', Nome: 'João', Email: 'joao@gmail.com', Celular: '1234567890', Cargo: 'Gerente', Loja: 'Loja 1', Usuario: 'joao1' },
            { id: 21243, Código: '124', Nome: 'Maria', Email: 'maria@gmail.com', Celular: '0987654321', Cargo: 'Vendedor', Loja: 'Loja 2', Usuario: 'maria2' },
            { id: 31390, Código: '125', Nome: 'Carlos', Email: 'carlos@gmail.com', Celular: '1122334455', Cargo: 'Gerente', Loja: 'Loja 3', Usuario: 'carlos3' },
            { id: 45899, Código: '126', Nome: 'Ana', Email: 'ana@gmail.com', Celular: '5566778899', Cargo: 'Vendedor', Loja: 'Loja 4', Usuario: 'ana4' },
            { id: 58234, Código: '127', Nome: 'Pedro', Email: 'pedro@gmail.com', Celular: '9988776655', Cargo: 'Gerente', Loja: 'Loja 5', Usuario: 'pedro5' },
            { id: 61234, Código: '128', Nome: 'Julia', Email: 'julia@gmail.com', Celular: '8877665544', Cargo: 'Vendedor', Loja: 'Loja 6', Usuario: 'julia6' },
            { id: 76854, Código: '129', Nome: 'Lucas', Email: 'lucas@gmail.com', Celular: '7766554433', Cargo: 'Gerente', Loja: 'Loja 7', Usuario: 'lucas7' },
            { id: 89036, Código: '130', Nome: 'Lara', Email: 'lara@gmail.com', Celular: '6655443322', Cargo: 'Vendedor', Loja: 'Loja 8', Usuario: 'lara8' },
            { id: 99706, Código: '131', Nome: 'Rafael', Email: 'rafael@gmail.com', Celular: '5544332211', Cargo: 'Gerente', Loja: 'Loja 9', Usuario: 'rafael9' },
            { id: 10151, Código: '132', Nome: 'Camila', Email: 'camila@gmail.com', Celular: '4433221100', Cargo: 'Vendedor', Loja: 'Loja 10', Usuario: 'camila10' },
            { id: 11129, Código: '133', Nome: 'Gabriel', Email: 'gabriel@gmail.com', Celular: '3322110099', Cargo: 'Gerente', Loja: 'Loja 11', Usuario: 'gabriel11' },
            { id: 12009, Código: '134', Nome: 'Beatriz', Email: 'beatriz@gmail.com', Celular: '2211009988', Cargo: 'Vendedor', Loja: 'Loja 12', Usuario: 'beatriz12' },
            { id: 13212, Código: '135', Nome: 'Guilherme', Email: 'guilherme@gmail.com', Celular: '1100998877', Cargo: 'Gerente', Loja: 'Loja 13', Usuario: 'guilherme13' },
            { id: 14122, Código: '136', Nome: 'Carla', Email: 'carla@gmail.com', Celular: '0099887766', Cargo: 'Vendedor', Loja: 'Loja 14', Usuario: 'carla14' },
            { id: 15490, Código: '137', Nome: 'Roberto', Email: 'roberto@gmail.com', Celular: '9988776655', Cargo: 'Gerente', Loja: 'Loja 15', Usuario: 'roberto15' }
        ];

        setColunas(colunasDoBanco);

        setDados(dadosDoBanco);

    }, []);

    return (
        <>
            <PageLayout>
                <Header telaAtual="Usuarios">
                    
                </Header>


                <div className='bg-white mt-4 h-[30rem] flex flex-col justify-start pl-10 pr-10 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)]'>
                    <div className='w-full h-[3rem] flex justify-between items-center'>
                        
                        <div className='w-[25rem] flex justify-between items-center'>
                            <p className=' font-medium text-2xl'>Usuarios Cadastrados :</p>
                           
                        </div>

                        <InputSearcModal
                            props="text"
                        >Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[22rem] mt-3 flex justify-center items-center '>
                        <div className=' w-full h-[23.5rem] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                            <TabelaPage colunas={colunas} dados={dados} edit remove></TabelaPage>
                        </div>
                    </div>
                    <div className='w-full h-[1.8rem] mt-7 flex justify-end '>
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
                            <button className='bg-slate-800 text-white' onClick={()=>csvTodosUsuarios()}>
                                CSV
                            </button>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Usuario