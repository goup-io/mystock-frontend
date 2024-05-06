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
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'



import React, { useState, useEffect } from 'react';
import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import AbrirModalComission from '../../modals/modalComission.js'
import ButtonCancel from '../../buttons/buttonCancel.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'

async function csvTodosUsuarios() {
    const response = await ApiRequest.getCsvUsuario();
    if (response.status === 200) {
        const csvData = new TextDecoder('utf-8').decode(new Uint8Array(response.data));
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
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
            { Código: '123', Nome: 'João', Email: 'joao@gmail.com', Celular: '1234567890', Cargo: 'Gerente', Loja: 'Loja 1', Usuario: 'joao1' },
            { Código: '124', Nome: 'Maria', Email: 'maria@gmail.com', Celular: '0987654321', Cargo: 'Vendedor', Loja: 'Loja 2', Usuario: 'maria2' },
            { Código: '125', Nome: 'Carlos', Email: 'carlos@gmail.com', Celular: '1122334455', Cargo: 'Gerente', Loja: 'Loja 3', Usuario: 'carlos3' },
            { Código: '126', Nome: 'Ana', Email: 'ana@gmail.com', Celular: '5566778899', Cargo: 'Vendedor', Loja: 'Loja 4', Usuario: 'ana4' },
            { Código: '127', Nome: 'Pedro', Email: 'pedro@gmail.com', Celular: '9988776655', Cargo: 'Gerente', Loja: 'Loja 5', Usuario: 'pedro5' },
            { Código: '128', Nome: 'Julia', Email: 'julia@gmail.com', Celular: '8877665544', Cargo: 'Vendedor', Loja: 'Loja 6', Usuario: 'julia6' },
            { Código: '129', Nome: 'Lucas', Email: 'lucas@gmail.com', Celular: '7766554433', Cargo: 'Gerente', Loja: 'Loja 7', Usuario: 'lucas7' },
            { Código: '130', Nome: 'Lara', Email: 'lara@gmail.com', Celular: '6655443322', Cargo: 'Vendedor', Loja: 'Loja 8', Usuario: 'lara8' },
            { Código: '131', Nome: 'Rafael', Email: 'rafael@gmail.com', Celular: '5544332211', Cargo: 'Gerente', Loja: 'Loja 9', Usuario: 'rafael9' },
            { Código: '132', Nome: 'Camila', Email: 'camila@gmail.com', Celular: '4433221100', Cargo: 'Vendedor', Loja: 'Loja 10', Usuario: 'camila10' },
            { Código: '133', Nome: 'Gabriel', Email: 'gabriel@gmail.com', Celular: '3322110099', Cargo: 'Gerente', Loja: 'Loja 11', Usuario: 'gabriel11' },
            { Código: '134', Nome: 'Beatriz', Email: 'beatriz@gmail.com', Celular: '2211009988', Cargo: 'Vendedor', Loja: 'Loja 12', Usuario: 'beatriz12' },
            { Código: '135', Nome: 'Guilherme', Email: 'guilherme@gmail.com', Celular: '1100998877', Cargo: 'Gerente', Loja: 'Loja 13', Usuario: 'guilherme13' },
            { Código: '136', Nome: 'Carla', Email: 'carla@gmail.com', Celular: '0099887766', Cargo: 'Vendedor', Loja: 'Loja 14', Usuario: 'carla14' },
            { Código: '137', Nome: 'Roberto', Email: 'roberto@gmail.com', Celular: '9988776655', Cargo: 'Gerente', Loja: 'Loja 15', Usuario: 'roberto15' }
        ];

        setColunas(colunasDoBanco);

        setDados(dadosDoBanco);

    }, []);

    const buttons = [
        { label: "Calculadora de comissão", event: AbrirModalComission },
        { label: "NOVO USUÁRIO", event: AbrirModalCadastreUser },
    ]

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Usuários" buttons={buttons}></TitleBox>
                <ChartBox >

                    <div className='w-full h-[30rem] px-4 flex justify-start flex-col items-center'>

                        <div className='w-full mt-2 flex justify-between'>

                            <p className=' text-xl'>USUÁRIOS CADASTRADOS:</p>

                            <div className='w-[38%] flex justify-between items-center'>
                                <InputSearcModal
                                    props="text"
                                >Pesquisar</InputSearcModal>

                                <ButtonDownLoad></ButtonDownLoad>
                            </div>

                        </div>

                        <div className=' w-full h-[22rem] mt-4 bg-slate-700 border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                            <TabelaPage colunas={colunas} dados={dados} edit remove />
                        </div>
                    </div>

                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default Usuario