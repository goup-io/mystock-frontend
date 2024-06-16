import React, { useState, useEffect } from 'react';

function LargeComboBoxModal(props) {
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    const opcoesDoBanco = Array.isArray(props.dadosBanco) ? props.dadosBanco : [props.dadosBanco];
    setOpcoes(opcoesDoBanco);
  }, [props.dadosBanco]);

  return (
    <div className="flex flex-col justify-start items-start w-full">
      <p className="form-floating text-lg text-black mb-2 font-normal">{props.children}:</p>
      <select 
        value={props.value} 
        onChange={props.handleChange} 
        disabled={props.disabled} 
        className="w-full h-7 rounded bg-[F5F3F4] pl-2 text-[0.8rem] font-[300] text-[#555] form-control border border-1 border-slate-600"
      >
        <option value="">Selecione...</option>
        {opcoes.map((opcao, index) => (
          <option key={index} value={opcao.id}>{opcao.nome}</option>
        ))}
      </select>
    </div>
  );
}

export default LargeComboBoxModal;
