import './relatorio.css'
import CircleItemList from '../../assets/icons/Ellipse 27.svg'
import MyStockLogo from '../../assets/icons/logoMyStock.svg'
import React, { useEffect } from 'react';

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

function RelatorioGeral(){

    var listaFuncionarios = [];
    var listaEstoque = [];
    var listaMaisVendidos = [];

    var entrada = 0;
    var saida = 0;
    var lucroOperacional = 0;
    var porcentagemLucro = 0;

    var qtdEstoqueAtual = 0;
    var qtdProdutosVendidos = 0;
    var qtdProdutosTransferidos = 0;

    listarFuncionarios();
    listarEstoque();
    listarEntrada();
    listarModelosMaisVendidos();
    listarEstoqueResumo();

    function listarFuncionarios(){

        listaFuncionarios = [];

        var funcionario01 = {
            "colocacao": 1,
            "nome": "Cleyton", 
            "qtdVendas": 520,
            "qtdVendido": 420,
            "qtdPromocoes": 20,
        }

        var funcionario02 = {
            "colocacao": 2,
            "nome": "Cleyton", 
            "qtdVendas": 200,
            "qtdVendido": 5000,
            "qtdPromocoes": 300,
        }

        var funcionario03 = {
            "colocacao": 3,
            "nome": "Inácio Figueiredo Oliveira", 
            "qtdVendas": 2400,
            "qtdVendido": 5000,
            "qtdPromocoes": 300,
        }

        var funcionario04 = {
            "colocacao": 4,
            "nome": "Jorge", 
            "qtdVendas": 200,
            "qtdVendido": 5210,
            "qtdPromocoes": 4720,
        }

        listaFuncionarios.push(funcionario01);
        listaFuncionarios.push(funcionario02);
        listaFuncionarios.push(funcionario03);
        listaFuncionarios.push(funcionario04);
    }

    function listarEstoque(){

        listaEstoque = [];

        var estoque01 = {
            "nome": "Sandália", 
            "qtdEstoque": 520,
            "lojaNome": "Filial 01",         
        }

        var estoque02 = {
            "nome": "AirJordan", 
            "qtdEstoque": 200,
            "lojaNome": "Filial 02",      
        }

        var estoque03 = {
            "nome": "Papete", 
            "qtdEstoque": 2400,
            "lojaNome": "Filial 01",      
        }

        var estoque04 = {
            "nome": "Jorge", 
            "qtdEstoque": 200,
            "lojaNome": "Filial 04",      
        }

        listaEstoque.push(estoque01);
        listaEstoque.push(estoque02);
        listaEstoque.push(estoque03);
        listaEstoque.push(estoque04);
    }

    function listarEntrada(){
       
        entrada = 1242;
        saida = 125234;
        lucroOperacional = 6212;
        porcentagemLucro = 23;
    }

    function listarModelosMaisVendidos(){
        
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

    function listarEstoqueResumo(){
        qtdEstoqueAtual = 4124;
        qtdProdutosVendidos = 124124;
        qtdProdutosTransferidos = 1231;
    }

    return (
        <>
            {/* <img src={MyStockLogo}></img> */}
            <Modulo titulo={"Resumo"}>
                <h4>Últimos 7 dias:</h4>
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
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.qtdVendas}</td>
                            <td>{funcionario.qtdPromocoes}</td>
                            <td>R$ {funcionario.qtdVendido.toFixed(2)}</td>
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
                <h6>Produtos:</h6>
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Qntd. no estoque</th>
                        <th>Nome da Loja</th>
                    </tr>
                    {listaEstoque.map((estoque, index) => (
                        <tr key={index}>
                            <td>{estoque.nome}</td>
                            <td>{estoque.qtdEstoque}</td>
                            <td>{estoque.lojaNome}</td>
                        </tr>
                    ))}
                </table>
            </Modulo>
        </>
    );
}

export default RelatorioGeral;