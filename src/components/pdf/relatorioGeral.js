import './relatorio.css'
import CircleItemList from '../../assets/icons/Ellipse 27.svg'
// import MyStockLogo from '../../../assets/icons/logoMyStock.svg'
import React, { useEffect, useState } from 'react';
import ApiRequest from '../../connections/ApiRequest';


function Barra() {
    return (
        <div className="barraSubTitulo">
        </div>
    )
}

function Modulo(props) {
    return (
        <section>
            <h1>-{props.titulo}:</h1>
            <div>
                {props.children}
            </div>
            <br></br>
        </section>
    )
}

function RelatorioGeral(props) {

    var listaFuncionarios = props.listaFuncionarios;
    var listaEstoque = props.listaEstoque;
    var listaMaisVendidos = props.listaMaisVendidos;

    var entrada = props.entrada;
    var saida = props.saida;
    var lucroOperacional = props.lucro;
    var porcentagemLucro = props.variacaoLucro;

    var qtdEstoqueAtual = props.qtdEstoqueAtual;
    var qtdProdutosVendidos = props.qtdProdutosVendidos;
    var qtdProdutosTransferidos = props.qtdProdutosTransferidos;

    var imgRelatorio = props.imgMyStock;

    console.log("Lista estoque: ", listaEstoque);
    console.log("Lista funcionarios: ", listaFuncionarios);


    return (
        listaEstoque &&
        <>
            {/* <img src={imgRelatorio} alt='Logo do MyStock'></img> */}
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
                            <td>{produto.modelo.codigo}</td>
                            <td>{produto.modelo.nome}</td>
                            <td>{produto.modelo.tipo.nome}</td>
                            <td>{produto.modelo.categoria.nome}</td>
                            <td>R$ {produto.valorVendido ? produto.valorVendido.toFixed(2) : 0}</td>
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
                            <td>{funcionario.qtdVendas ? funcionario.qtdVendas : 0}</td>
                            <td>R$ {funcionario.valorVendido.toFixed(2)}</td>
                            <td>{funcionario.qtdVendidasPromocao ? funcionario.qtdVendidasPromocao : 0}</td>
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
                    )
                    ) : <tr><td>Carregando...</td></tr>}
                </table>
            </Modulo>
        </>
    );
}

export default RelatorioGeral;