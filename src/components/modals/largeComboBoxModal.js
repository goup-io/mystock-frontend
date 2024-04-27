import React, { useState, useEffect } from 'react';

function LargeComboBoxModal(props) {
  const [opcoes, setOpcoes] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  useEffect(() => {
    // Aqui você faria a requisição para o banco de dados para obter as opções
    // Substitua este trecho pelo código que obtém as opções do seu banco de dados
    const opcoesDoBanco = [props.dadosBanco];
    setOpcoes(opcoesDoBanco);
  }, []);

  const handleChange = (event) => {
    setSelecionado(event.target.value);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full">
    <p class="form-floating text-sm text-black mb-2 font-normal">{props.children}:</p>
      <select value={selecionado} onChange={handleChange} className="w-full h-7 rounded bg-[F5F3F4] pl-2 text-[0.8rem] font-[300] text-[#555] form-control border border-1 border-slate-600">
        <option value="">Selecione...</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
}

export default LargeComboBoxModal;
