import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'
import AbrirModalSalesHistory from '../../modals/modalSalesHistory.js'

import Filter from '../../inputs/filter.js'
import Alert from '../../alerts/Alert.js'

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
                            id: obj.id, data: obj.data, horario: obj.hora, vendedor: obj.nomeVendedor, tipoVenda: obj.tipoVenda.tipo, qtdItens: obj.qtdItens, valor: obj.valor, status: obj.statusVenda
                        }
                    ));

                const filtrarIds = dados.map(obj => ({ id: obj.id }));

                setIdsDados(filtrarIds)
                setDadosDoBanco(filtrarDados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunas(colunas);
    }

    async function fetchDataFilter(filterData) {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.vendaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.vendedor, filterData.tipoVenda, filterData.statusVenda, '');
            } else {
                response = await ApiRequest.vendaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.vendedor, filterData.tipoVenda, filterData.statusVenda, localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data.map(obj => (
                    {
                        id: obj.id, data: obj.data, horario: obj.hora, vendedor: obj.nomeVendedor, tipoVenda: obj.tipoVenda.tipo, qtdItens: obj.qtdItens, valor: obj.valor, status: obj.statusVenda
                    }
                ));

                const filtrarIds = response.data.map(obj => ({ id: obj.id }));
                setIdsDados(filtrarIds);

                setDadosDoBanco(dados);
                Alert.alertTop(false, "Filtro aplicado com sucesso!");

            } else if (response.status === 204) {
                Alert.alertTop(true, "Nenhum dado encontrado com os filtros aplicados!");
                fetchData();
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDataFilterSearch(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const lowerCaseFilter = filterData.toLowerCase();
            const searchData = dadosDoBanco.filter((item) =>
                item.vendedor.toLowerCase().includes(lowerCaseFilter) ||
                item.tipoVenda.toLowerCase().includes(lowerCaseFilter) ||
                item.status.toLowerCase().includes(lowerCaseFilter)
            );
            setDadosDoBanco(searchData);
            const filtrarIdsEtps = searchData.map(obj => ({ id: obj.id }));
            setIdsDados(filtrarIdsEtps)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateTable = () => {
        fetchData();
    };

    async function csvHistoricoVendas() {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.getCsvHistoricoVendas();
            } else {
                response = await ApiRequest.getCsvHistoricoVendasByLoja(localStorage.getItem('visao_loja'));
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

                link.setAttribute('download', `Historico_Vendas_${formattedDate}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }

        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    const handleDetailsVenda = (idVenda) => {
        AbrirModalSalesHistory(idVenda, updateTable);
    }

    const handleCancelarVenda = (idVenda) => {
        Alert.alertQuestionCancelar("Deseja mesmo cancelar essa venda? Essa ação é irreversível.", "Sim", "Cancelar", () => cancelarVenda(idVenda), () => updateTable())
    }

    async function cancelarVenda(idVenda) {
        try {
            const response = await ApiRequest.vendaCancelar(idVenda);
            if (response.status === 200) {
                Alert.alertSuccess("Cancelada!", "A venda foi cancelada com sucesso", updateTable);
            } else if (response.response.status === 409) {
                Alert.alertError("Venda já cancelada!", "A venda já foi cancelada com sucesso anteriormente", updateTable);
            }
        } catch (error) {
            console.log("Erro ao cancelar a venda", error);
        }
    }

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Histórico de Vendas"></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data horario vendedor tipoVenda funcaoOriginal={fetchData} funcaoFilter={fetchDataFilter} statusVenda></Filter>
                </div>

                <ChartBox>
                    <div className='px-4 pt-1'>
                        <div className='w-full flex justify-between'>
                            <p className='font-medium text-lg'>HISTÓRICO</p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text" funcao={fetchDataFilterSearch}>Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvHistoricoVendas}></ButtonDownLoad>
                            </div>
                        </div>

                        <div className='w-full h-[50vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunas} dados={dadosDoBanco.map(({ id, ...dados }) => dados)} status verMais={handleDetailsVenda} cancel={handleCancelarVenda} id={idsDados} />
                        </div>
                    </div>
                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default HistoricoVendasGerente;
