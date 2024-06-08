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
    const [dadosFiltradosETP, setDadosFiltradosETP] = useState([]);
    const [dadosFiltradosModel, setDadosFiltradosModel] = useState([]);


    async function fetchData() {
        const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'Item Promo.', 'N.Itens'];
        const colunasDoBancoModel = ['Código', 'Nome', 'Categoria', 'Tipo'];

        try {
            const response = await ApiRequest.etpsGetAll();

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBancoETP(dados);

                const filtrarDadosETP = dados
                    .map(obj => (
                        {
                            codigo: obj.codigo, nome: obj.nome, modelo: obj.modelo, tamanho: obj.tamanho, cor: obj.cor, preco: obj.preco, loja: obj.loja, itemPromocional: obj.itemPromocional == 'SIM' ? 'Sim' : 'Não', quantidade: obj.quantidade
                        }
                    ));

                setDadosFiltradosETP(filtrarDadosETP);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
       
        try {
            const response = await ApiRequest.modeloGetAll();

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBancoModel(dados);

                const filtrarDadosModel = dados
                    .map(obj => (
                        {
                            codigo: obj.codigo, nome: obj.nome, categoria: obj.categoria, tipo: obj.tipo
                        }
                    ));

                setDadosFiltradosModel(filtrarDadosModel);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunasETP(colunasDoBancoETP);
        setColunasModel(colunasDoBancoModel);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleProdutoButtonClick = () => {
        setIsProdutoSelected(true);
    };

    const handleModeloButtonClick = () => {
        setIsProdutoSelected(false);
    };

    const handleEditarEtp = (etpId) => {
        AbrirModalEditProd(etpId.id, updateTable);
    };

    const handleEditarModel = (modelId) => {
        console.log(modelId);
        AbrirModalEditModel(modelId.id, updateTable);
    };

    async function excluir(etpId) {
        const idProduto = etpId.idProduto
        try {
            const response = await ApiRequest.excluirProduto(idProduto);
            if (response.status === 200) {
                console.log("Produto deletado");
            } else if (response.status === 409) {
                Alert.alert(errorImage, "Este produto já foi excluido!");
            }
        } catch (error) {
            console.log("Erro ao excluir um produto: ", error);
        }
    }

    async function excluir(modelId) {
        const idModelo = modelId.idModelo
        try {
            const response = await ApiRequest.excluirProduto(idModelo);
            if (response.status === 200) {
                console.log("Modelo deletado");
            } else if (response.status === 409) {
                Alert.alert(errorImage, "Este modelo já foi excluido!");
            }
        } catch (error) {
            console.log("Erro ao excluir um modelo: ", error);
        }
    }

    const handleDeleteEtp = (etpId) => {
        Alert.alertQuestion("Deseja excluir esse produto? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluir(etpId), () => updateTable())
    }

    const handleDeleteModel = (modelId) => {
        Alert.alertQuestion("Deseja excluir esse modelo? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluir(modelId), () => updateTable())
    }

    const updateTable = () => {
        fetchData();
    };

    return (
        <>
            <PageLayout>
                <Header telaAtual="Estoque"></Header>

                <div className='w-full flex md:flex-row md:justify-center rounded-md mt-4 py-4 px-10  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter modelo cor tamanho preço></Filter>
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

                        <InputSearcModal
                            props="text"
                        >Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[78%] mt-2 flex justify-center items-center '>
                        <div className=' w-full h-[100%] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto rounded-md'>
                            {isProdutoSelected ? (
                                <TabelaPage colunas={colunasETP} dados={dadosFiltradosETP.map(({ ...dados }) => dados)} edit={handleEditarEtp} remove={handleDeleteEtp} id={dadosDoBancoETP.map(({ ...dadosDoBancoETP }) => dadosDoBancoETP)} />
                            ) : (
                                <TabelaPage colunas={colunasModel} dados={dadosFiltradosModel.map(({ ...dados }) => dados)} edit={handleEditarModel} remove={handleDeleteModel} id={dadosDoBancoModel.map(({ ...dadosDoBancoModel }) => dadosDoBancoModel)} />
                            )}
                        </div>
                    </div>
                    <div className='w-full h-[8%] mt-2 flex justify-end '>
                        <div className='flex gap-4'>
                            <ButtonModal
                                funcao={AbrirModalCadastreKit}
                            >Novo Kit</ButtonModal>
                            <ButtonModal
                                funcao={AbrirModalCadastreModel}
                            >Novo Modelo</ButtonModal>
                            <ButtonModal
                                funcao={AbrirModalCadastreProd}
                            >Novo Produto</ButtonModal>
                            <ButtonModal
                                funcao={AbrirModalCadastreProdPreConfig}
                            >ADD Produto</ButtonModal>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Estoque