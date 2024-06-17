import { borderRadius, height, margin } from '@mui/system';
import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import Kpis from '../../kpis/Kpis.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import LineChart from '../../charts/LineChart.js'
import PieChart from '../../charts/PieChart.js'
import BarChart from '../../charts/BarChart.js'
import ButtonInfo from '../../buttons/ButtonInfo.js'
import ButtonTwoOption from '../../buttons/ButtonTwoOption.js'
import ButtonSelectMeses from '../../buttons/ButtonSelectMeses.js'
import ApiRequest from "../../../connections/ApiRequest";
import { useEffect, useState } from "react";

function DashboardGeral(idUser) {

    const funcionario = "Fabio Oliveira"
    idUser = 1;

    const [dadosKpi, setDadosKpi] = useState({
        faturamentoMes: 0,
        faturamentoDia: 0,
        qtdVendasRealizadas: 0,
        qtdProdutosVendidos: 0,
        produtoMaisVendido: ''
    });
    const [dadosGraficoFaturamento, setDadosGraficoFaturamento] = useState([]);
    const [dadosGraficoFaturamentoMesAtual, setDadosGraficoFaturamentoMesAtual] = useState([]);
    const [mostrarFaturamentoMesAtual, setMostrarFaturamentoMesAtual] = useState(false);

    const [dadosGraficoModelosMaisVendidos, setDadosGraficoModelosMaisVendidos] = useState({ series: [], labels: [] });
    useEffect(() => {
        fetchDados();
    }, []);

    async function fetchDados() {
        try {
            const responseKpi = await ApiRequest.kpisGetAllDashFunc(idUser);
            if (responseKpi.status === 200) {
                setDadosKpi(responseKpi.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de KPI", error);
        }

        try {
            const responseFaturamento = await ApiRequest.faturamentoPorLojaDashFunc(idUser);
            if (responseFaturamento.status === 200) {
                setDadosGraficoFaturamento(transformaDadosFaturamento(responseFaturamento.data));
           
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de faturamento", error);
        }

        try {
            const responseFaturamentoMesAtual = await ApiRequest.faturamentoPorLojamesAtualDashFunc(idUser);
            if (responseFaturamentoMesAtual.status === 200) {
                setDadosGraficoFaturamentoMesAtual(transformaDadosFaturamentoMesAtual(responseFaturamentoMesAtual.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de faturamento do mês atual", error);
        }

        try {
            const responseModelosMaisVendidos = await ApiRequest.GraficomodelosMaisVendidosDashFunc(idUser);
            if (responseModelosMaisVendidos.status === 200) {
                setDadosGraficoModelosMaisVendidos(transformaDadosModelosMaisVendidos(responseModelosMaisVendidos.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de modelos mais vendidos", error);
        }

        // try {
        //     const responseFluxoEstoque = await ApiRequest.GraficoItensVendidosDashFunc(idUser);
        //     if (responseFluxoEstoque.status === 200) {
        //         setDadosGraficoFluxoEstoque(transformaDadosFluxoEstoque(responseFluxoEstoque.data));
        //     }
        // } catch (error) {
        //     console.log("Erro ao buscar os dados de fluxo de estoque", error);
        // }

        // try {
        //     const responseFluxoEstoque = await ApiRequest.GraficoItensVendidosMesAtualDashFunc(idUser);
        //     if (responseFluxoEstoque.status === 200) {
        //         setDadosGraficoFluxoEstoque(transformaDadosFluxoEstoque(responseFluxoEstoque.data));
        //     }
        // } catch (error) {
        //     console.log("Erro ao buscar os dados de fluxo de estoque", error);
        // }

    
    }

    function transformaDadosFaturamento(dados) {
        if (!dados || !Array.isArray(dados) || dados.length === 0) return [];
        
        // Verifica se o primeiro elemento é um array
        if (Array.isArray(dados[0])) {
            return [{
                name: dados[0][0], // Nome da loja
                data: dados[0].slice(1) // Valores de faturamento
            }];
        } else {
            // Trata o caso em que os dados já estão no formato esperado
            return [{
                name: 'Loja', // Nome da loja padrão (ou ajuste conforme necessário)
                data: dados // Valores de faturamento
            }];
        }
    }
    

    function transformaDadosFaturamentoMesAtual(dados) {
        if (!dados || !Array.isArray(dados) || dados.length === 0) return [];
        console.log("Transforma dados faturamento mês atual:", dados);
        return [{
            name: dados[0][0], // Nome da loja
            data: dados[0].slice(1, -1) // Valores de faturamento para os dias do mês, excluindo o último item que é null
        }];
    }

    function transformaDadosModelosMaisVendidos(dados) {
        if (!dados || !Array.isArray(dados)) return { series: [], labels: [] };
        const series = dados.map(item => item.valorVendido);
        const labels = dados.map(item => item.modelo.nome);

        return { series, labels };
    }

    const kpis = [
        { info: `R$ ${dadosKpi.faturamentoMes.toFixed(2)}`, descricao: "Faturamento do mês vigente" },
        { info: `R$ ${dadosKpi.faturamentoDia.toFixed(2)}`, descricao: "Faturamento do dia vigente" },
        { info: dadosKpi.qtdVendasRealizadas, descricao: "Quantidade de vendas realizadas" },
        { info: dadosKpi.qtdProdutosVendidos, descricao: "Quantidade de produtos vendidos" },
        { info: dadosKpi.produtoMaisVendido, descricao: "Produto mais vendido" }
    ];
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const labelsGraficoFaturamentoMesAtual = daysInCurrentMonth ? Array.from({ length: daysInCurrentMonth }, (_, i) => (i + 1).toString()) : [];

    const labelsGraficoFaturamento = mostrarFaturamentoMesAtual ? labelsGraficoFaturamentoMesAtual : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seriesGraficoFaturamento = mostrarFaturamentoMesAtual ? dadosGraficoFaturamentoMesAtual : dadosGraficoFaturamento;

    const handleSelectOpcao1 = () => {
        setMostrarFaturamentoMesAtual(false);
    };

    const handleSelectOpcao2 = () => {
        setMostrarFaturamentoMesAtual(true);
    };



    const categoriesFluxoEstoque = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const seriesFluxoEstoque = [
        {
            name: 'Qtd. Total itens Vendidos ',
            data: [76, 85, 101, 98, 76, 85, 101, 98, 76, 85, 101, 98]
        },
        {
            name: 'Qtd. de Itens Vendidos em Promoção ',
            data: [44, 55, 57, 56, 44, 55, 57, 56, 44, 55, 57, 56]
        }
    ];

    return(
        <>
            <PageLayout>
                <TitleBox title={funcionario}></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                <div className="flex gap-3 w-full h-1/2">
                    <ChartBox title="Gráfico de Faturamento do Funcionario" size="medium">
                        <LineChart categories={labelsGraficoFaturamento} series={seriesGraficoFaturamento}></LineChart>
                        <ButtonInfo mensagem={"O gráfico mostra o faturamento do funcionário no determinado período, ou seja, o quanto ele vendeu (R$) em cada um dos meses exibidos."}></ButtonInfo>
                        <div className="absolute top-2 right-3">
                            <ButtonTwoOption 
                                opcao1="Último 12 Meses" 
                                opcao2="Mês Atual" 
                                onSelectOpcao1={handleSelectOpcao1} 
                                onSelectOpcao2={handleSelectOpcao2}
                            />
                        </div>
                    </ChartBox>
                    <ChartBox title="Modelos mais Vendidos" size="small">
                    <PieChart series={dadosGraficoModelosMaisVendidos.series} labels={dadosGraficoModelosMaisVendidos.labels}></PieChart>
                        <ButtonInfo mensagem={"O gráfico mostra os modelos mais vendidos pelo funcionário no determinado mês."}></ButtonInfo>
                        <ButtonSelectMeses></ButtonSelectMeses>
                    </ChartBox>
                </div>
                <ChartBox title="Gráfico de Venda dos Itens" size="long">
                    <div className="absolute top-2 right-3">
                        <ButtonTwoOption 
                            opcao1="Último 12 Meses" 
                            opcao2="Mês Atual" 
                            onSelectOpcao1={handleSelectOpcao1} 
                            onSelectOpcao2={handleSelectOpcao2}
                        />
                    </div>
                    <BarChart categories={categoriesFluxoEstoque} series={seriesFluxoEstoque}></BarChart>
                    <ButtonInfo mensagem={"O gráfico mostra a quantidade de vendas pelo funcionário no determinado período, ou seja, o quanto itens ele vendeu em cada um dos meses exibidos."}></ButtonInfo>
                </ChartBox>
            </PageLayout>
        </>
    )

}

export default DashboardGeral