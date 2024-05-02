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

    const funcionario = "Fabio Oliveira"

    const kpis = [
        {info: "R$ 5785,25", descricao: "Fat. do mês vigente"},
        {info: "R$ 785,25", descricao: "Fat. do dia vigente"},
        {info: "520 ", descricao: "Vendas realizadas no mês"},
        {info: "4567", descricao: "Produtos vendidos no mês"},
        {info: "Air Max Plus OG", descricao: "Produto mais vendido"},
    ]

    const labelsGraficoFaturamento = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const seriesGraficoFaturamento = [
        {
            name: "Loja 1",
            data: [455, 290, 33, 36, 320, 352, 33, 455, 290, 33, 36, 320]
        }
    ]

    const seriesModelosMaisVendidos = [25, 15, 44, 55, 41, 17];
    const labelsModelosMaisVendidos = ["Air Max 100", "Air Max 200", "Air Max 300", "Air Max 400", "Air Max 500", "Air Max 600"];
    

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

    const handleSelectOpcao1 = () => {
        alert("Função da opção 1 executada!");
    };

    const handleSelectOpcao2 = () => {
        alert("Função da opção 2 executada!");
    };

    return(
        <>
            <PageLayout>
                <TitleBox title={funcionario}></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                <div class="flex gap-3 w-full h-1/2">
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
                        <PieChart labels={labelsModelosMaisVendidos} series={seriesModelosMaisVendidos}></PieChart>
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