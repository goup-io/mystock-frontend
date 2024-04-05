//Componentes
import Header from '../header/Header.js'
import myStockLogo from '../../assets/icons/logoMyStock.svg'
import Notification from '../buttons/buttonNotification.js'
import Footer from '../footer/Footer.js'

//Paginas
import Estoque from './Estoque.js'
import Historico from './Historico.js'
import Transacoes from './Transacoes.js'
import Venda from './Venda.js'

//Bibliotecas
import React, { Component, useEffect, useState } from "react";

function Menu(){

    var [paginaAtual, setProximaPagina] = useState('menu')

    function Pagina(props){

        if(props.pagina == "menu"){
            console.log("Cheguei aqui");
            return <MenuItems></MenuItems>
        
        }else if(props.pagina == "estoque"){
            return <Estoque></Estoque>
        
        }else if(props.pagina == "transacao"){
            return <Transacoes></Transacoes>
        
        }else if(props.pagina == "venda"){
            return <Venda></Venda>
        
        }else if(props.pagina == "historico"){
            return <Historico></Historico>
        }
    }

    function MenuItems(){

        return(
            <>
                <Header telaAtual="menu"></Header>
                <ul class="flex flex-col items-center gap-7 mt-20">
                    <ItemLista pagina={"venda"}>ÁREA DE PRÉ-VENDA</ItemLista>
                    <ItemLista pagina={"estoque"}>ESTOQUE</ItemLista>
                    <ItemLista pagina={"historico"}>HISTÓRICO DE VENDAS</ItemLista>
                    <ItemLista pagina={"transacao"}>ÁREA DE TRANSAÇÕES</ItemLista>
                </ul>
            </>
        )
    }
    
    function ItemLista(props){
        return(
            <li onClick={() => setProximaPagina(props.pagina)} class="bg-[#D0D4F0] cursor-pointer w-full h-[5rem] text-[1.5rem] items-center flex align-center justify-center font-[500] rounded-[0.3125rem] shadow-lg">
                {props.children}
            </li>
        )
    }
    
    return(
        <section class="flex flex-col items-center h-[100vh] w-full justify-center">
            <div class="flex flex-row w-full justify-between px-8 pl-[5%]">
                <img src={myStockLogo}></img>
                <Notification></Notification>
            </div>

            <div id="mainDiv" class="w-[89%] h-4/5 bg-[#355070] shadow px-12 pt-2 overflow-auto ">
                <Pagina pagina={paginaAtual}></Pagina>
            </div>
            <Footer></Footer>
        </section>
    )
}

export default Menu;