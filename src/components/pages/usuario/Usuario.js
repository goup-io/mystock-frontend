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

        // Get current date and format it as YY_mm_dd
        const date = new Date();
        const formattedDate = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;

        link.setAttribute('download', `Funcionarios_${formattedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(csvData);
    }
}

function Usuario() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);


    async function fetchData() {
        const colunasDoBanco = ['Código', 'Nome', 'Email', 'Celular', 'Cargo', 'Loja', 'Usuario'];

        try {
            const response = await ApiRequest.userGetAll();
            console.log(response);

            if (response.status === 200) {
                const dados = response.data;
                setDados(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
        setColunas(colunasDoBanco);
    }

    useEffect(() => {
        fetchData();
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

                            <p className='font-medium text-lg'>USUÁRIOS CADASTRADOS:</p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvTodosUsuarios} ></ButtonDownLoad>                               
                            </div>

                        </div>

                        <div className=' w-full h-[22rem] mt-4 bg-slate-700 border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                            <TabelaPage colunas={colunas} dados={dados.map(({ id, ...usuario}) => usuario)} edit remove />
                        </div>
                    </div>

                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default Usuario