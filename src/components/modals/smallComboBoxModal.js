import React, { useState, useEffect } from 'react';

function ComboBoxModal(props) {
  const [opcoes, setOpcoes] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  useEffect(() => {
    // Verifique se dadosBanco é uma string ou uma matriz
    // Se for uma string, transforme em uma matriz
    const opcoesDoBanco = Array.isArray(props.dadosBanco) ? props.dadosBanco : [props.dadosBanco];
    setOpcoes(opcoesDoBanco);
  }, [props.dadosBanco]);

  const handleChange = (event) => {
    setSelecionado(event.target.value);
  };

  return (
    <div className="flex flex-col justify-start items-start">
      <p className="form-floating text-sm text-black mb-2 font-normal">{props.children}:</p>
      <select value={selecionado} onChange={handleChange} className="w-56 h-7 rounded bg-[F5F3F4] pl-2 text-[0.8rem] font-[300] text-[#555] form-control border border-1 border-slate-600">
        <option value="">Selecione...</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
}

export default ComboBoxModal;
