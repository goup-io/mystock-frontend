//Componentes
import MenuIcon from '../buttons/buttonMenu.js' 

//Bibliotecas
import { useEffect, useState } from 'react';
import Cookie from '../../connections/Cookie.js'

var estiloEmBranco = {
    backgroundColor : "#fff",
    borderRadius : "5px",
    boxShadow: "1px 4px 4px 0px rgba(0, 0, 0, 0.25)",
}

function Header(props){

    const [tempo, definirTempo] = useState(new Date())
    const [loja, definirLoja] = useState("")

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
        });

    function tick() {
        definirTempo(new Date());
    }

    if(props.icon != "crossed"){
        var divEmBranco = {
            backgroundColor : "#fff",
            borderRadius : "5px",
            boxShadow: "1px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }

        var textBranco = {
            color : "#000",
        }
    }

    // definirLoja(Cookie.getCookie("loja"))

    return(
        <div class="flex flex-row justify-between px-8 h-[4rem] pt-1 items-center mb-4" style={divEmBranco}>
            <div class="flex flex-row w-2/4 items-center gap-4">
                <MenuIcon icon={props.icon}></MenuIcon>
                <p class="text-white text-[1.875rem] font-semibold" style={textBranco}>{props.telaAtual}</p>
            </div>
            <ul class="flex flex-row justify-between gap-6 font-semibold">
                <li class="text-white text-[1.25rem]" style={textBranco}>Filial: {loja != "" ? loja : "XX"}</li>
                <li class="text-white text-[1.25rem]" style={textBranco}>{tempo.toLocaleDateString()}</li>
                <li class="text-white text-[1.25rem]" style={textBranco}>{tempo.toLocaleTimeString()} - GMT</li>
            </ul>
        </div>
    )
}


export default Header;