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

function DashboardGeral() {

    const kpis = [
        {info: "R$ 5785,25", descricao: "Fat. do mês vigente"},
        {info: "R$ 785,25", descricao: "Fat. do dia vigente"},
        {info: "Air Max ", descricao: "Modelo mais vendido"},
        {info: "Air Max Plus OG ", descricao: "Produto mais vendido"},
        {info: "10567 ", descricao: "Produtos em estoque"},
    ]

    const labelsGraficoFaturamento = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    const seriesGraficoFaturamento = [
        {
            name: "Loja 1",
            data: [455, 290, 33, 36, 320, 352, 33]
        },
        {
            name: "Loja 2",
            data: [674, 498, 437, 2344, 1557, 1193, 3232]
        },
        {
            name: "Loja 3",
            data: [3435, 454, 545, 55, 232, 555, 4]
        },
        {
            name: "Loja 4",
            data: [34, 44, 145, 1448, 5417, 1553, 1553]
        }
    ]

    const seriesModelosMaisVendidos = [25, 15, 44, 55, 41, 17];
    const labelsModelosMaisVendidos = ["Air Max 100", "Air Max 200", "Air Max 300", "Air Max 400", "Air Max 500", "Air Max 600"];
    

    const categoriesFluxoEstoque = ['Loja 1', 'Loja 2', 'Loja 3', 'Loja 4'];
    const seriesFluxoEstoque = [
        {
            name: 'Estoque',
            data: [44, 55, 57, 56]
        },
        {
            name: 'Vendidos',
            data: [76, 85, 101, 98]
        },
        {
            name: 'Transferidos',
            data: [35, 41, 36, 26]
        }
    ];

    const handleSelectOpcao1 = () => {
        alert("Função da opção 1 executada!");
    };

    const handleSelectOpcao2 = () => {
        alert("Função da opção 2 executada!");
    };

    return(
        <>
            <PageLayout>
                <TitleBox title="Dashboard Geral"></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                <ChartBox title="Gráfico de Faturamento por Loja" size="long">
                    <div className="absolute top-2 right-3">
                        <ButtonTwoOption 
                            opcao1="Último 12 Meses" 
                            opcao2="Mês Atual" 
                            onSelectOpcao1={handleSelectOpcao1} 
                            onSelectOpcao2={handleSelectOpcao2}
                        />
                    </div>
                    <LineChart categories={labelsGraficoFaturamento} series={seriesGraficoFaturamento}></LineChart>
                    <ButtonInfo mensagem={"O gráfico mostra o faturamento por loja no determinado mês, ou seja, o quanto cada loja vendeu (R$) em cada um dos meses exibidos."}></ButtonInfo>
                </ChartBox>
                <div class="flex gap-3 w-full h-1/2">
                    <ChartBox title="Gráfico de Fluxo de Estoque" size="medium">
                        <BarChart categories={categoriesFluxoEstoque} series={seriesFluxoEstoque }></BarChart>
                        <ButtonInfo mensagem={"O gráfico mostra o fluxo de estoque por loja no determinado mês, ou seja, o quanto foi vendido, transferido ou ainda possuem em estoque."}></ButtonInfo>
                        <ButtonSelectMeses></ButtonSelectMeses>
                    </ChartBox>
                    <ChartBox title="Modelos mais Vendidos" size="small">
                        <PieChart labels={labelsModelosMaisVendidos} series={seriesModelosMaisVendidos}></PieChart>
                        <ButtonInfo mensagem={"O gráfico mostra os modelos mais vendidos no determinado mês."}></ButtonInfo>
                        <ButtonSelectMeses></ButtonSelectMeses>
                    </ChartBox>
                </div>
            </PageLayout>
        </>
    )

}

export default DashboardGeral