import React, { useState } from 'react';

const ButtonTwoOption = ({ opcao1, opcao2, onSelectOpcao1, onSelectOpcao2 }) => {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(opcao1);

    const handleSelectOpcao1 = () => {
        if (opcaoSelecionada !== opcao1) {
            setOpcaoSelecionada(opcao1);
            onSelectOpcao1();
        }
    };

    const handleSelectOpcao2 = () => {
        if (opcaoSelecionada !== opcao2) {
            setOpcaoSelecionada(opcao2);
            onSelectOpcao2();
        }
    };

    return (
        <div className="flex gap-4 items-end">
            <button 
                className={`bg-inherit px-1 ${opcaoSelecionada === opcao1 ? 'font-medium border-b-2 border-[#355070]' : 'font-light '}`} 
                onClick={handleSelectOpcao1}>
                {opcao1}
            </button>
            <button 
                className={`bg-inherit px-1 ${opcaoSelecionada === opcao2 ? 'font-medium border-b-2 border-[#355070] ' : 'font-light '}`} 
                onClick={handleSelectOpcao2}>
                {opcao2}
            </button>
        </div>
    );
};

export default ButtonTwoOption;
