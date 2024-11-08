import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import AbrirModalCadastreKit from '../../modals/modals-kit/modalCadastreKit.js'
import AbrirModalCadastreModel from '../../modals/modals-model/modalCadastreModel.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'
import ModalAddProdCart from '../../modals/modals-produto/modalAddProdCart.js'
import AbrirModalEditProd from '../../modals/modals-produto/modalEditProd.js'
import AbrirModalEditModel from '../../modals/modals-model/modalEditModel.js'
import Filter from '../../inputs/filter.js'

import React, { useState, useEffect } from 'react';
import Alert from '../../alerts/Alert.js'
import errorImage from "../../../assets/error.png"

function EstoqueGerente() {

    const buttons = [
        { label: "ADICIONAR PRODUTO", event: ModalAddProdCart },
        // { label: "NOVO KIT", event: AbrirModalCadastreKit },
        { label: "NOVO MODELO", event: AbrirModalCadastreModel },
        { label: "NOVO PRODUTO", event: AbrirModalCadastreProd },
    ];

    const [colunasETP, setColunasETP] = useState([]);
    const [colunasModel, setColunasModel] = useState([]);
    const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
    const [dadosDoBancoModel, setDadosDoBancoModel] = useState([]);
    const [isProdutoSelected, setIsProdutoSelected] = useState(true);
    const [etpsIds, setEtpsIds] = useState([]);
    const [modelsIds, setModelsIds] = useState([]);


    async function fetchETPs() {
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

    async function fetchModelos() {
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

    async function fetchData() {
        const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'Item Promo.', 'N.Itens'];
        const colunasDoBancoModel = ['Nome', 'Categoria', 'Tipo'];

        setColunasETP(colunasDoBancoETP);
        setColunasModel(colunasDoBancoModel);

        fetchETPs();
        fetchModelos();
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
            const searchData = dadosDoBancoETP.filter((item) =>
                item.codigo.toLowerCase().includes(lowerCaseFilter) ||
                item.nome.toLowerCase().includes(lowerCaseFilter) ||
                item.modelo.toLowerCase().includes(lowerCaseFilter) ||
                item.cor.toLowerCase().includes(lowerCaseFilter) ||
                item.loja.toLowerCase().includes(lowerCaseFilter) ||
                item.itemPromocional.toLowerCase().includes(lowerCaseFilter)
            );
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
                item.codigo.toLowerCase().includes(lowerCaseFilter) ||
                item.nome.toLowerCase().includes(lowerCaseFilter) ||
                item.categoria.toLowerCase().includes(lowerCaseFilter) ||
                item.tipo.toLowerCase().includes(lowerCaseFilter)
            );
            setDadosDoBancoModel(searchData);
            const filtrarIdsModels = searchData.map(obj => ({ id: obj.id }));
            setModelsIds(filtrarIdsModels)
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
            if (response.response.status === 204) {
                Alert.alertSuccess("Modelo excluído com sucesso!");
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

    async function csvProdutos() {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.getCsvEstoque();
            } else {
                response = await ApiRequest.getCsvEstoqueByLoja(localStorage.getItem('visao_loja'));
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

                link.setAttribute('download', `Estoque_${formattedDate}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }

        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function csvModelos() {
        try {
            let response;
            if (localStorage.getItem('cargo') == 'ADMIN' && localStorage.getItem('visao_loja') == 0) {
                response = await ApiRequest.getCsvModelos();
            } else {
                response = await ApiRequest.getCsvModelosByLoja(localStorage.getItem('visao_loja'));
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

                link.setAttribute('download', `Estoque_Modelos_${formattedDate}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }

        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Estoque" buttons={buttons}></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    {
                        isProdutoSelected ? (
                            <Filter modelo cor tamanho preço funcaoFilter={fetchDataFilterProduto} funcaoOriginal={fetchData}></Filter>
                        ) : (
                            <Filter modelo categoriaModelo tipoModelo funcaoFilter={fetchDataFilterModelo} funcaoOriginal={fetchData}></Filter>
                        )
                    }
                </div>

                <ChartBox>
                    <div className='px-4 pt-1'>
                        <div className='w-full flex justify-between items-center '>

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

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text" funcao={isProdutoSelected ? fetchDataFilterSearchProduto : fetchDataFilterSearchModel}>Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={isProdutoSelected ? csvProdutos : csvModelos} ></ButtonDownLoad>
                            </div>
                        </div>
                        <div className='w-full h-[50vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            {isProdutoSelected ? (
                                <TabelaPage colunas={colunasETP} dados={dadosDoBancoETP.map(({ id, ...dados }) => dados)} edit={handleEditarEtp} remove={handleDeleteEtp} id={etpsIds} />
                            ) : (
                                <TabelaPage colunas={colunasModel} dados={dadosDoBancoModel.map(({ id, ...dados }) => dados)} edit={handleEditarModel} remove={handleDeleteModel} id={modelsIds} />
                            )}
                        </div>
                    </div>
                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )


}
export default EstoqueGerente;
