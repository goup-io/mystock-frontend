//Componentes
import Header from '../header/Header.js'
import PageLayout from './PageLayout.js'

//Paginas
import { useNavigate } from 'react-router-dom';


//Bibliotecas
import React, { Component, useEffect, useState } from "react";

function Menu(){

    const navigate = useNavigate();

    function MenuItems(){

        return(
            <>
                <Header telaAtual="Menu" icon="crossed"></Header>
                <ul class="flex flex-col items-center gap-7 mt-20 px-12">
                    <ItemLista route={"/venda"}>ÁREA DE VENDA</ItemLista>
                    <ItemLista route={"/estoque"}>ESTOQUE</ItemLista>
                    <ItemLista route={"/historico"}>HISTÓRICO DE VENDAS</ItemLista>
                    <ItemLista route={"/transacao"}>ÁREA DE TRANSFERÊNCIAS</ItemLista>
                    <ItemLista route={"/"}>SAIR</ItemLista>
                </ul>
            </>
        )
    }
    
    function ItemLista(props){
        return(
            <li onClick={() => navigate(props.route)} class="bg-[#D0D4F0] cursor-pointer w-full h-[5rem] text-[1.5rem] items-center flex align-center justify-center font-[500] rounded-[0.3125rem] shadow-lg">
                {props.children}
            </li>
        )
    }

    return(
        <>
            <PageLayout telaAtual="menu">
                <MenuItems/>
            </PageLayout>
        </>
    )
}

export default Menu;