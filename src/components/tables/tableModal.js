
import React from 'react';
import ButEdit from '../buttons/buttonEdit';

function TabelaModal({ colunas, dados, edit, remove, iptQuantidade }) {

  // Função para lidar com a adição de quantidade
  const handleAdicionar = (index) => {
    // Aqui você pode implementar a lógica para adicionar a quantidade
    console.log(`Adicionar quantidade para a linha ${index}`);
  };

  return (

    <table className='  w-full h-full'>
      <thead className=' text-xs text-white font-light'>
        <tr className='sticky top-0 bg-slate-600 '>
          {colunas.map((coluna, index) => (
            <th key={index}>{coluna}</th>
          ))}
          {edit && <th>Editar</th>}
          {remove && <th>Remover</th>}
          {iptQuantidade && <th>Add</th>}
        </tr>
      </thead>
      <tbody className=' text-xs'>
        {dados.map((linha, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
            {Object.values(linha).map((valor, index) => (
              <td key={index}>{valor}</td>
            ))}
            {edit && (
              <td className=' flex justify-center items-center'>
                {/* <div > */}
                  <ButEdit></ButEdit>
                {/* </div> */}
              </td>
            )}
            {remove && (
              <td>
                <button className=' text-base font-medium h-6 w-6 rounded text-white bg-red-500'>X</button>
              </td>
            )}
            {iptQuantidade && (
              <td className='flex items-center justify-center'>
                <input type="number" className=' w-6 h-6 mb-2 border border-slate-700 rounded' />
                <button className=' text-xl mb-3 font-medium items-center' onClick={() => handleAdicionar(index)}>+</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>

  );
}

export default TabelaModal;

