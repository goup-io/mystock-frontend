import React from 'react';
import ButEdit from '../buttons/buttonEdit'

function TabelaPage({ colunas, dados, edit, remove }) {

  return (
   
    <table className='w-full'>
    <thead className='text-[1.2rem] h-[2.5rem] text-white'>
      <tr className='sticky top-0 bg-slate-600'>
        {colunas.map((coluna, index) => (
          <th key={index}>{coluna}</th>
        ))}
        {edit && <th>Editar</th>}
        {remove && <th>Remover</th>}
      </tr>
    </thead>
    <tbody className='text-lg h-[6rem]'>
      {dados.map((linha, index) => (
        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
          {Object.values(linha).map((valor, index) => (
            <td key={index}>{valor}</td>
          ))}
          {edit && (
            <td className=' flex justify-center items-center'> 
            <ButEdit></ButEdit>
            </td>
          )}
          {remove && (
            <td>
              <button className='text-lg font-medium w-8 rounded text-white bg-red-500'>X</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
  
  
  
  );
}

export default TabelaPage;