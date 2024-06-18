import './relatorio.css'
import CircleItemList from '../../assets/icons/Ellipse 27.svg'
import MyStockLogo from '../../assets/icons/logoMyStock.svg'


function Barra(){
    return(
        <div className="barraSubTitulo">
        </div>
    )
}

function Modulo(props){
    return(
        <section>
            <h1>{props.titulo}</h1>
            <div>
                {props.children}
            </div>
            <br></br>
        </section>
    )
}

function relatorioGeral(){
    return(
        <>  
            {/* <img src={MyStockLogo}></img> */}
            <Modulo titulo={"Resumo"}>
                <h4>Últimos 7 dias:</h4>
                <div className="barraSubTitulo"/>
                <div>
                    <div>
                        <p>Entrada (valor recebido)</p>
                        <p>R$ 100,00</p>
                    </div>
                    <div>
                        <p>Saída (valor gasto)</p>
                        <p>R$ 100,00</p>
                    </div>
                    <div>
                        <p>Lucro</p>
                        <p>R$ 100,00</p>
                    </div>
                    <div>
                        <p>Variação de lucro</p>
                        <p>R$ 100,00</p>
                    </div>
                </div>
            </Modulo>
            <Modulo titulo={"Vendas"}>
                <h4>Mais vendidos em:</h4>
                <Barra/>
                <div>
                    <h6>Últimos 7 dias</h6>
                    grafico
                </div>
            </Modulo>
            <Modulo titulo={"Funcionários"}>
                <h4>Ranking de vendas - Últimos 30 dias</h4>
                <Barra/>
                <table>
                    <tr>
                        <th>Colocação</th>
                        <th>Nome</th>
                        <th>Qntd. de Vendas</th>
                        <th>Qntd. de Vendida (em reais)</th>
                        <th>Qntd. de promoções vendidas</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
                </table>
            </Modulo>
            <Modulo titulo={"Estoque"}>
                <Barra/>
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Qntd. no estoque</th>
                        <th>Tempo Estimado para acabar</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                </table>
            </Modulo>
        </>
    )
}

export default relatorioGeral;