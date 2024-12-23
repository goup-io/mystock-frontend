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

        definirLoja(localStorage.getItem("loja_name"))

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
        <div className="flex flex-row justify-between px-8 h-[3rem] pt-1 items-center mb-4" style={divEmBranco}>
            <div className="flex flex-row w-2/4 items-center gap-4">
                <MenuIcon icon={props.icon} tipo={props.tipo}></MenuIcon>
                <p className="text-white text-[1.5rem] font-semibold" style={textBranco}>{props.telaAtual}</p>
            </div>
            <ul className="flex flex-row justify-between gap-6 font-semibold">
                <li className="text-white text-[1.25rem]" style={textBranco}>Filial: {loja != "" ? loja : "XX"}</li>
                <li className="text-white text-[1.25rem]" style={textBranco}>{tempo.toLocaleDateString()}</li>
                <li className="text-white text-[1.25rem]" style={textBranco}>{tempo.toLocaleTimeString()} - GMT</li>
            </ul>
        </div>
    )
}


export default Header;