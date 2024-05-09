import React, { useState, useEffect } from 'react';

function ComboBoxModal(props) {
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    // Verifique se dadosBanco é uma string ou uma matriz
    // Se for uma string, transforme em uma matriz
    const opcoesDoBanco = Array.isArray(props.dadosBanco) ? props.dadosBanco : [props.dadosBanco];
    setOpcoes(opcoesDoBanco);
  }, [props.dadosBanco]);

  return (
    <div className="flex flex-col justify-start items-start">
      <p className="form-floating text-lg text-black mb-2 font-normal">{props.children}:</p>
      <select onChange={props.handleChange} disabled={props.disabled} className="w-[16rem] h-7 rounded bg-[F5F3F4] pl-2 text-[1rem] font-[300] text-[#555] form-control border border-1 border-slate-600">
        <option value={props.value ? props.value : ""}>{props.value ? props.value : "Selecione..."}</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
    </div>
  );
}

export default ComboBoxModal;
