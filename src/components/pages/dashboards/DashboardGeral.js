import { useEffect, useState } from "react";
import PageLayout from '../PageLayoutAreaRestrita.js';
import TitleBox from '../../header/TitleBox.js';
import Kpis from '../../kpis/Kpis.js';
import ChartBox from '../../chartsBoxes/ChartBox.js';
import LineChart from '../../charts/LineChart.js';
import PieChart from '../../charts/PieChart.js';
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

    const [dadosGraficoFaturamentoPorLoja, setDadosGraficoFaturamentoPorLoja] = useState([]);
    const [dadosGraficoFaturamentoPorLojaMesAtual, setDadosGraficoFaturamentoPorLojaMesAtual] = useState([]);
    const [mostrarFaturamentoMesAtual, setMostrarFaturamentoMesAtual] = useState(false);

    const [seriesModelosMaisVendidos, setSeriesModelosMaisVendidos] = useState([]);
    const [labelsModelosMaisVendidos, setLabelsModelosMaisVendidos] = useState([]);

    const [categoriesFluxoEstoque, setCategoriesFluxoEstoque] = useState([]);
    const [seriesFluxoEstoque, setSeriesFluxoEstoque] = useState([]);

    async function fetchDadosKpi() {
        try {
            const response = await ApiRequest.kpisGetAll();
            if (response.status === 200) {
                setDadosKpi(response.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDadosFaturametoLoja() {
        try {
            const response = await ApiRequest.faturamentoPorLoja();
            if (response.status === 200) {
                const dadosTransformados = transformaDadosFaturamento(response.data);
                setDadosGraficoFaturamentoPorLoja(dadosTransformados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDadosFaturametoLojaMesAtual() {
        try {
            const response = await ApiRequest.faturamentoPorLojamesAtual();
            if (response.status === 200) {
                const dadosTransformados = transformaDadosFaturamento(response.data);
                setDadosGraficoFaturamentoPorLojaMesAtual(dadosTransformados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDadosModeloMaisVendido() {
        try {
            const response = await ApiRequest.GraficomodelosMaisVendidos();
            if (response.status === 200) {
                const dadosTransformados = transformaDadosModelosMaisVendidos(response.data);
                setSeriesModelosMaisVendidos(dadosTransformados.series);
                setLabelsModelosMaisVendidos(dadosTransformados.labels);
                console.log(dadosTransformados.series);
                console.log(dadosTransformados.labels);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDadosFluxoEstoque() {
        try {
            const response = await ApiRequest.GraficoFluxoEstoque();
            if (response.status === 200) {
                const dadosTransformados = transformaDadosFluxoEstoque(response.data);
                setCategoriesFluxoEstoque(dadosTransformados.categories);
                setSeriesFluxoEstoque(dadosTransformados.series);
                console.log(dadosTransformados.categories);
                console.log(dadosTransformados.series);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchDadosKpi();
        fetchDadosFaturametoLoja();
        fetchDadosFaturametoLojaMesAtual();
        fetchDadosModeloMaisVendido();
        fetchDadosFluxoEstoque();
    }, []);

    function transformaDadosFaturamento(dados) {
        const series = dados.map(loja => ({
            name: loja[0],
            data: loja.slice(1)  // Inclui todos os elementos, incluindo o último
        }));

        return series;
    }

    function transformaDadosModelosMaisVendidos(dados) {
        const series = dados.map(item => item.valorVendido);
        const labels = dados.map(item => item.modelo.nome);

        console.log(series);
        console.log(labels);

        return { series, labels };
    }

    function transformaDadosFluxoEstoque(dados) {
        const categories = dados.map(item => item.nomeLoja);
        const series = [
            { name: 'Estoque', data: dados.map(item => item.qtdAtual) },
            { name: 'Vendidos', data: dados.map(item => item.qtdVendida) },
            { name: 'Transferidos', data: dados.map(item => item.qtdTransferida) }
        ];

        console.log(categories);
        console.log(series);

        return { categories, series };
    }

    const kpis = [
        { info: `R$ ${dadosKpi.faturamentoMes.toFixed(2)}`, descricao: "Fat. do mês vigente" },
        { info: `R$ ${dadosKpi.faturamentoDia.toFixed(2)}`, descricao: "Fat. do dia vigente" },
        { info: dadosKpi.modeloMaisVendido, descricao: "Modelo mais vendido" },
        { info: dadosKpi.produtoMaisVendido, descricao: "Produto mais vendido" },
        { info: dadosKpi.produtosEmEstoque.toString(), descricao: "Produtos em estoque" }
    ];

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getMonthLabels() {
        const currentMonth = new Date().getMonth();
        const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let labels = [];

        for (let i = 0; i < 12; i++) {
            const index = (currentMonth + 12 - i) % 12;
            labels.push(monthLabels[index]);
        }
        labels.reverse();

        return labels;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    const labelsGraficoFaturamentoMesAtual = Array.from({ length: daysInCurrentMonth }, (_, i) => (i + 1).toString());

    const labelsGraficoFaturamento = mostrarFaturamentoMesAtual ? labelsGraficoFaturamentoMesAtual : getMonthLabels();
    const seriesGraficoFaturamento = mostrarFaturamentoMesAtual ? dadosGraficoFaturamentoPorLojaMesAtual : dadosGraficoFaturamentoPorLoja;

    const handleSelectOpcao1 = () => {
        setMostrarFaturamentoMesAtual(false);
    };

    const handleSelectOpcao2 = () => {
        setMostrarFaturamentoMesAtual(true);
    };

    return (
        <>
            <PageLayout>
                <TitleBox title="Dashboard Geral" />
                <Kpis kpis={kpis} />
                <ChartBox title="Gráfico de Faturamento por Loja" size="long">
                    <div className="absolute top-2 right-3">
                        <ButtonTwoOption
                            opcao1="Último 12 Meses"
                            opcao2="Mês Atual"
                            onSelectOpcao1={handleSelectOpcao1}
                            onSelectOpcao2={handleSelectOpcao2}
                        />
                    </div>
                    <LineChart categories={labelsGraficoFaturamento} series={seriesGraficoFaturamento} />
                    <ButtonInfo mensagem={"O gráfico mostra o faturamento por loja no determinado mês, ou seja, o quanto cada loja vendeu (R$) em cada um dos meses exibidos."} />
                </ChartBox>
                <div className="flex gap-3 w-full h-1/2">
                    <ChartBox title="Gráfico de Fluxo de Estoque" size="medium">
                        <BarChart categories={categoriesFluxoEstoque} series={seriesFluxoEstoque} />
                        <ButtonInfo mensagem={"O gráfico mostra o fluxo de estoque por loja no determinado mês, ou seja, o quanto foi vendido, transferido ou ainda possuem em estoque."} />
                        <ButtonSelectMeses />
                    </ChartBox>
                    <ChartBox title="Modelos mais Vendidos" size="small">
                        <PieChart labels={labelsModelosMaisVendidos} series={seriesModelosMaisVendidos} />
                        <ButtonInfo mensagem={"O gráfico mostra os modelos mais vendidos no determinado mês."} />
                        <ButtonSelectMeses />
                    </ChartBox>
                </div>
            </PageLayout>
        </>
    );
}

export default DashboardGeral;
