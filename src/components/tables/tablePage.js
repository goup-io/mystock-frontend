import React from 'react';
import ButEdit from '../buttons/buttonEdit'

function TabelaPage({ colunas, dados, edit, remove }) {

  return (
   
    <table className='w-full'>
    <thead className='text-[1rem] h-[2rem] text-white'>
      <tr className='sticky top-0 bg-slate-600'>
        {colunas.map((coluna, index) => (
          <th key={index}>{coluna}</th>
        ))}
        {edit && <th>Editar</th>}
        {remove && <th>Remover</th>}
      </tr>
    </thead>
    <tbody className=' text-base'>
      {dados.map((linha, index) => (
        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
          {Object.values(linha).map((valor, index) => (
            <td key={index}>{valor}</td>
          ))}
          {edit && (
            <td> 
            <ButEdit></ButEdit>
            </td>
          )}
          {remove && (
            <td >
              <button className='text-sm font-medium w-5 h-5 rounded text-white bg-red-500'>X</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
  
  
  
  );
}

export default TabelaPage;