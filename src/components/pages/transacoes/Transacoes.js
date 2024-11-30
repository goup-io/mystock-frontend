import Header from '../../header/Header.js';
import PageLayout from '../PageLayout.js';
import InputSearcModal from '../../inputs/inputSearchModal.js';
import TabelaPage from '../../tables/tablePage.js';

import React, { useState, useEffect } from 'react';
import Filter from '../../inputs/filter.js';
import ApiRequest from '../../../connections/ApiRequest.js';
import Alert from '../../alerts/Alert.js';

import AbrirModalLiberarTransferencia from '../../modals/modalLiberarTransferencia.js';
import AbrirModalRejeitarTransferencia from '../../modals/modalRejeitarTransferencia.js';

function Transacoes() {
    const [colunas, setColunas] = useState([]);
    const [colunasAprovacao, setColunasAprovacao] = useState([]);
    const [dadosHistorico, setDadosHistorico] = useState([]);
    const [dadosAprovacao, setDadosAprovacao] = useState([]);
    const [idsDadosPendentes, setIdsDadosPendentes] = useState([]);
    const [isHistoricoSelected, setIsHistoricoSelected] = useState(true);

    const handleHistoricoButtonClick = () => {
        setIsHistoricoSelected(true);
    };

    const handlePendentesButtonClick = () => {
        setIsHistoricoSelected(false);
    };

    async function fetchData() {
        const colunasDoBanco = ['Data', 'Solicitante', 'Liberadora', 'Cod', 'Cor', 'Tamanho', 'N.Solic.', 'N.Lib.', 'Liberador', 'Coletor', 'Status'];
        const colunasDoBancoAprovacao = ['Data', 'Solicitante', 'Liberadora', 'Cod', 'Cor', 'Tamanho', 'N.Solic.', 'Coletor', 'Status'];

        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.transferenciaGetAll();
            } else {
                response = await ApiRequest.getTransferenciaLoja(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data.map(item => ({
                    data: (item.dataHora).replace('T', ' ').split(".")[0],
                    solicitante: item.loja_coletora,
                    liberadora: item.loja_liberadora,
                    codModelo: item.etp.codigo,
                    cor: item.etp.cor,
                    tamanho: item.etp.tamanho,
                    nSolic: item.quantidadeSolicitada,
                    nLib: item.quantidadeLiberada != null ? item.quantidadeLiberada : '---',
                    liberador: item.liberador != null ? item.liberador : '---',
                    coletor: item.coletor,
                    status: item.status.status,
                }));
                setDadosHistorico(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.getTransferenciaLojaLiberador(0);
            } else {
                response = await ApiRequest.getTransferenciaLojaLiberador(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data.map(item => ({
                    id: item.id,
                    data: (item.dataHora).replace('T', ' ').split(".")[0],
                    solicitante: item.loja_coletora,
                    liberadora: item.loja_liberadora,
                    codModelo: item.etp.codigo,
                    cor: item.etp.cor,
                    tamanho: item.etp.tamanho,
                    nSolic: item.quantidadeSolicitada,
                    coletor: item.coletor,
                    status: item.status.status,
                }));
                setDadosAprovacao(dados);

                const idsPendentes = response.data.filter(item => item.status.status === 'PENDENTE').map(item => item.id);
                setIdsDadosPendentes(idsPendentes);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }


        setColunas(colunasDoBanco);
        setColunasAprovacao(colunasDoBancoAprovacao);
    }

    async function fetchDataFilterHistorico(filterData) {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.transferenciaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.modelo, filterData.produto, filterData.tamanho, filterData.cor, filterData.status, '');
            } else {
                response = await ApiRequest.transferenciaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.modelo, filterData.produto, filterData.tamanho, filterData.cor, filterData.status, localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data.map(item => ({
                    data: (item.dataHora).replace('T', ' ').split(".")[0],
                    solicitante: item.loja_liberadora,
                    destinatario: item.loja_coletora,
                    codModelo: item.etp.codigo,
                    cor: item.etp.cor,
                    tamanho: item.etp.tamanho,
                    nSolic: item.quantidadeSolicitada,
                    nLib: item.quantidadeLiberada,
                    liberador: item.liberador,
                    coletor: item.coletor,
                    status: item.status.status,
                }));
                setDadosHistorico(dados);
                Alert.alertTop(false, "Filtro aplicado com sucesso!");

            } else if (response.status === 204) {
                Alert.alertTop(true, "Nenhum produto encontrado com os filtros aplicados!");
                fetchData();
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDataFilterAprovacao(filterData) {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.transferenciaGetByFilterLiberador(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.modelo, filterData.produto, filterData.tamanho, filterData.cor, filterData.status, '');
            } else {
                response = await ApiRequest.transferenciaGetByFilterLiberador(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.modelo, filterData.produto, filterData.tamanho, filterData.cor, filterData.status, localStorage.getItem('visao_loja'));
            }
            console.log(response);

            if (response.status === 200) {
                const dados = response.data.map(item => ({
                    data: (item.dataHora).replace('T', ' ').split(".")[0],
                    solicitante: item.loja_liberadora,
                    destinatario: item.loja_coletora,
                    codModelo: item.etp.codigo,
                    cor: item.etp.cor,
                    tamanho: item.etp.tamanho,
                    nSolic: item.quantidadeSolicitada,
                    coletor: item.coletor,
                    status: item.status.status,
                }));

                const idsPendentes = response.data.filter(item => item.status.status === 'PENDENTE').map(item => item.id);
                setIdsDadosPendentes(idsPendentes);

                setDadosAprovacao(dados);
                Alert.alertTop(false, "Filtro aplicado com sucesso!");

            } else if (response.status === 204) {
                Alert.alertTop(true, "Nenhum produto encontrado com os filtros aplicados!");
                fetchData();
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDataFilterSearchHistorico(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const lowerCaseFilter = filterData.toLowerCase();
            const searchData = dadosHistorico.filter((item) => {
                return (
                    (item.solicitante?.toLowerCase() || '').includes(lowerCaseFilter) ||
                    (item.destinatario?.toLowerCase() || '').includes(lowerCaseFilter) ||
                    (item.codModelo?.toLowerCase() || '').includes(lowerCaseFilter) ||
                    (item.cor?.toLowerCase() || '').includes(lowerCaseFilter) ||
                    (item.liberador?.toLowerCase() || '').includes(lowerCaseFilter) ||
                    (item.coletor?.toLowerCase() || '').includes(lowerCaseFilter) ||
                    (item.status?.toLowerCase() || '').includes(lowerCaseFilter)
                );
            });
            setDadosHistorico(searchData);
        }
    }

    async function fetchDataFilterSearchAprovacao(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const lowerCaseFilter = filterData.toLowerCase();
            const searchData = dadosAprovacao.filter((item) =>
                (item.solicitante?.toLowerCase() || '').includes(lowerCaseFilter) ||
                (item.destinatario?.toLowerCase() || '').includes(lowerCaseFilter) ||
                (item.codModelo?.toLowerCase() || '').includes(lowerCaseFilter) ||
                (item.cor?.toLowerCase() || '').includes(lowerCaseFilter) ||
                (item.liberador?.toLowerCase() || '').includes(lowerCaseFilter) ||
                (item.coletor?.toLowerCase() || '').includes(lowerCaseFilter) ||
                (item.status?.toLowerCase() || '').includes(lowerCaseFilter)
            );
            const filtrarIdsTransferencias = searchData.map(obj => obj.id);
            setIdsDadosPendentes(filtrarIdsTransferencias);
            setDadosAprovacao(searchData);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const updateTable = () => {
        fetchData();
    };

    const qtdTransferenciasPendente = dadosAprovacao.filter(dado => dado.status === 'PENDENTE').length;

    const handleAceitarTransferencia = (id, qtdSolicitadaTransf) => {
        AbrirModalLiberarTransferencia(id, qtdSolicitadaTransf, updateTable);
    }

    const handleNegarTransferencia = (id) => {
        AbrirModalRejeitarTransferencia(id, updateTable);
    }

    return (
        <>
            <PageLayout>
                <Header telaAtual="Área de Transferência" tipo=""></Header>

                <div className='w-full flex md:flex-row md:justify-center rounded-md mt-4 py-4 px-10 shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data modelo produto tamanho status funcaoOriginal={fetchData} funcaoFilter={isHistoricoSelected ? fetchDataFilterHistorico : fetchDataFilterAprovacao} ></Filter>
                </div>

                <div className='bg-white mt-4 h-[74%] flex flex-col justify-start pl-10 pr-10 pt-2 pb-2 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] rounded-md'>
                    <div className='w-full h-[8%] flex justify-between items-center '>
                        <div className='flex items-center gap-4'>
                            <button
                                className={`bg-inherit px-1 ${isHistoricoSelected ? 'font-medium text-lg border-b-2 border-[#355070]' : 'font-light text-sm'}`}
                                onClick={handleHistoricoButtonClick}>
                                HISTÓRICO
                            </button>
                            <div className='flex items-center'>
                                <button
                                    className={`bg-inherit px-1 ${!isHistoricoSelected ? 'font-medium text-lg border-b-2 border-[#355070] ' : 'font-light text-sm'}`}
                                    onClick={handlePendentesButtonClick}>
                                    PENDENTES DE APROVAÇÃO
                                </button>
                                {qtdTransferenciasPendente > 0 && (
                                    <button className='bg-red-600 rounded-2xl w-4 h-4 mb-4 font-medium flex justify-center items-center text-white text-[0.7rem]'>
                                        {qtdTransferenciasPendente}
                                    </button>
                                )}
                            </div>
                        </div>

                        <InputSearcModal props="text" funcao={isHistoricoSelected ? fetchDataFilterSearchHistorico : fetchDataFilterSearchAprovacao}>Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[85%] mt-2 flex justify-center items-center '>
                        <div className='w-full h-full border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            {isHistoricoSelected ? (
                                <TabelaPage colunas={colunas} dados={dadosHistorico} />
                            ) : (
                                <TabelaPage colunas={colunasAprovacao} dados={dadosAprovacao.filter(dado => dado.status === 'PENDENTE').map(({ id, ...dados }) => dados)} aceitar={handleAceitarTransferencia} negar={handleNegarTransferencia} id={idsDadosPendentes} />
                            )}
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
}

export default Transacoes;