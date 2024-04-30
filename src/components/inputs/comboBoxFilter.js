import React, { useState, useEffect } from 'react';

function ComboBoxFilter(props) {
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
    <div className="w-full flex justify-evenly items-center text-center ">
    <p class="form-floating text-[1.2rem] text-black font-normal">{props.children}:</p>
      <select value={selecionado} onChange={handleChange} className="w-[8rem] h-6 rounded bg-[F5F3F4] pl-2 text-[1rem] font-[300] text-[#555] form-control border border-1 border-slate-600">
        <option value="">Selecione...</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
}

export default ComboBoxFilter;