import React from 'react';
import ButEdit from '../buttons/buttonEdit'
import ButtonModal from '../buttons/buttonsModal';
 
function TabelaPage({ colunas, dados, edit, remove, cancel, troca, verMais,status, id }) {

  const getStatusColor = (status) => {
    switch (status) {
      case 'aceito':
        return 'bg-[#B2DF8A]'; 
      case 'pendente':
        return 'bg-[#C1C1C1]'; 
      case 'negado':
        return 'bg-[#F47D8B]'; 
      default:
        return 'bg-slate-500'; 
    }
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'aceito':
        return 'border-[#0B8F48]'; 
      case 'pendente':
        return 'border-[#5E6977]'; 
      case 'negado':
        return 'border-[#EF233C]'; 
      default:
        return 'border-slate-700'; 
    }
  };

  return (

    <table className='w-full'>
      <thead className='text-[1rem] h-[2rem] text-white'>
        <tr className='sticky top-0 bg-slate-600'>
          {colunas.map((coluna, index) => (
            <th key={index}>{coluna}</th>
          ))}
          {edit && <th>Editar</th>}
          {remove && <th>Remover</th>}
          {status && <th>Status</th>}
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
            {status && (
              <td>
                <div className={`h-[1.1rem] ml-1 border-[1px] w-11/12 rounded-lg ${getStatusBorderColor(linha.status)} ${getStatusColor(linha.status)} `}>{linha.status}</div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>



  );
}

export default TabelaPage;