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
    
    var [corAtual, setCorAtual] = useState(corMenu)

    useEffect(() => {

        if(paginaAtual == "menu"){
            setCorAtual(corMenu)
        
        }else{
            console.log('Passou no corbranco');
            setCorAtual(corBranco)
        }
    }, [paginaAtual])

    var corMenu = {
        backgroundColor : "#355070",
        boxShadow: "1px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    }

    var corBranco = {
        backgroundColor : "#fff",
    }
    
    function Pagina(props){

        if(props.pagina == "menu"){
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
                <Header telaAtual="Menu" icon="crossed"></Header>
                <ul class="flex flex-col items-center gap-7 mt-20 px-12">
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

            <div id="mainDiv" class="w-[89%] h-4/5 overflow-auto rounded-[8px]" style={corAtual}>
                <Pagina pagina={paginaAtual}></Pagina>
            </div>
            
            <Footer></Footer>
        </section>
    )
}

export default Menu;