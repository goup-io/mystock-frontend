import React, { useContext, useState, useEffect } from 'react';
import ButEdit from '../buttons/buttonEdit';
import { ContextAdicionar } from '../modals/modals-produto/modalCadastreProdPreConfig';


function TabelaModal({ colunas, dados, edit, remove, iptQuantidade, onQuantityChange, id }) {
  const getInitialValues = () => {
    return id.reduce((acc, item) => {
      acc[item.id] = 0; // Inicializa as quantidades como 0
      return acc;
    }, {});
  };

  const [inputValues, setInputValues] = useState(getInitialValues ? getInitialValues : ['', '']);

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(inputValues);
    }
  }, [inputValues, onQuantityChange]);

  const handleAdicionar = (idEtp) => {
    setInputValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[`${idEtp}`] = (newValues[`${idEtp}`] || 0) + 1;
      return newValues;
    });
  };

  const handleTirar = (idEtp) => {
    setInputValues((prevValues) => {
      const newValues = { ...prevValues };
      if ((newValues[`${idEtp}`] || 0) > 0) {
        newValues[`${idEtp}`] = (newValues[`${idEtp}`] || 0) - 1;
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
          {iptQuantidade && <th>Quant.</th>}
        </tr>
      </thead>
      <tbody className='text-xs'>
        {dados.map((linha, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
            {Object.values(linha).map((valor, index) => (
              <td key={index}>{valor}</td>
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
                <div className='flex items-center justify-around gap-[2px]'>
                  <button className='text-xl font-medium' onClick={() => handleTirar(`${id[index].id}`)}>-</button>
                  <input
                    type="text"
                    className='w-5 h-5 border border-slate-700 rounded text-center'
                    value={inputValues[id[index].id] ? Number(inputValues[id[index].id]) : 0}
                    readOnly
                  />
                  <button className='text-xl font-medium' onClick={() => handleAdicionar(`${id[index].id}`)}>+</button>
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
