//Bibliotecas
import { useEffect, useState } from 'react';

//icons
import iconLogout from '../../assets/icons/i_logout.svg'

function HeaderAR(){

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

    return(
        <div class="flex flex-row justify-between items-center text-base text-[#FFFFFF] bg-[#355070] p-2 px-8">
            <h3>Gerenciamento - Administrador</h3>
            <select class="bg-inherit outline-none cursor-pointer ">
                <option value="opcao1">Visão Geral</option>
                <option value="opcao2">Opção 2</option>
            </select>
            <div class="flex items-center gap-6">
                <ul class="flex flex-row justify-between gap-6">
                    <li>{tempo.toLocaleDateString()}</li>
                    <li>{tempo.toLocaleTimeString()} - GMT</li>
                </ul>
                <img src={iconLogout} class="cursor-pointer h-7" />
            </div>
        </div>
    )
}


export default HeaderAR;