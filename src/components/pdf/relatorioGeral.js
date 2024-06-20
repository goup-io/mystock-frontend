import './relatorio.css'
import CircleItemList from '../../assets/icons/Ellipse 27.svg'
import MyStockLogo from '../../assets/icons/logoMyStock.svg'
import React, { useEffect } from 'react';
import ApiRequest from '../../connections/ApiRequest';


function Barra(){
    return(
        <div className="barraSubTitulo">
        </div>
    )
}

function Modulo(props){
    return(
        <section>
            <h1>-{props.titulo}:</h1>
            <div>
                {props.children}
            </div>
            <br></br>
        </section>
    )
}

function RelatorioGeral(props){

    var listaFuncionarios = [];
    var listaEstoque = [props.listaEstoque];
    console.log("Lista estoque: ", listaEstoque);
    var listaMaisVendidos = [];

    var entrada = 0;
    var saida = 0;
    var lucroOperacional = 0;
    var porcentagemLucro = 0;

    var qtdEstoqueAtual = 0;
    var qtdProdutosVendidos = 0;
    var qtdProdutosTransferidos = 0;

    useEffect(()=>{
        listarFuncionarios();
        // listarEstoque();
        listarEntrada();
        listarModelosMaisVendidos();
        listarEstoqueResumo();
    })

    async function listarFuncionarios(){

        listaFuncionarios = [];

        try{

            const response = await ApiRequest.relatorioRankingVendas(props.dias);
            if(response.status === 200){
                response.data.forEach(funcionario => {
                    listaFuncionarios.push(funcionario);
                })
            }
            

        }catch (error){
            console.log("Erro ao buscar os funcionarios");
        }

    }

    // async function listarEstoque(){
    //     listaEstoque = [];
    //     try{

    //         const response = await ApiRequest.relatorioProdutosAcabando(props.dias);

    //         if(response.status === 200){
    //             response.data.forEach(estoque => {
    //                 listaEstoque.push(estoque);
    //             })
    //         }

    //         alert("Deveria vir primeiro")

    //     }catch (error){
    //         console.log("Erro ao buscar a lista do estoque");
    //     }
    // }

    async function listarEntrada(){
       
        entrada = 1242;
        saida = 125234;
        lucroOperacional = 6212;
        porcentagemLucro = 23;
    }

    async function listarModelosMaisVendidos(){
        
        listaMaisVendidos = [];

        var produto01 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto02 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto03 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto04 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        var produto05 = {
            "codigo": 123,
            "nome": "Papete",
            "tipo": "Sapatilha",
            "categoria": "Tênis",
            "valorVendido": 84172,
        }
        
        listaMaisVendidos.push(produto01);
        listaMaisVendidos.push(produto02);
        listaMaisVendidos.push(produto03);
        listaMaisVendidos.push(produto04);
        listaMaisVendidos.push(produto05);
    }

    async function listarEstoqueResumo(){
        qtdEstoqueAtual = 4124;
        qtdProdutosVendidos = 124124;
        qtdProdutosTransferidos = 1231;
    }
    
    return (
        listaEstoque &&
        <>
            {/* <img src={MyStockLogo}></img> */}
            <Modulo titulo={"Resumo"}>
                <h4>Últimos {props.dias} dias:</h4>
                <div className="barraSubTitulo" />
                <table>
                    <tr>
                        <th>Entrada (valor recebido)</th>
                        <th>Saída (valor gasto)</th>
                        <th>Lucro</th>
                        <th>Variação de lucro</th>
                    </tr>
                    <tr>
                        <td>R$ {entrada.toFixed(2)}</td>
                        <td>R$ {saida.toFixed(2)}</td>
                        <td>R$ {lucroOperacional.toFixed(2)}</td>
                        <td>{porcentagemLucro.toFixed(2)}%</td>
                    </tr>
                </table>
            </Modulo>
            <Modulo titulo={"Vendas"}>
                <h4>Mais vendidos em:</h4>
                <Barra />
                <table>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Valor Vendido</th>
                    </tr>
                    {listaMaisVendidos.map((produto, index) => (
                    <tr key={index}>
                        <td>{produto.codigo}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.tipo}</td>
                        <td>{produto.categoria}</td>
                        <td>R$ {produto.valorVendido.toFixed(2)}</td>
                    </tr>
                ))}
                </table>
            </Modulo>
            <Modulo titulo={"Funcionários"}>
                <h4>Ranking de vendas - Últimos 30 dias</h4>
                <Barra />
                <table>
                    <tr>
                        <th>Colocação</th>
                        <th>Nome</th>
                        <th>Qntd. de Vendas</th>
                        <th>Qntd. de Vendida (em reais)</th>
                        <th>Qntd. de promoções vendidas</th>
                    </tr>
                    {listaFuncionarios.map((funcionario, index) => (
                        <tr key={index}>
                            <td>{funcionario.colocacao}</td>
                            <td>{funcionario.nomeFuncionario}</td>
                            <td>{funcionario.qtdVendidasPromocao}</td>
                            <td>{funcionario.qtdPromocoes}</td>
                            <td>R${funcionario.valorVendido.toFixed(2)}</td>
                        </tr>
                    ))}
                </table>
            </Modulo>
            <Modulo titulo={"Estoque"}>
                <h6>Fluxo de estoque:</h6>
                <table>
                    <tr>
                        <th>Qtnd. Estoque Atual</th>
                        <th>Qtnd. Produtos Vendidos</th>
                        <th>Qtnd. Produtos Transferidos</th>
                    </tr>
                    <tr>
                        <td>{qtdEstoqueAtual}</td>
                        <td>{qtdProdutosVendidos}</td>
                        <td>{qtdProdutosTransferidos}</td>
                    </tr>
                </table>
                <Barra />                
                <h6>Produtos acabando:</h6>
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Qntd. no estoque</th>
                        <th>Nome da Loja</th>
                    </tr>
            
                    {listaEstoque ? listaEstoque.map((estoque, index) => (
                        <tr key={index}>
                            <td>{estoque.nome}</td>
                            <td>{estoque.qtdEstoque}</td>
                            <td>{estoque.lojaNome}</td>
                        </tr>
                    )) : <tr><td>Carregando...</td></tr>}
                </table>
            </Modulo>
        </>
    );
}

export default RelatorioGeral;