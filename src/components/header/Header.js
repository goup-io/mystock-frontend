//Componentes
import MenuIcon from '../buttons/buttonMenu.js' 

//Bibliotecas
import { useEffect, useState } from 'react';

var estiloEmBranco = {
    backgroundColor : "#fff",
    borderRadius : "5px",
    boxShadow: "1px 4px 4px 0px rgba(0, 0, 0, 0.25)",
}

function Header(props){

    const [tempo, definirTempo] = useState(new Date())

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

    return(
        <div class="flex flex-row justify-between px-12 h-[4rem] pt-2 items-center " style={divEmBranco}>
            <div class="flex flex-row w-2/4 items-center gap-4">
                <MenuIcon icon={props.icon}></MenuIcon>
                <p class="text-white text-[1.875rem] font-semibold" style={textBranco}>{props.telaAtual}</p>
            </div>
            <ul class="flex flex-row justify-between gap-6">
                <li class="text-white text-[1.25rem]" style={textBranco}>Filial: XX</li>
                <li class="text-white text-[1.25rem]" style={textBranco}>{tempo.toLocaleDateString()}</li>
                <li class="text-white text-[1.25rem]" style={textBranco}>{tempo.toLocaleTimeString()} - GMT</li>
            </ul>
        </div>
    )
}


export default Header;