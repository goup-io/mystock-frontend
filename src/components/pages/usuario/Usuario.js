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
             
            </PageLayout>
        </>
    )
}

export default Usuario