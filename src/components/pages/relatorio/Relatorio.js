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

    let firstTime = true;


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
                console.log("Não foi possível encontrar dados do ranking dos funcionarios, por favor, tente novamente")
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
                console.log("Não foi possível buscar os dados dos produtos que estão acabando, por favor, tente novamente")
                return;
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
                console.log("Não foi possível buscar os dados do resumo das vendas, por favor, tente novamente")
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
                console.log("Não foi possível encontrar dados do ranking de modelos mais vendidos, por favor, tente novamente")
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
                console.log("Não foi possível encontrar dados do resumo do estoque, por favor, tente novamente")
            }

        })

    }

    async function handleFileDownload() {
        listarEstoque();
        listarFuncionarios(dias);
        listarResumoVendas(dias);
        listarEstoqueResumo(dias);
        listarModelosMaisVendidos(dias);

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
                        <div className='w-[50%] text-left p-4'>
                            <h2 className='font-medium text-lg mb-5'>RELATÓRIO DE DESEMPENHO DOS ÚLTIMOS 30 DIAS</h2>
                            <div className='flex flex-col gap-2 w-[80%] h-[100%]'>
                                <p>Este relatório foi elaborado para fornecer uma visão abrangente sobre os principais indicadores de desempenho das lojas nos últimos 30 dias. Com base nos dados mais recentes, ele abrange informações detalhadas sobre os seguintes aspectos:</p>
                                <br></br>
                                <ul>
                                    <li><strong>Vendas</strong>: Apresentação de um ranking dos modelos mais vendidos no período, destacando as tendências do momento.</li>
                                    <li><strong>Funcionários</strong>: Dados relacionados ao desempenho da equipe, destacando número e valor de vendas.
                                    </li>
                                    <li><strong>Estoque</strong>: Informações sobre o fluxo do estoque, incluindo a identificação dos produtos com estoque crítico, permitindo ações rápidas para evitar rupturas e garantir o abastecimento adequado.</li>
                                </ul>
                                <br></br>
                                <p>Este relatório é uma ferramenta essencial para tomada de decisão estratégica, fornecendo uma base sólida para avaliar o desempenho das lojas, identificar oportunidades de melhoria e planejar ações para os próximos períodos.</p>
                                <p>Clique no botão abaixo para gerar o relatório detalhado e ter acesso a todas as informações que ajudarão a direcionar os próximos passos do negócio.</p>
                                <br></br>
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
