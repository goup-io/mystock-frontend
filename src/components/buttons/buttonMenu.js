import menuIcon from '../../assets/icons/menuIcon.svg'
import menuIconCrossed from '../../assets/icons/menuIconCrossed.svg'

import Menu from '../pages/Menu'

import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

function ButtonMenu(props){

    const navigate = useNavigate();

    var icon = props.icon == "crossed" ? menuIconCrossed : menuIcon

    return(
        <a onClick={() => navigate("/menu")} class="cursor-pointer">
            <img src={icon}></img>
        </a>
    )
}

export default ButtonMenu;