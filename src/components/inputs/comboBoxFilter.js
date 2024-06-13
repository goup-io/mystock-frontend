import React, { useState } from 'react';

function ComboBoxFilter(props) {
  const [selecionado, setSelecionado] = useState('0');


  const handleChange = (event) => {
    setSelecionado(event.target.value);
  };

  return (
    <div className="w-full flex items-center text-center ">
    <p className="form-floating text-[1rem] text-black font-normal">{props.children}:</p>
      <select value={selecionado} onChange={handleChange} className="w-[6rem] h-[1.2rem] rounded bg-[F5F3F4] pl-2 ml-2 text-[0.7rem] font-[300] text-[#555] form-control border border-1 border-slate-600" name={props.name}>
        <option value="0" disabled>Selecione...</option>
        {(props.opcoes || []).map((opcao, index) => (
          <option key={index} value={opcao.id}>{opcao.nome}</option>
        ))}
      </select>
    </div>
  );
}

export default ComboBoxFilter;