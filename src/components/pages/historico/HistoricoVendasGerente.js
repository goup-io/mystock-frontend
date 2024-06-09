import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'
import AbrirModalSalesHistory from '../../modals/modalSalesHistory.js'

import Filter from '../../inputs/filter.js'

import React, { useState, useEffect } from 'react';


function HistoricoVendasGerente() {
    const [colunas, setColunas] = useState([]);
    const [dadosDoBanco, setDadosDoBanco] = useState([]);
    const [idsDados, setIdsDados] = useState([]);

    async function fetchData() {
        const colunas = ['Data', 'Horário', 'Vendedor', 'Tipo Venda', 'N. Itens', 'Valor', 'Status'];

        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.vendaGetAll();
            } else {
                response = await ApiRequest.vendaGetAllByLoja(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;

                const filtrarDados = dados
                    .map(obj => (
                        {
                            data: obj.data, horario: obj.hora, vendedor: obj.nomeVendedor, tipoVenda: obj.tipoVenda.tipo, qtdItens: obj.qtdItens, valor: obj.valor, status: obj.statusVenda
                        }
                    ));

                const filtrarIds = dados.map(obj => ({id: obj.id}));

                setIdsDados(filtrarIds)
                setDadosDoBanco(filtrarDados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunas(colunas);
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(dadosDoBanco);

    async function csvHistoricoVendas() {
        alert("Implementar lógica csv!")
    }

    const handleDetailsVenda = (idVenda) => {
        AbrirModalSalesHistory(idVenda);
    }

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Histórico de Vendas"></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data horario vendedor tipoVenda></Filter>
                </div>

                <ChartBox>
                    <div className='px-4 pt-1'>
                        <div className='w-full flex justify-between'>
                            <p className='font-medium text-lg'>HISTÓRICO</p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvHistoricoVendas} ></ButtonDownLoad>
                            </div>
                        </div>

                        <div className='w-full h-[50vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunas} dados={dadosDoBanco.map(({ ...dados }) => dados)} status verMais={handleDetailsVenda} troca cancel id={idsDados} /> 
                        </div>
                    </div>
                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default HistoricoVendasGerente;
