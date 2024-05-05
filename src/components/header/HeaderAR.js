//Bibliotecas
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//icons
import iconLogout from '../../assets/icons/i_logout.svg'
import ApiRequest from '../../connections/ApiRequest';

function HeaderAR() {
    const navigate = useNavigate();

    const [tempo, definirTempo] = useState(new Date())

    async function logout() {
        console.log("oi");
        const respostaHTTP = await ApiRequest.userLogout();
        if (respostaHTTP.status === 200) {
            localStorage.clear();
            navigate("/")
        }
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        definirTempo(new Date());
    }

    return (
        <div class="flex flex-row justify-between items-center text-base text-[#FFFFFF] bg-[#355070] p-2 px-8">
            <h3>Gerenciamento - Administrador</h3>
            <select class="bg-inherit outline-none cursor-pointer ">
                <option value="opcao1">Visão Geral</option>
                <option value="opcao2">Opção 2</option>
            </select>
            <div class="flex items-center gap-6">
                <ul class="flex flex-row justify-between gap-6">
                    <li>{tempo.toLocaleDateString()}</li>
                    <li>{tempo.toLocaleTimeString()} - GMT -03:00</li>
                </ul>
                <img src={iconLogout} onClick={logout} alt="Sair do sistema" class="cursor-pointer h-7" />
            </div>
        </div>
    )
}


export default HeaderAR;