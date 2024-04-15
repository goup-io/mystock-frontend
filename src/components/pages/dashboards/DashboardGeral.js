import { borderRadius, height, margin } from '@mui/system';
import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import Kpis from '../../kpis/Kpis.js'

function DashboardGeral() {

    const kpis = [
        {info: "R$ 5785,25", descricao: "Fat. do mês vigente"},
        {info: "R$ 785,25", descricao: "Fat. do dia vigente"},
        {info: "Air Max ", descricao: "Modelo mais vendido"},
        {info: "Air Max Plus OG ", descricao: "Produto mais vendido"},
        {info: "10567 ", descricao: "Produtos em estoque"},
    ]

    return(
        <>
            <PageLayout>
                <TitleBox title="Dashboard Geral"></TitleBox>
                <Kpis kpis={kpis}></Kpis>
                
            </PageLayout>
        </>
    )

}

export default DashboardGeral