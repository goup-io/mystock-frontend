import myStockLogo from '../../assets/icons/logoMyStock-v2.png'
import GoUpLogo from '../../assets/icons/logoGoUp.png'
import iconDash from '../../assets/icons/i-dashboard.svg'
import iconUsers from '../../assets/icons/i_users.svg'
import iconEstoque from '../../assets/icons/i-boxes.svg'
import iconVenda from '../../assets/icons/i_product-list.svg'
import iconRelatorio from '../../assets/icons/i_document-sign.svg'
import iconTransacoes from '../../assets/icons/i-transacoes.svg'
import iconAlerta from '../../assets/icons/i-alert.svg'

//Paginas
import { useNavigate, useLocation } from 'react-router-dom';

//Bibliotecas
import React, { Component, useEffect, useState } from "react";

function MenuLateral(){
    const navigate = useNavigate();
    const location = useLocation();

    function MenuItems(){

        var routeDash =  localStorage.getItem('visao_loja') == 0 ? "/dashboard-geral" : "/dashboard-loja"

        return(
            <>
                <ul className="flex flex-col gap-4 text-[#CFD0D9]">
                    <ItemLista route={routeDash} icon={iconDash} rotaAtual={location.pathname}>Dashboard</ItemLista>
                    <ItemLista route={"/usuarios"} icon={iconUsers} rotaAtual={location.pathname}>Usuários</ItemLista>
                    <ItemLista route={"/estoque-gerente"} icon={iconEstoque} rotaAtual={location.pathname}>Estoque</ItemLista>
                    <ItemLista route={"/historico-vendas-gerente"} icon={iconVenda} rotaAtual={location.pathname}>Vendas</ItemLista>
                    <ItemLista route={"/relatorios"} icon={iconRelatorio} rotaAtual={location.pathname}>Relatórios</ItemLista>
                    <ItemLista route={"/transacao-gerente"} icon={iconTransacoes} rotaAtual={location.pathname}>Transações</ItemLista>
                    <ItemLista route={"/avisos"} icon={iconAlerta} rotaAtual={location.pathname}>Avisos</ItemLista>
                </ul>                    
            </>
        )
    }

    function ItemLista(props){
        const itemStyle = {
            fontWeight: props.route === props.rotaAtual ? 600 : "normal",
            color: props.route === props.rotaAtual ? "#FFFFFF" : "", 
        };

        const iconStyle = {
            filter: props.route === props.rotaAtual ? "invert(100%) brightness(100)" : "", 
        };

        return(
            <li onClick={() => navigate(props.route)} className="cursor-pointer text-base flex items-center gap-2 mr-5 transition duration-300 ease-in-out hover:text-[#FFFFFF] hover:font-semibold filter hover:invert hover:brightness-0" style={itemStyle}>
                <img src={props.icon} style={iconStyle} alt="Ícone"/>
                {props.children}
            </li>
        )
    } 

    return(
        <>
            <div className="flex flex-col items-center justify-between p-5 bg-[#355070] m-0">
                <img className="w-28" src={myStockLogo}/>
                {MenuItems()}
                <footer className="flex flex-col items-center">
                    <img src={GoUpLogo}/>
                    <span className="text-slate-300 font-semibold">2024</span>
                </footer>
            </div>
        </>
    )
}

export default MenuLateral