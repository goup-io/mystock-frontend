import { borderRadius, height, margin } from '@mui/system';
import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import Kpis from '../../kpis/Kpis.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import LineChart from '../../charts/LineChart.js'

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
    

    return(
        <>
            <PageLayout>
                <TitleBox title="Dashboard Geral"></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                <ChartBox title="Gráfico de Faturamento por Loja" size="long">
                    <LineChart categories={labelsGraficoFaturamento} series={seriesGraficoFaturamento}></LineChart>
                </ChartBox>
                <div class="flex gap-3 w-full h-1/2">
                    <ChartBox title="Gráfico de Fluxo de Estoque" size="medium"></ChartBox>
                    <ChartBox title="Modelos mais Vendidos" size="small"></ChartBox>
                </div>
            </PageLayout>
        </>
    )

}

export default DashboardGeral