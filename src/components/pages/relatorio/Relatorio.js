import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import imgPageRelatorios from '../../../assets/icons/svg_page_relatorios.png'
import ButtonModal from '../../buttons/buttonsModal.js'
import React, { useState, useEffect } from 'react';

//RELATORIO
import RelatorioGeral from '../../pdf/relatorioGeral.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import ReactDOMServer from 'react-dom/server';

import ApiRequest from '../../../connections/ApiRequest.js'
import MyStockLogo from '../../../assets/icons/logologoMyStock-v1.jpg'

import Alert from '../../alerts/Alert.js'
import ErrorIcon from '../../../assets/icons/error.svg'
import SucessIcon from '../../../assets/icons/sucess.svg'

function Relatorio() {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesAtual = new Date().getMonth();
    const [mesSelecionado, setMesSelecionado] = useState(meses[mesAtual]);

    const diaAtual = new Date().getDate();
    const [diaSelecionado, setDiaSelecionado] = useState(diaAtual);

    const anoAtual = new Date().getFullYear();
    const [anoSelecionado, setAnoSelecionado] = useState(anoAtual);

    const [modeloSelecionado, setModeloSelecionado] = useState('diario');

    const handleSelectMes = (event) => {
        setMesSelecionado(event.target.value);
    };

    const handleDia = (event) => {
        setDiaSelecionado(event.target.value);
    };

    const handleAno = (event) => {
        setAnoSelecionado(event.target.value);
    };

    const handleModelo = (event) => {
        setModeloSelecionado(event.target.value); // Atualiza o estado do modelo selecionado
    };


    const [listaEstoque, setListaEstoque] = useState([]);
    const [listaMaisVendidos, setListaMaisVendidos] = useState([]);
    const [listaFuncionariosRanking, setListaFuncionarioRanking] = useState([]);
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [lucro, setLucro] = useState(0);
    const [variacaoLucro, setVariacaoLucro] = useState(0);

    const [qtdEstoqueAtual, setQtdEstoqueAtual] = useState(0);
    const [qtdProdutosVendidos, setQtdProdutosVendidos] = useState(0);
    const [qtdProdutosTransferidos, setQtdProdutosTransferidos] = useState(0);

    const [dias, setDias] = useState(30)


    useEffect(() => {
        listarEstoque();
        listarFuncionarios(dias);
        listarResumoVendas(dias);
        listarEstoqueResumo(dias);
        listarModelosMaisVendidos(dias);
    }, [dias])

    async function listarFuncionarios(dias) {
        var listaFuncionariosAux = [];

        const response = await ApiRequest.relatorioRankingVendas(dias).then((req, res) => {
            if (req.status === 200) {
                req.data.forEach(posicaoFuncionario => {
                    listaFuncionariosAux.push(posicaoFuncionario);
                })
                setListaFuncionarioRanking(listaFuncionariosAux);

            } else {
                Alert.alert(ErrorIcon, "Não foi possível encontrar dados do ranking dos funcionarios, por favor, tente novamente")
            }

            //            setListaFuncionarioRanking(listaFuncionariosAux);
        })
    }

    async function listarEstoque() {
        var listaEstoqueAux = [];

        const response = await ApiRequest.relatorioProdutosAcabando().then((req, res) => {
            if (req.status === 200) {
                req.data.forEach(estoque => {
                    listaEstoqueAux.push(estoque);
                })
            } else {
                Alert.alert(ErrorIcon, "Não foi possível buscar os dados dos produtos que estão acabando, por favor, tente novamente")
            }

            setListaEstoque(listaEstoqueAux);
        })

    }

    async function listarResumoVendas(dias) {

        const response = await ApiRequest.relatorioGetResumoGeral(dias).then((req, res) => {
            if (req.status === 200) {
                setEntrada(req.data.entrada);
                setSaida(req.data.saida);
                setLucro(req.data.lucroOperacional);
                setVariacaoLucro(req.data.porcentagemLucro);
            } else {
                Alert.alert(ErrorIcon, "Não foi possível buscar os dados do resumo das vendas, por favor, tente novamente")
            }
        })
    }

    async function listarModelosMaisVendidos(dias) {
        var listaModelosMaisVendidos = [];

        const response = await ApiRequest.relatorioGetModelosMaisVendidosByQtdDias(dias).then((req, res) => {
            if (req.status === 200) {
                req.data.forEach(modelo => {
                    listaModelosMaisVendidos.push(modelo);
                })
            } else {
                Alert.alert(ErrorIcon, "Não foi possível encontrar dados do ranking de modelos mais vendidos, por favor, tente novamente")
            }

            setListaMaisVendidos(listaModelosMaisVendidos);
        })
    }

    async function listarEstoqueResumo(dias) {
        const response = await ApiRequest.relatorioFluxoEstoque(dias).then((req, res) => {
            if (req.status === 200) {
                setQtdEstoqueAtual(req.data.qtdEstoqueAtual)
                setQtdProdutosVendidos(req.data.qtdProdutosVendidos)
                setQtdProdutosTransferidos(req.data.qtdProdutosTransferidos)
            } else {
                Alert.alert(ErrorIcon, "Não foi possível encontrar dados do resumo do estoque, por favor, tente novamente")
            }

        })

    }

    async function handleFileDownload() {


        const pdfContent = htmlToPdfmake(
            ReactDOMServer.renderToStaticMarkup(
                <RelatorioGeral
                    dias={dias}
                    listaEstoque={listaEstoque}//produtos que estão acabando
                    listaMaisVendidos={listaMaisVendidos}
                    listaFuncionarios={listaFuncionariosRanking}
                    entrada={entrada ? entrada : 0}
                    saida={saida ? saida : 0}
                    lucro={lucro ? lucro : 0}
                    variacaoLucro={variacaoLucro ? variacaoLucro : 0}
                    qtdEstoqueAtual={qtdEstoqueAtual}
                    qtdProdutosVendidos={qtdProdutosVendidos}
                    qtdProdutosTransferidos={qtdProdutosTransferidos}
                    imgMyStock={MyStockLogo}
                />,
                {}
            )
        );

        // Define o documento PDF
        const docDefinition = {
            content: pdfContent,
        };

        // Configuração do pdfMake (caso necessário)
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        // Cria e faz o download do PDF
        pdfMake.createPdf(docDefinition).download('Relatorio.pdf');
    }

    return (
        <>
            <PageLayout>
                <TitleBox title="Relatórios"></TitleBox>
                <ChartBox>
                    <div className='w-full flex p-2'>
                        <div className='w-[50%] text-left '>
                            <h2 className='font-medium text-lg mb-5'>CONFIGURAÇÃO PARA EMISSÃO</h2>
                            <div className='flex flex-col gap-8 w-[50%] h-[100%]'>
                                <div>
                                    <label>Modelo:</label>
                                    <div className='flex gap-5 mt-2'>
                                        <div>
                                            <input
                                                type="radio"
                                                name="i_modelo"
                                                value="anual"
                                                checked={modeloSelecionado === 'anual'}
                                                onChange={handleModelo}
                                            /> Anual
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="i_modelo"
                                                value="mensal"
                                                checked={modeloSelecionado === 'mensal'}
                                                onChange={handleModelo}
                                            /> Mensal
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="i_modelo"
                                                value="diario"
                                                checked={modeloSelecionado === 'diario'}
                                                onChange={handleModelo}
                                            /> Diario
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label>Data referente:</label>
                                    <div className='flex gap-5 my-2'>
                                        <div className='flex flex-col'>
                                            <label>Dia:</label>
                                            <input
                                                type='number'
                                                min={1}
                                                max={31}
                                                value={diaSelecionado}
                                                placeholder='01'
                                                className='border rounded pl-3'
                                                onChange={handleDia}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label>Mês:</label>
                                            <select
                                                value={mesSelecionado}
                                                onChange={handleSelectMes}
                                                className="border rounded"
                                            >
                                                {meses.map((mes, index) => (
                                                    <option key={index} value={mes}>
                                                        {mes}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label>Ano:</label>
                                            <input
                                                type='number'
                                                min={2024}
                                                max={2050}
                                                value={anoSelecionado}
                                                name='i_ano'
                                                placeholder={anoAtual}
                                                className='border rounded pl-3'
                                                onChange={handleAno}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Tipo:</label>
                                    <select className='border rounded px-1' name='i_tipo'>
                                        <option value={0}>Geral (todas as lojas)</option>
                                    </select>
                                </div>
                                <div className='w-full flex flex-col bottom-0'>
                                    <ButtonModal
                                        funcao={handleFileDownload}
                                    >GERAR RELATÓRIO</ButtonModal>
                                </div>
                            </div>
                        </div>
                        <img src={imgPageRelatorios} className='h-[70vh]' />
                    </div>
                </ChartBox>
            </PageLayout>
        </>
    );
}

export default Relatorio;
