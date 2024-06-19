import React from 'react';

function InputFilterDate(props) {
  const clearFilter = () => {
    props.handleInputInicio({ target: { value: '' } });
    props.handleInputFim({ target: { value: '' } });
  };

  return (
    <div className="w-full flex justify-between items-center text-center">
      <p className="w-[4.5rem] form-floating text-[1rem] text-black font-normal">{props.inicio}:</p>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.valueInicio}
        onChange={props.handleInputInicio}
        className="w-[5rem] h-[1.2rem] rounded bg-[F5F3F4] ml-2 text-center text-[0.7rem] font-[400] text-[#555] border border-gray-700"
        name={`${props.name}_inicio`}
      />
      <p className="form-floating text-[1rem] text-black font-normal ml-2">{props.fim}:</p>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.valueFim}
        onChange={props.handleInputFim}
        className="w-[5rem] h-[1.2rem] rounded bg-[F5F3F4] ml-2 text-center text-[0.7rem] font-[400] text-[#555] border border-gray-700"
        name={`${props.name}_fim`}
      />
      <button onClick={clearFilter} className="ml-2 w-5 h-5 bg-red-600 text-white text-base flex justify-center items-center rounded">
        X
      </button>
    </div>
  );
}

export default InputFilterDate;