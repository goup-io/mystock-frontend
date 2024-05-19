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
    <div className="w-full flex items-center text-center ">
    <p className="form-floating text-[1rem] text-black font-normal">{props.children}:</p>
      <select value={selecionado} onChange={handleChange} className="w-[6rem] h-[1.2rem] rounded bg-[F5F3F4] pl-2 ml-2 text-[0.7rem] font-[300] text-[#555] form-control border border-1 border-slate-600">
        <option value="">Selecione...</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
}

export default ComboBoxFilter;