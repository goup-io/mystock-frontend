
import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import Filter from '../../inputs/filter.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import ModalAviso from '../../alerts/ModalAviso.js'

import React, { useState, useEffect } from 'react';
import ApiRequest from '../../../connections/ApiRequest.js'

function Aviso() {
    const [dadosDoBanco, setDadosDoBanco] = useState([]);

    async function fetchData() {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.alertasGetAll();
            } else {
                response = await ApiRequest.alertasGetAllByLoja(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBanco(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const avisos = [
        {tipo: 'Vermelho', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 5 pares em estoque.', dataHora: '02/05/2024 17:57:12'},
        {tipo: 'Laranja', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 50 pares em estoque.', dataHora: '02/05/2024 16:57:12'},
        {tipo: 'Vermelho', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 5 pares em estoque.', dataHora: '02/05/2024 17:57:12'},
        {tipo: 'Laranja', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 50 pares em estoque.', dataHora: '02/05/2024 16:57:12'},
        {tipo: 'Laranja', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 50 pares em estoque.', dataHora: '02/05/2024 16:57:12'},
        {tipo: 'Laranja', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 50 pares em estoque.', dataHora: '02/05/2024 16:57:12'},
        {tipo: 'Laranja', titulo: 'Baixo Estoque', descricao: 'O Air max 200 tamanho 45 possuem apenas 50 pares em estoque.', dataHora: '02/05/2024 16:57:12'},
    ]

    return (
        <>
            <PageLayout>
                <TitleBox title="Mural de Avisos"></TitleBox>
                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-5 drop-shadow-md items-center text-sm bg-white'>
                    <Filter data tipoAlerta></Filter>
                </div>
                <ChartBox>
                    <div className='p-2 px-3 flex justify-between'>
                        <h2 className='font-medium text-lg'>AVISOS</h2>                        
                        <InputSearcModal props="text">Pesquisar</InputSearcModal>
                    </div>
                    <div className='h-[50vh] flex flex-col gap-2 px-3 mt-2 mb-5 overflow-y-auto'>
                        {avisos.map((aviso, index) => (
                            <ModalAviso tipo={aviso.tipo} titulo={aviso.titulo} descricao={aviso.descricao} dataHora={aviso.dataHora} />
                        ))}
                    </div>
                </ChartBox>
            </PageLayout>
        </>
    )

}

export default Aviso