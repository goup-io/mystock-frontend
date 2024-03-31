import menuIcon from '../../assets/icons/menuIcon.png'
import menuIconCrossed from '../../assets/icons/menuIconCrossed.png'
import { useEffect, useState } from 'react';


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

    const icone = props.telaAtual === "Menu" ? menuIconCrossed : menuIcon;

    return(
        <div class="flex flex-row justify-between">
            <div class="flex flex-row w-2/4 items-center gap-4">
                <img class="w-[38px] h-[39px] cursor-pointer" src={icone}></img>
                <p class="text-white text-[1.875rem]">{props.telaAtual}</p>
            </div>
            <ul class="flex flex-row justify-between gap-6">
                <li class="text-white text-[1.25rem]">Filial: XX</li>
                <li class="text-white text-[1.25rem]">{tempo.toLocaleDateString()}</li>
                <li class="text-white text-[1.25rem]">{tempo.toLocaleTimeString()} - GMT</li>
            </ul>
        </div>
    )
}


export default Header;