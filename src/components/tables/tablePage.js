import React from 'react';
import ButEdit from '../buttons/buttonEdit'
import ButtonModal from '../buttons/buttonsModal';

function TabelaPage({ colunas, dados, edit, remove, cancel, troca, verMais, id }) {

  return (
   
    <table className='w-full'>
    <thead className='text-[1rem] h-[2rem] text-white'>
      <tr className='sticky top-0 bg-slate-600'>
        {colunas.map((coluna, index) => (
          <th key={index}>{coluna}</th>
        ))}
        {edit && <th>Editar</th>}
        {remove && <th>Remover</th>}
        {verMais && <th>Ver Mais</th>}
        {troca && <th>&nbsp;</th>}
        {cancel && <th>&nbsp;</th>}
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
            <ButEdit id={id[index]} funcao={() => edit(id[index])}></ButEdit>
            </td>
          )}
          {remove && (
            <td >
              <button className='text-sm font-medium w-5 h-5 rounded text-white bg-red-500'>X</button>
            </td>
          )}
          {verMais && (
            <td className='flex justify-center items-center' >
              <button className='text-lg font-bold w-5 h-5 rounded text-white bg-[#96BDCE] flex items-center justify-center duration-50 ease-in-out hover:scale-[1.1] hover:bg-[#86AEC0] mt-[1.6px]'>+</button>
            </td>
          )}
          {troca && (
            <td >
              <ButtonModal>Trocar</ButtonModal>
            </td>
          )}
          {cancel && (
            <td >
              <ButtonModal cor="#919191">Cancelar</ButtonModal>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
  
  
  
  );
}

export default TabelaPage;