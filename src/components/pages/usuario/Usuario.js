import InputSearcModal from '../../inputs/inputSearchModal.js'
import AbrirModalCadastreUser from '../../modals/modals-user/modalCadastreUser.js'
import TabelaPage from '../../tables/tablePage.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'

import React, { useState, useEffect } from 'react';
import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import AbrirModalComission from '../../modals/modalComission.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'


async function csvTodosUsuarios() {
    try { 
        let response;
        if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
            response = await ApiRequest.getCsvUsuario();
        } else {
            response = await ApiRequest.getCsvUsuarioByLoja(localStorage.getItem('visao_loja'));
        }

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
    } catch (error) {
        console.log("Erro ao buscar os dados", error);
    }
}

function Usuario() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);


    async function fetchData() {
        const colunasDoBanco = ['Código', 'Nome', 'Email', 'Celular', 'Cargo', 'Loja', 'Usuario'];

        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.userGetAll();
            } else {
                response = await ApiRequest.userGetAllByLoja(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;
                setDados(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunas(colunasDoBanco);
    }

    const handleEditarUsuario = (id) => {
        console.log(id);
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

                    <div className='w-full px-4 flex justify-start flex-col items-center'>

                        <div className='w-full mt-2 flex justify-between'>

                            <p className='font-medium text-lg'>USUÁRIOS CADASTRADOS:</p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvTodosUsuarios} ></ButtonDownLoad>
                            </div>

                        </div>

                        <div className='w-full h-[60vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunas} dados={dados.map(({ id, ...dados }) => dados)} edit={handleEditarUsuario} remove id={0}/>
                        </div>
                    </div>

                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default Usuario