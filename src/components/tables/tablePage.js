import React, { useEffect } from 'react';
import ButEdit from '../buttons/buttonEdit';
import ButtonModal from '../buttons/buttonsModal';
import ImgNegar from '../../assets/negate.png';
import ImgAceitar from '../../assets/acept.png';
 
function TabelaPage({ colunas, dados, edit, remove, cancel, troca, verMais,negar , aceitar,status, id }) {

function TabelaPage({ colunas, dados, edit, remove, cancel, troca, verMais, status, id }) {

  const getStyleFundoStatus = (status) => {
    switch (status) {
      case 'Aceito':
      case 'Finalizada':
        return 'bg-[#B2DF8A] border-[#0B8F48]';
      case 'Pendente':
      case 'Em andamento':
        return 'bg-[#C1C1C1] border-[#5E6977]';
      case 'Negado':
      case 'Cancelado':
        return 'bg-[#F47D8B] border-[#EF233C]';
      default:
        return 'bg-slate-500 border-slate-700';
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
          {negar && <th>Negar</th>}
          {aceitar && <th>Aceitar</th>}
          {verMais && <th>Ver Mais</th>}
          {troca && <th>&nbsp;</th>}
          {cancel && <th>&nbsp;</th>}
        </tr>
      </thead>
      <tbody className=' text-base'>
        {dados.map((linha, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
            {Object.entries(linha).map(([chave, valor], index) => (
              chave === 'status' ?
                <td key={index}>
                  <div className={`ml-1 border-[1px] w-11/12 rounded-full shadow ${getStyleFundoStatus(valor)}`}>
                    {valor}
                  </div>
                </td>
                :
                <td key={index}>{valor}</td>
            ))}
            {edit && (
              <td>
                <ButEdit id={id[index]} funcao={() => edit(id[index])}></ButEdit>
              </td>
            )}
            {remove && (
              <td >
                <button onClick={() => remove(id[index])} className='text-sm font-medium w-5 h-5 rounded text-white bg-red-500'>X</button>
              </td>
            )}
              {negar && (
              <td>
                <button className=' h-5 w-5 '>
                <img src={ImgNegar}></img>
                </button>
              </td>
            )}
              {aceitar && (
              <td>
                <button className='h-5 w-5'>
                <img src={ImgAceitar}></img>
                </button>
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
