import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import imgPageRelatorios from '../../../assets/icons/svg_page_relatorios.png'
import ButtonModal from '../../buttons/buttonsModal.js'
import React, { useState, useEffect } from 'react';

//RELATORIO
import RelatorioGeral from '../../pdf/RelatorioGeral.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import ReactDOMServer from 'react-dom/server';

import ApiRequest from '../../../connections/ApiRequest.js'
import MyStockLogo from '../../../assets/icons/logologoMyStock-v1.jpg' 

function Relatorio() {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesAtual = new Date().getMonth();
    const [mesSelecionado, setMesSelecionado] = useState(meses[mesAtual]);

    const diaAtual = new Date().getDate();
    const [diaSelecionado, setDiaSelecionado] = useState(diaAtual);

    const anoAtual = new Date().getFullYear();
    const [anoSelecionado, setAnoSelecionado] = useState(anoAtual);

    const [modeloSelecionado, setModeloSelecionado] = useState('diario');

    const [dadosCarregados, setDadosCarregados] = useState(false);
    
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

    var listaFuncionarios = [];
    var listaMaisVendidos = [];

    var entrada = 0;
    var saida = 0;
    var lucroOperacional = 0;
    var porcentagemLucro = 0;

    var qtdEstoqueAtual = 0;
    var qtdProdutosVendidos = 0;
    var qtdProdutosTransferidos = 0;

    useEffect(()=>{
        // listarFuncionarios();
        listarEstoque(2);
        // listarEntrada();
        // listarModelosMaisVendidos();
        // listarEstoqueResumo();
    },[])

    async function listarFuncionarios(dias){

        listaFuncionarios = [];

        try{

            const response = await ApiRequest.relatorioRankingVendas(dias);
            if(response.status === 200){
                response.data.forEach(funcionario => {
                    listaFuncionarios.push(funcionario);
                })
            }
            

        }catch (error){
            console.log("Erro ao buscar os funcionarios");
        }

        return listaFuncionarios;
    }

    async function listarEstoque(dias){
        var listaEstoqueAux = [];
        try{

            const response = await ApiRequest.relatorioProdutosAcabando(dias);

            if(response.status === 200){
                response.data.forEach(estoque => {
                    listaEstoqueAux.push(estoque);
                })
            }

        }catch (error){
            console.log("Erro ao buscar a lista do estoque");
        }

        var estoque01 = {
            "nome": "Papete",
            "qtdEstoque": 2,
            "lojaNome": "Sapatilha",
        } 

        listaEstoqueAux.push(estoque01)

        console.log("Lista Estoque: ", listaEstoqueAux)

        setListaEstoque(listaEstoqueAux);
        setDadosCarregados(true);
    }

    async function listarEntrada(){
       
    
        var dadosEntrada = {
            "entrada" : 1242,
            "saida" : 125234,
            "lucroOperacional" : 6212,
            "porcentagemLucro" : 23,
        }

        return dadosEntrada
    }

    async function listarModelosMaisVendidos(){
        
        listaMaisVendidos = [];

        var produto01 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto02 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto03 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto04 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto05 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        listaMaisVendidos.push(produto01);
        listaMaisVendidos.push(produto02);
        listaMaisVendidos.push(produto03);
        listaMaisVendidos.push(produto04);
        listaMaisVendidos.push(produto05);
    }

    async function listarEstoqueResumo(){
        qtdEstoqueAtual = 4124;
        qtdProdutosVendidos = 124124;
        qtdProdutosTransferidos = 1231;
    }

    const downloadFileFromResponseObjectPdf = (responseObject, fileName) => {

        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        console.log("RESPONSE OBJ", responseObject)
        
        const htmlString = ReactDOMServer.renderToStaticMarkup(responseObject);
        console.log("HTML", htmlString)
        const pdfContent = htmlToPdfmake(htmlString);    
        const docDefinition = { 
            content: [
                // {
                //     image: `${MyStockLogo}`,
                //     width: 150
                // },
                pdfContent
            ]};
        
        pdfMake.createPdf(docDefinition).download(fileName);
        pdfMake.createPdf(docDefinition).open();
    };
    
    async function handleFileDownload() {
        if (!dadosCarregados) {
            console.log("Aguarde até que os dados sejam carregados.");
            return;
        }
    
        // Cria o conteúdo do PDF com os dados carregados
        const pdfContent = await htmlToPdfmake(
            listaEstoque &&
            ReactDOMServer.renderToStaticMarkup(
                <RelatorioGeral 
                    dias={2}
                    listaEstoque={listaEstoque}
                />
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
