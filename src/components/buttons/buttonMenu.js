import menuIcon from '../../assets/icons/menuIcon.svg'
import menuIconCrossed from '../../assets/icons/menuIconCrossed.svg'

import Menu from '../pages/Menu'

import React from 'react';
import ReactDOM from 'react-dom/client';


function buttonMenu(props){

    var icon = props.icon == "crossed" ? menuIconCrossed : menuIcon

    return(
        <a onClick={() => {irParaMenu()}} class="cursor-pointer">
            <img src={icon}></img>
        </a>
    )
}

function irParaMenu(){
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <Menu />
        </React.StrictMode>
    );
}

export default buttonMenu;