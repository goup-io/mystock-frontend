import React, { useState, useEffect } from 'react';
import ButEdit from '../buttons/buttonEdit';

function TabelaModal({ colunas, dados, edit, remove, iptQuantidade, onQuantityChange }) {
  const getInitialValues = () => {
    const storedValues = localStorage.getItem('inputValues');
    if (storedValues) {
      return JSON.parse(storedValues);
    }
    return dados.map(() => 0);
  };

  const [inputValues, setInputValues] = useState(getInitialValues);

  useEffect(() => {
    localStorage.setItem('inputValues', JSON.stringify(inputValues));
    if (onQuantityChange) {
      onQuantityChange(inputValues.reduce((acc, value) => acc + value, 0));
    }
  }, [inputValues, onQuantityChange]);

  const handleAdicionar = (index) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValues[index] + 1;
      return newValues;
    });
  };

  const handleTirar = (index) => {
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      if (newValues[index] > 0) {
        newValues[index] = newValues[index] - 1;
      }
      return newValues;
    });
  };

  return (
    <table className='w-full h-full'>
      <thead className='text-xs text-white font-light'>
        <tr className='sticky top-0 bg-slate-600'>
          {colunas.map((coluna, index) => (
            <th key={index}>{coluna}</th>
          ))}
          {edit && <th>Editar</th>}
          {remove && <th>Remover</th>}
          {iptQuantidade && <th>Add</th>}
        </tr>
      </thead>
      <tbody className='text-xs'>
        {dados.map((linha, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
            {Object.values(linha).map((valor, i) => (
              <td key={i}>{valor}</td>
            ))}
            {edit && (
              <td className='flex justify-center items-center'>
                <div>
                  <ButEdit />
                </div>
              </td>
            )}
            {remove && (
              <td>
                <button className='text-sm font-medium h-5 w-5 rounded text-white bg-red-500'>X</button>
              </td>
            )}
            {iptQuantidade && (
              <td>
                <div className='flex items-center justify-around'>
                  <button className='text-xl font-medium' onClick={() => handleTirar(index)}>-</button>
                  <input
                    type="text"
                    className='w-5 h-5 border border-slate-700 rounded text-center'
                    value={inputValues[index]}
                    readOnly
                  />
                  <button className='text-xl font-medium' onClick={() => handleAdicionar(index)}>+</button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaModal;

