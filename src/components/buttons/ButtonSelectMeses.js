import React, { useState } from 'react';

const ButtonSelectMeses = () => {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesAtual = new Date().getMonth();
    const [mesSelecionado, setMesSelecionado] = useState(meses[mesAtual]);

    const anoAtual = new Date().getFullYear();

    const handleSelectMes = (event) => {
        setMesSelecionado(event.target.value);
    };

    return (
        <div class="absolute top-0 right-3">
            <select value={mesSelecionado} onChange={handleSelectMes} className="bg-inherit font-medium border-b-2 border-[#355070] px-4 py-1 pl-1 leading-tight focus:outline-none focus:bg-inherit focus:border-gray-500">
                {meses.map((mes, index) => (
                    <option key={index} value={mes}>
                        {mes} 
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ButtonSelectMeses;
