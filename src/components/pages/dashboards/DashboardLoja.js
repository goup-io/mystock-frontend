import { useEffect, useState } from "react";
import PageLayout from '../PageLayoutAreaRestrita.js';
import TitleBox from '../../header/TitleBox.js';
import Kpis from '../../kpis/Kpis.js';
import ChartBox from '../../chartsBoxes/ChartBox.js';
import LineChart from '../../charts/LineChart.js';
import PieChart from '../../charts/PieChart.js';
import TableRanking from '../../tables/TableRankingFunc.js';
import BarChart from '../../charts/BarChart.js';
import ButtonInfo from '../../buttons/ButtonInfo.js';
import ButtonTwoOption from '../../buttons/ButtonTwoOption.js';
import ButtonSelectMeses from '../../buttons/ButtonSelectMeses.js';
import ApiRequest from "../../../connections/ApiRequest";

function DashboardGeral() {
    

    const [dadosKpi, setDadosKpi] = useState({
        faturamentoMes: 0,
        faturamentoDia: 0,
        modeloMaisVendido: '',
        produtoMaisVendido: '',
        produtosEmEstoque: 0
    });

    const [dadosGraficoFaturamento, setDadosGraficoFaturamento] = useState([]);
    const [dadosGraficoFaturamentoMesAtual, setDadosGraficoFaturamentoMesAtual] = useState([]);
    const [mostrarFaturamentoMesAtual, setMostrarFaturamentoMesAtual] = useState(false);

    const [dadosGraficoModelosMaisVendidos, setDadosGraficoModelosMaisVendidos] = useState({ series: [], labels: [] });
    const [dadosGraficoFluxoEstoque, setDadosGraficoFluxoEstoque] = useState({ categories: [], series: [] });
    const [rankingFuncionarios, setRankingFuncionarios] = useState([]);

    useEffect(() => {
        fetchDados(localStorage.getItem("visao_loja"));     
        console.log(serieRanking);
    }, [localStorage.getItem("visao_loja")]);

    async function fetchDados(idLoja) {
        try {
            const responseKpi = await ApiRequest.kpisGetAllDashLoja(idLoja);
            console.log("KPI response:", responseKpi);
            if (responseKpi.status === 200) {
                setDadosKpi(responseKpi.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de KPI", error);
        }

        try {
            const responseFaturamento = await ApiRequest.faturamentoPorLojaDashLoja(idLoja);
            console.log("Faturamento response:", responseFaturamento);
            if (responseFaturamento.status === 200) {
                setDadosGraficoFaturamento(transformaDadosFaturamento(responseFaturamento.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de faturamento", error);
        }

        try {
            const responseFaturamentoMesAtual = await ApiRequest.faturamentoPorLojamesAtualDashLoja(idLoja);
            console.log("Faturamento mês atual response:", responseFaturamentoMesAtual);
            if (responseFaturamentoMesAtual.status === 200) {
                setDadosGraficoFaturamentoMesAtual(transformaDadosFaturamentoMesAtual(responseFaturamentoMesAtual.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de faturamento do mês atual", error);
        }

        try {
            const responseModelosMaisVendidos = await ApiRequest.GraficomodelosMaisVendidosDashLoja(idLoja);
            console.log("Modelos mais vendidos response:", responseModelosMaisVendidos);
            if (responseModelosMaisVendidos.status === 200) {
                setDadosGraficoModelosMaisVendidos(transformaDadosModelosMaisVendidos(responseModelosMaisVendidos.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de modelos mais vendidos", error);
        }

        try {
            const responseFluxoEstoque = await ApiRequest.GraficoFluxoEstoqueDashLoja(idLoja);
            console.log("Fluxo de estoque response:", responseFluxoEstoque);
            if (responseFluxoEstoque.status === 200) {
                setDadosGraficoFluxoEstoque(transformaDadosFluxoEstoque(responseFluxoEstoque.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de fluxo de estoque", error);
        }

        try {
            const responseRankingFuncionarios = await ApiRequest.rankingFuncionarios(idLoja);
            console.log("Ranking de funcionários response:", responseRankingFuncionarios);
            if (responseRankingFuncionarios.status === 200) {
                setRankingFuncionarios(responseRankingFuncionarios.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de ranking de funcionários", error);
        }
    }

    function transformaDadosFaturamento(dados) {
        if (!dados || !Array.isArray(dados) || dados.length === 0) return [];
        console.log("Transforma dados faturamento:", dados);
        return [{
    
            data: dados[0].slice(1) // Valores de faturamento
        }];
    }

    function transformaDadosFaturamentoMesAtual(dados) {
        if (!dados || !Array.isArray(dados) || dados.length === 0) return [];
        console.log("Transforma dados faturamento mês atual:", dados);
        return [{
 
            data: dados[0].slice(1, -1) // Valores de faturamento para os dias do mês, excluindo o último item que é null
        }];
    }

    function transformaDadosModelosMaisVendidos(dados) {
        if (!dados || !Array.isArray(dados)) return { series: [], labels: [] };
        console.log("Transforma dados modelos mais vendidos:", dados);
        const series = dados.map(item => item.valorVendido);
        const labels = dados.map(item => item.modelo.nome);

        return { series, labels };
    }

    function transformaDadosFluxoEstoque(dados) {
        if (!dados || typeof dados !== 'object') return { categories: [], series: [] };
        console.log("Transforma dados fluxo de estoque:", dados);
        const categories = [dados.nomeLoja];
        const series = [
            { name: 'Estoque', data: [dados.qtdAtual] },
            { name: 'Vendidos', data: [dados.qtdVendida] },
            { name: 'Transferidos', data: [dados.qtdTransferida] }
        ];

        return { categories, series };
    }

    const kpis = [
        { info: `R$ ${dadosKpi.faturamentoMes.toFixed(2)}`, descricao: "Fat. do mês vigente" },
        { info: `R$ ${dadosKpi.faturamentoDia.toFixed(2)}`, descricao: "Fat. do dia vigente" },
        { info: dadosKpi.modeloMaisVendido, descricao: "Modelo mais vendido" },
        { info: dadosKpi.produtoMaisVendido, descricao: "Produto mais vendido" },
        { info: dadosKpi.produtosEmEstoque.toString(), descricao: "Produtos em estoque" }
    ];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const labelsGraficoFaturamentoMesAtual = Array.from({ length: daysInCurrentMonth }, (_, i) => (i + 1).toString());

    const labelsGraficoFaturamento = mostrarFaturamentoMesAtual ? labelsGraficoFaturamentoMesAtual : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seriesGraficoFaturamento = mostrarFaturamentoMesAtual ? dadosGraficoFaturamentoMesAtual : dadosGraficoFaturamento;

    const handleSelectOpcao1 = () => {
        setMostrarFaturamentoMesAtual(false);
    };

    const handleSelectOpcao2 = () => {
        setMostrarFaturamentoMesAtual(true);
    };

    const headerRanking = ['#', 'Funcionário', 'Faturamento', ''];
    const serieRanking = rankingFuncionarios.map((funcionario, index) => ({
        posicao: index + 1,
        funcionario: funcionario.nomeFuncionario,
        faturamento: funcionario.valorVendido,
        id: funcionario.idFuncionario
    }));

    return (
        <>
            <PageLayout>
                <TitleBox title="Dashboard Loja"></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                <div className="flex gap-3 w-full h-1/2">
                    <ChartBox title="Gráfico de Faturamento" size="medium">
                        <div className="absolute top-2 right-3">
                            <ButtonTwoOption
                                opcao1="Último 12 Meses"
                                opcao2="Mês Atual"
                                onSelectOpcao1={handleSelectOpcao1}
                                onSelectOpcao2={handleSelectOpcao2}
                            />
                        </div>
                        <LineChart categories={labelsGraficoFaturamento} series={seriesGraficoFaturamento}></LineChart>
                        <ButtonInfo mensagem={"O gráfico mostra o faturamento no determinado mês, ou seja, o quanto cada loja vendeu (R$) em cada um dos meses exibidos."}></ButtonInfo>
                    </ChartBox>
                    <ChartBox title="Ranking de Funcionários - Mês Vigente" size="small">
                        <div className='w-full h-[170px] bg-[#355070] rounded-md overflow-y-auto mb-3'>
                            <TableRanking header={headerRanking} series={serieRanking}></TableRanking>
                        </div>
                        <ButtonInfo mensagem={"Listagem dos funcionários ordenados dos que estão com o maior faturamento nas vendas ao menor (dados obtidos do mês vigente)."}></ButtonInfo>
                    </ChartBox>
                </div>
                <div className="flex gap-3 w-full h-[200px]">
                    <ChartBox title="Gráfico de Fluxo de Estoque" size="medium">
                        <BarChart categories={dadosGraficoFluxoEstoque.categories} series={dadosGraficoFluxoEstoque.series}></BarChart>
                        <ButtonInfo mensagem={"O gráfico mostra o fluxo de estoque no determinado mês, ou seja, o quanto foi vendido, transferido ou ainda possuem em estoque."}></ButtonInfo>
                        <ButtonSelectMeses></ButtonSelectMeses>
                    </ChartBox>
                    <ChartBox title="Modelos mais Vendidos" size="small">
                        <PieChart series={dadosGraficoModelosMaisVendidos.series} labels={dadosGraficoModelosMaisVendidos.labels}></PieChart>
                        <ButtonInfo mensagem={"O gráfico mostra os modelos mais vendidos no determinado mês."}></ButtonInfo>
                        <ButtonSelectMeses></ButtonSelectMeses>
                    </ChartBox>
                </div>
            </PageLayout>
        </>
    );
}

export default DashboardGeral;
