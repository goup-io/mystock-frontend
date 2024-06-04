import menuIcon from '../../assets/icons/menuIcon.svg'
import menuIconCrossed from '../../assets/icons/menuIconCrossed.svg'

import Menu from '../pages/Menu'

import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

function ButtonMenu(props) {

    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate(-1) // Esta função retorna para a tela anterior
    }

    var icon = props.icon === "crossed" ? menuIconCrossed : menuIcon
    var voltar = props.icon === "crossed" ? handleNavigateBack : ""

    return (

        props.tipo === "caixa" ?
            props.icon === "crossed" ?
                <>
                    <a onClick={handleNavigateBack} className="cursor-pointer">
                        <img src={icon}></img>
                    </a>
                </>
                :
                <>
                    <a onClick={() => navigate("/menuCaixa")} className="cursor-pointer">
                        <img src={icon}></img>
                    </a>
                </>
            :
            props.icon === "crossed" ?
                <>
                    <a onClick={handleNavigateBack} className="cursor-pointer">
                        <img src={icon}></img>
                    </a>
                </>
                :
                <>
                    <a onClick={() => navigate("/menuCaixa")} className="cursor-pointer">
                        <img src={icon}></img>
                    </a>
                </>
    )
}

export default ButtonMenu;