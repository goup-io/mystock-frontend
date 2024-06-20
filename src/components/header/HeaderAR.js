// Bibliotecas
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import iconLogout from '../../assets/icons/i_logout.svg';
import ApiRequest from '../../connections/ApiRequest';

function HeaderAR() {
    const navigate = useNavigate();
    const [tempo, definirTempo] = useState(new Date());
    const [options, setOptions] = useState([]);
    const [selectedLoja, setSelectedLoja] = useState(localStorage.getItem('visao_loja'));
    const isAdmin = localStorage.getItem('cargo') === 'ADMIN';

    async function logout() {
        const respostaHTTP = await ApiRequest.userLogout();
        if (respostaHTTP.status === 200) {
            localStorage.clear();
            navigate("/");
        }
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    function tick() {
        definirTempo(new Date());
    }

    async function fetchData() {
        try {
            let response;
            if (isAdmin) {
                response = await ApiRequest.lojaGetAll();
            } else {
                const lojaId = localStorage.getItem('loja_id');
                response = await ApiRequest.lojaGet(lojaId);
            }

            if (response.status === 200) {
                setOptions(isAdmin ? response.data : [response.data]);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const irParaDashLoja = (loja) => {
        localStorage.setItem('visao_loja', loja);
        setSelectedLoja(loja);
        navigate("/dashboard-loja");
    };

    const handleChange = (event) => {
        const lojaId = event.target.value;
        if (isAdmin) {
            if (lojaId === '0') {
                localStorage.setItem('visao_loja', '0');
                setSelectedLoja('0');
                navigate("/dashboard-geral");
            } else {
                irParaDashLoja(lojaId);
            }
        }
    };

    return (
        <div className="flex flex-row justify-between items-center text-base text-[#FFFFFF] bg-[#355070] p-2 px-8">
            <h3>Gerenciamento - {isAdmin ? "Administrador" : "Gerente"}</h3>
            <select className="bg-inherit outline-none cursor-pointer" value={selectedLoja} onChange={handleChange}>
                {isAdmin && <option value="0">Visão geral</option>}
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.nome}
                    </option>
                ))}
            </select>
            <div className="flex items-center gap-6">
                <ul className="flex flex-row justify-between gap-6">
                    <li>{tempo.toLocaleDateString()}</li>
                    <li>{tempo.toLocaleTimeString()} - GMT -03:00</li>
                </ul>
                <img src={iconLogout} onClick={logout} alt="Sair do sistema" className="cursor-pointer h-7" />
            </div>
        </div>
    );
}

export default HeaderAR;
