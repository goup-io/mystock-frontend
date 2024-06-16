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

    async function fetchDados() {
        try {
            const response = await ApiRequest.kpisGetAll();
            if (response.status === 200) {
                setDadosKpi(response.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

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

    useEffect(() => {
        fetchDados();
    }, []);

    function transformaDadosFaturamento(dados) {
        const series = dados.map(loja => ({
            name: loja[0],
            data: loja.slice(1)
        }));

        return series;
    }

    const kpis = [
        { info: `R$ ${dadosKpi.faturamentoMes.toFixed(2)}`, descricao: "Fat. do mês vigente" },
        { info: `R$ ${dadosKpi.faturamentoDia.toFixed(2)}`, descricao: "Fat. do dia vigente" },
        { info: dadosKpi.modeloMaisVendido, descricao: "Modelo mais vendido" },
        { info: dadosKpi.produtoMaisVendido, descricao: "Produto mais vendido" },
        { info: dadosKpi.produtosEmEstoque.toString(), descricao: "Produtos em estoque" }
    ];

    const labelsGraficoFaturamento = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const seriesGraficoFaturamento = dadosGraficoFaturamentoPorLoja;

    const seriesModelosMaisVendidos = [25, 15, 44, 55, 41, 17];
    const labelsModelosMaisVendidos = ["Air Max 100", "Air Max 200", "Air Max 300", "Air Max 400", "Air Max 500", "Air Max 600"];

    const categoriesFluxoEstoque = ['Loja 1', 'Loja 2', 'Loja 3', 'Loja 4'];
    const seriesFluxoEstoque = [
        { name: 'Estoque', data: [44, 55, 57, 56] },
        { name: 'Vendidos', data: [76, 85, 101, 98] },
        { name: 'Transferidos', data: [35, 41, 36, 26] }
    ];

    const handleSelectOpcao1 = () => {
        alert("Função da opção 1 executada!");
    };

    const handleSelectOpcao2 = () => {
        alert("Função da opção 2 executada!");
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
