import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import ButtonModal from '../../buttons/buttonsModal.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import AbrirModalCadastreKit from '../../modals/modals-kit/modalCadastreKit.js'
import AbrirModalCadastreModel from '../../modals/modals-model/modalCadastreModel.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'
import AbrirModalCadastreUser from '../../modals/modals-user/modalCadastreUser.js'
import PageLayout from '../PageLayout.js'
import Filter from '../../inputs/filter.js'



import React, { useState, useEffect } from 'react';
import AbrirModalComission from '../../modals/modalComission.js'
import ButtonCancel from '../../buttons/buttonCancel.js'


function EstoqueGerente() {

    const buttons = [
        { label: "NOVO KIT", event: AbrirModalCadastreKit },
        { label: "NOVO MODELO", event: AbrirModalCadastreModel },
        { label: "NOVO PRODUTO", event: AbrirModalCadastreProd },
    ];

    const [colunasETP, setColunasETP] = useState([]);
    const [colunasModel, setColunasModel] = useState([]);
    const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
    const [dadosDoBancoModel, setDadosDoBancoModel] = useState([]);
    const [isProdutoSelected, setIsProdutoSelected] = useState(true);

    async function fetchData() {
        const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Cor', 'Preço', 'Loja', 'N.Itens'];
        const colunasDoBancoModel = ['Código', 'Nome', 'Categoria', 'Tipo'];

        try {
            const response = await ApiRequest.etpsGetAll();

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBancoETP(dados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
        try {
            const responseModel = await ApiRequest.modeloGetAll();

            if (responseModel.status === 200) {
                const dados = responseModel.data;
                setDadosDoBancoModel(dados);
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

    async function csvProdutos() {
        alert("Implementar lógica csv produtos!")
    }

    async function csvModelos() {
        alert("Implementar lógica csv modelos!")
    }

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Estoque" buttons={buttons}></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter modelo cor tamanho preço></Filter>
                </div>

                <div className='h-[80vh] pb-12' >
                    <ChartBox>
                        <div className='px-4'>
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
                                    <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                    <ButtonDownLoad func={isProdutoSelected ? csvProdutos : csvModelos} ></ButtonDownLoad>
                                </div>
                            </div>
                            {/* <div className='w-full h-[60vh] flex justify-center items-center'> */}
                            <div className='w-full h-[58vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                                {isProdutoSelected ? (
                                    <TabelaPage colunas={colunasETP} dados={[...dadosDoBancoETP]} edit remove />
                                ) : (
                                    <TabelaPage colunas={colunasModel} dados={dadosDoBancoModel.map(({id, ...dados}) => dados)} edit remove />
                                )}
                            </div>
                            {/* </div> */}
                        </div>
                    </ChartBox>
                </div>
            </PageLayoutAreaRestrita>
        </>
    )


}
export default EstoqueGerente;
