import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import Kpis from '../../kpis/Kpis.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import LineChart from '../../charts/LineChart.js'
import PieChart from '../../charts/PieChart.js'
import TableRanking from '../../tables/TableRankingFunc.js'
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
        }
    ]

    const seriesModelosMaisVendidos = [25, 15, 44, 55, 41, 17];
    const labelsModelosMaisVendidos = ["Air Max 100", "Air Max 200", "Air Max 300", "Air Max 400", "Air Max 500", "Air Max 600"];
    

    const categoriesFluxoEstoque = ['Loja 1'];
    const seriesFluxoEstoque = [
        {
            name: 'Estoque',
            data: [44]
        },
        {
            name: 'Vendidos',
            data: [76]
        },
        {
            name: 'Transferidos',
            data: [35]
        }
    ];

    const handleSelectOpcao1 = () => {
        alert("Função da opção 1 executada!");
    };

    const handleSelectOpcao2 = () => {
        alert("Função da opção 2 executada!");
    };

    const headerRanking = ['#', 'Funcionário', 'Faturamento', '']
    const serieRanking = [
        { posicao: 1, funcionario: 'Paulo', faturamento: 5000.0},
        { posicao: 2, funcionario: 'Paula', faturamento: 4500.0},
        { posicao: 3, funcionario: 'Ana', faturamento: 4000.0},
        { posicao: 4, funcionario: 'José', faturamento: 400.0},
        { posicao: 5, funcionario: 'José', faturamento: 400.0},
        { posicao: 4, funcionario: 'José', faturamento: 400.0},
        { posicao: 4, funcionario: 'José', faturamento: 400.0},
        { posicao: 5, funcionario: 'José', faturamento: 400.0},
        { posicao: 4, funcionario: 'José', faturamento: 400.0},
        { posicao: 4, funcionario: 'José', faturamento: 400.0},
    ]

    return(
        <>
            <PageLayout>
                <TitleBox title="Dashboard Geral"></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                <div class="flex gap-3 w-full h-1/2">
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
                <div class="flex gap-3 w-full h-[200px]">
                    <ChartBox title="Gráfico de Fluxo de Estoque" size="medium">
                        <BarChart categories={categoriesFluxoEstoque} series={seriesFluxoEstoque }></BarChart>
                        <ButtonInfo mensagem={"O gráfico mostra o fluxo de estoque no determinado mês, ou seja, o quanto foi vendido, transferido ou ainda possuem em estoque."}></ButtonInfo>
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