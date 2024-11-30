import ButtonModal from '../../buttons/buttonsModal.js'
import Header from '../../header/Header.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import AbrirModalCadastreKit from '../../modals/modals-kit/modalCadastreKit.js'
import AbrirModalCadastreModel from '../../modals/modals-model/modalCadastreModel.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'
import AbrirModalCadastreProdPreConfig from '../../modals/modals-produto/modalCadastreProdPreConfig.js'
import AbrirModalEditProd from '../../modals/modals-produto/modalEditProd.js'

import TabelaPage from '../../tables/tablePage.js'
import PageLayout from '../PageLayout.js'
import ApiRequest from "../../../connections/ApiRequest";
import Alert from '../../alerts/Alert.js'
import errorImage from "../../../assets/error.png"


import React, { useState, useEffect } from 'react';
import Filter from '../../inputs/filter.js'
import AbrirModalEditModel from '../../modals/modals-model/modalEditModel.js'

function Estoque() {


    const [colunasETP, setColunasETP] = useState([]);
    const [colunasModel, setColunasModel] = useState([]);
    const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
    const [dadosDoBancoModel, setDadosDoBancoModel] = useState([]);
    const [isProdutoSelected, setIsProdutoSelected] = useState(true);
    const [etpsIds, setEtpsIds] = useState([]);
    const [modelsIds, setModelsIds] = useState([]);


    async function buscarModelos() {
        try {
            const responseModel = await ApiRequest.modeloGetAll();

            if (responseModel.status === 200) {
                const dados = responseModel.data;
                setDadosDoBancoModel(dados);

                const filtrarIdsModels = dados.map(obj => ({ id: obj.id }));
                setModelsIds(filtrarIdsModels);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

    }

    async function buscarEtps() {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.etpsGetAll();
            } else {
                response = await ApiRequest.etpsGetAllByLoja(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;
                const filtrarDados = dados
                    .map(obj => (
                        {
                            id: obj.id, codigo: obj.codigo, nome: obj.nome, modelo: obj.modelo, tamanho: obj.tamanho, cor: obj.cor, preco: obj.preco, loja: obj.loja, itemPromocional: obj.itemPromocional == 'SIM' ? 'Sim' : 'Não', quantidade: obj.quantidade
                        }
                    ));

                const filtrarIdsEtps = dados.map(obj => ({ id: obj.id }));

                setEtpsIds(filtrarIdsEtps);
                setDadosDoBancoETP(filtrarDados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchData() {
        const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'Item Promo.', 'N.Itens'];
        const colunasDoBancoModel = ['Nome', 'Categoria', 'Tipo'];

        setColunasETP(colunasDoBancoETP);
        setColunasModel(colunasDoBancoModel);

        buscarEtps();
        buscarModelos();
    }

    async function fetchDataFilterProduto(filterData) {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.etpsGetFiltrados(filterData.modelo, filterData.tamanho, filterData.cor, filterData.precoInicio, filterData.precoFim, '');
            } else {
                response = await ApiRequest.etpsGetFiltrados(filterData.modelo, filterData.tamanho, filterData.cor, filterData.precoInicio, filterData.precoFim, localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;

                const filtrarDados = dados
                    .map(obj => (
                        {
                            codigo: obj.codigo, nome: obj.nome, modelo: obj.modelo, tamanho: obj.tamanho, cor: obj.cor, preco: obj.preco, loja: obj.loja, itemPromocional: obj.itemPromocional == 'SIM' ? 'Sim' : 'Não', quantidade: obj.quantidade
                        }
                    ));

                const filtrarIdsEtps = dados.map(obj => ({ id: obj.id }));
                setEtpsIds(filtrarIdsEtps);

                setDadosDoBancoETP(filtrarDados);
                Alert.alertTop(false, "Filtro aplicado com sucesso!");

            } else if (response.status === 204) {
                Alert.alertTop(true, "Nenhum produto encontrado com os filtros aplicados!");
                fetchData();
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDataFilterModelo(filterData) {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.modeloGetByFilter(filterData.modelo, filterData.categoriaModelo, filterData.tipoModelo, '');
            } else {
                response = await ApiRequest.modeloGetByFilter(filterData.modelo, filterData.categoriaModelo, filterData.tipoModelo, localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBancoModel(dados);;

                const filtrarIdsModels = dados.map(obj => ({ id: obj.id }));
                setModelsIds(filtrarIdsModels);

                Alert.alertTop(false, "Filtro aplicado com sucesso!");

            } else if (response.status === 204) {
                Alert.alertTop(true, "Nenhum dados encontrado com os filtros aplicados!");
                fetchData();
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDataFilterSearchProduto(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const lowerCaseFilter = filterData.toLowerCase();
            const searchData = dadosDoBancoETP.filter(item => (
                item.codigo.toLowerCase().includes(lowerCaseFilter) ||
                item.nome.toLowerCase().includes(lowerCaseFilter) ||
                item.modelo.toLowerCase().includes(lowerCaseFilter) ||
                item.cor.toLowerCase().includes(lowerCaseFilter) ||
                item.loja.toLowerCase().includes(lowerCaseFilter) ||
                item.itemPromocional.toLowerCase().includes(lowerCaseFilter)
            ));
            setDadosDoBancoETP(searchData);
            const filtrarIdsEtps = searchData.map(obj => ({ id: obj.id }));
            setEtpsIds(filtrarIdsEtps);
        }
    }

    async function fetchDataFilterSearchModel(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const lowerCaseFilter = filterData.toLowerCase();

            const searchData = dadosDoBancoModel.filter((item) =>
                item.nome.toLowerCase().includes(lowerCaseFilter) ||
                item.categoria.toLowerCase().includes(lowerCaseFilter) ||
                item.tipo.toLowerCase().includes(lowerCaseFilter)
            );
            setDadosDoBancoModel(searchData);
            const filtrarIdsModels = searchData.map(obj => ({ id: obj.id }));
            setModelsIds(filtrarIdsModels);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateTable = () => {
        fetchData();
    };

    const handleProdutoButtonClick = () => {
        setIsProdutoSelected(true);
        updateTable();
    };

    const handleModeloButtonClick = () => {
        setIsProdutoSelected(false);
        updateTable();
    };

    const handleEditarEtp = (etpId) => {
        AbrirModalEditProd(etpId.id, updateTable);
    };

    const handleEditarModel = (modelId) => {
        AbrirModalEditModel(modelId.id, updateTable);
    };

    async function excluirEtp(etpId) {
        try {
            const response = await ApiRequest.excluirETP(etpId.id);
            if (response.status === 204) {
                Alert.alertSuccess("Produto excluído com sucesso!");
                setTimeout(() => {window.location.reload()}, 1000);
            } else if (response.response.status === 500) {
                Alert.alertError("Erro ao excluir produto!", "Este produto está sendo utilizado em um produto!");
            } else {
                Alert.alertError("Erro ao excluir produto!", response.response.data.message);
            }
        } catch (error) {
            console.log("Erro ao excluir etp: ", error);
        }
    }

    async function excluirModel(modelId) {
        try {
            const response = await ApiRequest.modeloDelete(modelId.id);
            if (response.status === 204) {
                Alert.alertSuccess("Modelo excluído com sucesso!");
                setTimeout(() => {window.location.reload()}, 1000);
            } else if (response.response.status === 500) {
                Alert.alertError("Erro ao excluir modelo!", "Aconteceu um erro inesperado");
            } else if (response.response.status === 409) {
                Alert.alertError("Não foi possível excluir o modelo!", response.response.data);
            } else {
                Alert.alertError("Erro ao excluir modelo!", response.response.data);
            }
        } catch (error) {
            console.log("Erro ao excluir um modelo: ", error);
        }
    }

    const handleDeleteEtp = (etpId) => {
        Alert.alertQuestionCancelar("Deseja excluir esse produto? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluirEtp(etpId), () => updateTable())
    }

    const handleDeleteModel = (modelId) => {
        Alert.alertQuestionCancelar("Deseja excluir esse modelo? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluirModel(modelId), () => updateTable())
    }

    return (
        <>
            <PageLayout>
                <Header telaAtual="Estoque"></Header>

                <div className='w-full flex md:flex-row md:justify-center rounded-md mt-4 py-4 px-10  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    {
                        isProdutoSelected ? (
                            <Filter modelo cor tamanho preço funcaoFilter={fetchDataFilterProduto} funcaoOriginal={fetchData}></Filter>
                        ) : (
                            <Filter modelo categoriaModelo tipoModelo funcaoFilter={fetchDataFilterModelo} funcaoOriginal={fetchData}></Filter>
                        )
                    }
                </div>

                <div className='bg-white mt-4 h-[74%] flex flex-col justify-start pl-10 pr-10 pt-2 pb-2 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] rounded-md'>
                    <div className='w-full h-[8%] flex justify-between items-center '>

                        <div className='flex justify-between items-center gap-4'>

                            <button
                                className={`bg-inherit px-1 ${isProdutoSelected ? 'font-medium text-lg border-b-2 border-[#355070]' : 'font-light text-sm'}`}
                                onClick={handleProdutoButtonClick}>
                                PRODUTOS
                            </button>
                            <button
                                className={`bg-inherit px-1 ${!isProdutoSelected ? 'font-medium text-lg border-b-2 border-[#355070] ' : 'font-light text-sm'}`}
                                onClick={handleModeloButtonClick}>
                                MODELOS
                            </button>

                        </div>

                        <InputSearcModal props="text" funcao={isProdutoSelected ? fetchDataFilterSearchProduto : fetchDataFilterSearchModel}>Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[78%] mt-2 flex justify-center items-center '>
                        <div className=' w-full h-[100%] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto rounded-md'>
                            {isProdutoSelected ? (
                                <TabelaPage colunas={colunasETP} dados={dadosDoBancoETP.map(({ id, ...dados }) => dados)} edit={handleEditarEtp} remove={handleDeleteEtp} id={etpsIds} />
                            ) : (
                                <TabelaPage colunas={colunasModel} dados={dadosDoBancoModel.map(({ id, ...dados }) => dados)} edit={handleEditarModel} remove={handleDeleteModel} id={modelsIds} />
                            )}
                        </div>
                    </div>
                    <div className='w-full h-[8%] mt-2 flex justify-end '>
                        <div className='flex gap-4'>
                            {/* <ButtonModal
                                funcao={AbrirModalCadastreKit}
                            >Novo Kit</ButtonModal> */}
                            <ButtonModal
                                funcao={AbrirModalCadastreModel}
                            >Novo Modelo</ButtonModal>
                            <ButtonModal
                                funcao={AbrirModalCadastreProd}
                            >Novo Produto</ButtonModal>
                            <ButtonModal
                                funcao={() => AbrirModalCadastreProdPreConfig(updateTable)}
                            >ADD Produto</ButtonModal>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Estoque