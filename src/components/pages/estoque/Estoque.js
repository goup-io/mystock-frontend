import { Button } from '@mui/material'
import ButtonClear from '../../buttons/buttonClear.js'
import ButtonModal from '../../buttons/buttonsModal.js'
import Header from '../../header/Header.js'
import ComboBoxFilter from '../../inputs/comboBoxFilter.js'
import InputFilterDate from '../../inputs/inputFilterDate.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import AbrirModalCadastreKit from '../../modals/modals-kit/modalCadastreKit.js'
import AbrirModalCadastreModel from '../../modals/modals-model/modalCadastreModel.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'
import AbrirModalCadastreUser from '../../modals/modals-user/modalCadastreUser.js'
import TabelaPage from '../../tables/tablePage.js'
import PageLayout from '../PageLayout.js'
import ApiRequest from "../../../connections/ApiRequest";


import React, { useState, useEffect } from 'react';
import Filter from '../../inputs/filter.js'

function Estoque() {

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

return (
    <>
        <PageLayout>
            <Header telaAtual="Estoque"></Header>

            {/* <div className=" w-full h-[6rem] flex flex-col rounded-md mt-4 p-2 shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] justify-around items-center text-sm bg-white">
                <div className="w-full h-[2.5rem] p-4 flex justify-center items-center ">
                    <div className="w-[52%]  h-2/2 flex justify-start items-center">

                        <div className='w-[32%]'>
                            <ComboBoxFilter
                                dadosBanco="teste"
                            >Modelo</ComboBoxFilter>
                        </div>
                        <div className='w-[28%] ml-4 '>
                            <ComboBoxFilter
                                dadosBanco="teste"
                            >Cor</ComboBoxFilter>
                        </div>

                        <div className='w-[34%] ml-4 '>
                            <ComboBoxFilter
                                dadosBanco="teste"
                            >Tamanho</ComboBoxFilter>
                        </div>

                    </div>
                    <div className=" w-[28%] h-2/2 flex justify-center">
                        <InputFilterDate
                            type="text"
                            placeholder="HH:MM"
                            inicio="Preço de"
                            fim="á"
                        ></InputFilterDate>
                    </div>
                    <div className='w-[16%] h-[4rem] ml-2 flex items-center justify-around '>
                        <ButtonClear>Limpar</ButtonClear>
                        <ButtonModal>Filtrar</ButtonModal>
                    </div>

                </div>
            </div> */}

            <div className='w-full flex md:flex-row md:justify-center rounded-md mt-4 py-4 px-10  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                <Filter modelo cor tamanho preço></Filter>
            </div>



            <div className='bg-white mt-4 h-[74%] flex flex-col justify-start pl-10 pr-10 pt-2 pb-2 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='w-full h-[8%] flex justify-between items-center '>

                    <div className='w-[12rem] flex justify-between items-center'>

                        <Button onClick={handleProdutoButtonClick}>
                            <span className={isProdutoSelected ? "text-black text-lg font-medium" : "text-slate-500 text-sm font-medium"}>PRODUTOS</span>
                        </Button>
                        <Button onClick={handleModeloButtonClick}>
                            <span className={!isProdutoSelected ? "text-black text-lg font-medium" : "text-slate-500 text-sm font-medium"}>MODELOS</span>
                        </Button>

                    </div>

                    <InputSearcModal
                        props="text"
                    >Pesquisar</InputSearcModal>
                </div>
                <div className='w-full h-[78%] mt-2 flex justify-center items-center '>
                    <div className=' w-full h-[100%] border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto'>
                        {isProdutoSelected ? (
                            <TabelaPage colunas={colunasETP} dados={[...dadosDoBancoETP]} edit remove />
                        ) : (
                            <TabelaPage colunas={colunasModel} dados={[...dadosDoBancoModel]} edit remove />
                        )}
                    </div>
                </div>
                <div className='w-full h-[8%] mt-2 flex justify-end '>
                    <div className='w-5/12 flex justify-between'>
                        <ButtonModal
                            funcao={AbrirModalCadastreKit}
                        >Novo Kit</ButtonModal>
                        <ButtonModal
                            funcao={AbrirModalCadastreModel}
                        >Novo Modelo</ButtonModal>
                        <ButtonModal
                            funcao={AbrirModalCadastreProd}
                        >Novo Produto</ButtonModal>
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
)
}

export default Estoque