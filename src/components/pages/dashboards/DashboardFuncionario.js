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
import { useParams, useLocation } from 'react-router-dom'

function DashboardGeral() {

    const { idFuncionario } = useParams();
    const location = useLocation();
    const { state } = location;
    const userId = state ? state.idFuncionario : null;

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

    const [categoriesItensVendidos, setCategoriesItensVendidos] = useState([]);
    const [seriesItensVendidos, setSeriesItensVendidos] = useState([]);
    const [categoriesItensVendidosMesAtual, setCategoriesItensVendidosMesAtual] = useState([]);
    const [seriesItensVendidosMesAtual, setSeriesItensVendidosMesAtual] = useState([]);

    const [categoriesExibido, setCategoriesExibido] = useState([]);
    const [seriesExibido, setSeriesExibido] = useState([]);

    const [dadosFunc, setDadosFunc] = useState([]);

    const [dadosGraficoModelosMaisVendidos, setDadosGraficoModelosMaisVendidos] = useState({ series: [], labels: [] });

    const funcionario = "Funcionario"

    useEffect(() => {
        fetchDados();
        console.log(categoriesExibido)
        console.log(categoriesItensVendidosMesAtual)
        console.log(seriesItensVendidosMesAtual)
    }, []);

    async function fetchDados() {
        try {
            const responseKpi = await ApiRequest.kpisGetAllDashFunc(idFuncionario);
            if (responseKpi.status === 200) {
                setDadosKpi(responseKpi.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de KPI", error);
        }

        // try {
        //     const response = await ApiRequest.userGetById(idFuncionario);
        //     if (response.status === 200) {
        //         console.log("pintoooooooooooo" + response.data);
        //         setDadosFunc(response.data);
        //     }
        // } catch (error) {
        //     console.log("Erro ao buscar os dados do funcionario", error);
        // }

        try {
            const responseFaturamento = await ApiRequest.faturamentoPorLojaDashFunc(idFuncionario);
            if (responseFaturamento.status === 200) {
                setDadosGraficoFaturamento(transformaDadosFaturamento(responseFaturamento.data));
           
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de faturamento", error);
        }

        try {
            const responseFaturamentoMesAtual = await ApiRequest.faturamentoPorLojamesAtualDashFunc(idFuncionario);
           
            if (responseFaturamentoMesAtual.status === 200) {
                setDadosGraficoFaturamentoMesAtual(transformaDadosFaturamentoMesAtual(responseFaturamentoMesAtual.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de faturamento do mês atual", error);
        }

        try {
            const responseModelosMaisVendidos = await ApiRequest.GraficomodelosMaisVendidosDashFunc(idFuncionario);
            if (responseModelosMaisVendidos.status === 200) {
                setDadosGraficoModelosMaisVendidos(transformaDadosModelosMaisVendidos(responseModelosMaisVendidos.data));
            }
        } catch (error) {
            console.log("Erro ao buscar os dados de modelos mais vendidos", error);
        }

        try {
            const responseItensVendidos = await ApiRequest.GraficoItensVendidosDashFunc(idFuncionario);
            if (responseItensVendidos.status === 200) {
                const dadosTransformados = transformaDadosItensVendidos(responseItensVendidos.data);
                setCategoriesItensVendidos(dadosTransformados.categories);
                setSeriesItensVendidos(dadosTransformados.series);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados itens vendidos", error);
        }

        try {
            const responseItensVendidosMesAtual = await ApiRequest.GraficoItensVendidosMesAtualDashFunc(idFuncionario);
          
            if (responseItensVendidosMesAtual.status === 200) {

                const dadosTransformados = transformaDadosItensVendidosMesAtual(responseItensVendidosMesAtual.data);
                console.log("aaaaaaaaaaa" + dadosTransformados);
                setCategoriesItensVendidosMesAtual(dadosTransformados.categories);
                setSeriesItensVendidosMesAtual(dadosTransformados.series);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados itens vendidos  mes atual", error);
        }

    
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
        
        // Remove o último elemento que é null
        dados.pop();
        
        return [{
            // Assumindo que os dados representam o faturamento diário para cada dia do mês
            // Se necessário, ajuste o nome da propriedade 'name' conforme a necessidade
            name: 'Faturamento Diário', // Nome da série
            data: dados // Valores de faturamento para os dias do mês
        }];
    }
    

    function transformaDadosModelosMaisVendidos(dados) {
        if (!dados || !Array.isArray(dados)) return { series: [], labels: [] };
        const series = dados.map(item => item.valorVendido);
        const labels = dados.map(item => item.modelo.nome);

        return { series, labels };
    }

    function transformaDadosItensVendidos(dados) {
        if (!dados || !Array.isArray(dados) || dados.length === 0) return { categories: [], series: [] };
        const currentMonth = new Date().getMonth();
        const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let categories = [];

        for (let i = 0; i < 12; i++) {
            const index = (currentMonth + 12 - i) % 12;
            categories.push(monthLabels[index]);
        }
        categories.reverse();
            const series = [
                { name: 'qtdTotalItensVendidos', data: dados.map(item => item.qtdTotalItensVendidos) },
                { name: 'qtdTotalItensPromocao', data: dados.map(item => item.qtdTotalItensPromocao) }
            ];
            return { categories, series };
        
    }
    

    function transformaDadosItensVendidosMesAtual(dados) {
        const categories = ['Mês Atual']; // Defina a categoria conforme necessário
        const series = [
            { name: 'qtdTotalItensVendidos', data: [dados.qtdTotalItensVendidos] },
            { name: 'qtdTotalItensPromocao', data: [dados.qtdTotalItensPromocao] }
        ];
    
        return { categories, series };
    }

    const kpis = [
        { info: `R$ ${dadosKpi.faturamentoMes.toFixed(2)}`, descricao: "Faturamento do mês vigente" },
        { info: `R$ ${dadosKpi.faturamentoDia.toFixed(2)}`, descricao: "Faturamento do dia vigente" },
        { info: dadosKpi.qtdVendasRealizadas, descricao: "Quantidade de vendas realizadas" },
        { info: dadosKpi.qtdProdutosVendidos, descricao: "Quantidade de produtos vendidos" },
        { info: dadosKpi.produtoMaisVendido, descricao: "Produto mais vendido" }
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
    const seriesGraficoFaturamento = mostrarFaturamentoMesAtual ? dadosGraficoFaturamentoMesAtual : dadosGraficoFaturamento;

    
    const handleSelectOpcao1 = () => {
        setMostrarFaturamentoMesAtual(false);
    };

    const handleSelectOpcao2 = () => {
        setMostrarFaturamentoMesAtual(true);
    };



    const handleSelectOpcao3 = () => {
        setCategoriesExibido(categoriesItensVendidos)
        setSeriesExibido(seriesItensVendidos)
    };

    const handleSelectOpcao4 = () => {
        setCategoriesExibido(categoriesItensVendidosMesAtual)
        setSeriesExibido(seriesItensVendidosMesAtual)
    };
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
                            onSelectOpcao1={handleSelectOpcao3} 
                            onSelectOpcao2={handleSelectOpcao4}
                        />
                    </div>
                    <BarChart categories={categoriesExibido} series={seriesExibido}></BarChart>
                    <ButtonInfo mensagem={"O gráfico mostra a quantidade de vendas pelo funcionário no determinado período, ou seja, o quanto itens ele vendeu em cada um dos meses exibidos."}></ButtonInfo>
                </ChartBox>
            </PageLayout>
        </>
    )

}

export default DashboardGeral