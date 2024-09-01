import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'
import Filter from '../../inputs/filter.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import ApiRequest from '../../../connections/ApiRequest.js'
import Alert from '../../alerts/Alert.js'
import AbrirModalSalesHistory from '../../modals/modalSalesHistory.js'

import React, { useState, useEffect } from 'react';

function Historico() {
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
            const visaoLoja = localStorage.getItem('visao_loja');
            const cargo = localStorage.getItem('cargo');

            console.log(filterData)
            if (cargo === 'ADMIN' && visaoLoja == 0) {
                response = await ApiRequest.vendaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.vendedor, filterData.tipoVenda, filterData.statusVenda, '');
            } else {
                response = await ApiRequest.vendaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.vendedor, filterData.tipoVenda, filterData.statusVenda, localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data.map(obj => ({
                    id: obj.id,
                    data: obj.data,
                    horario: obj.hora,
                    vendedor: obj.nomeVendedor,
                    tipoVenda: obj.tipoVenda.tipo,
                    qtdItens: obj.qtdItens,
                    valor: obj.valor,
                    status: obj.statusVenda
                }));

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
            const searchData = dadosDoBanco.filter((item) => {
                const lowerCaseFilter = filterData.toLowerCase();
                return (
                    item.vendedor.toLowerCase().includes(lowerCaseFilter) ||
                    item.tipoVenda.toLowerCase().includes(lowerCaseFilter) ||
                    item.status.toLowerCase().includes(lowerCaseFilter)
                );
            });

            console.log("dados", searchData)
            const filtrarIdsEtps = searchData.map(obj => ({ id: obj.id }));
            setDadosDoBanco(searchData);
            setIdsDados(filtrarIdsEtps)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateTable = () => {
        fetchData();
    };

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
            <PageLayout>
                <Header telaAtual="Histórico de Vendas"></Header>
                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data horario vendedor tipoVenda funcaoOriginal={fetchData} funcaoFilter={fetchDataFilter} statusVenda></Filter>
                </div>

                <div className='bg-white mt-4 h-[74%] flex flex-col justify-start pl-10 pr-10 pt-2 pb-2 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] rounded-md'>
                    <div className='w-full h-[8%] flex justify-between items-center '>
                        <p className='font-medium text-lg'>HISTÓRICO</p>
                        <InputSearcModal props="text" funcao={fetchDataFilterSearch}>Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[85%] mt-2 flex justify-center items-center '>
                        <div className=' w-full h-full border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunas} dados={dadosDoBanco.map(({ id, ...dados }) => dados)} status verMais={handleDetailsVenda} cancel={handleCancelarVenda} id={idsDados} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Historico