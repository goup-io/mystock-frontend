import React, { useEffect, useState } from 'react';
import ButEdit from '../buttons/buttonEdit';
import ButtonModal from '../buttons/buttonsModal';
import ImgNegar from '../../assets/negate.png';
import ImgAceitar from '../../assets/acept.png';

function TabelaPage({ colunas, dados, edit, remove, cancel, troca, verMais, negar, aceitar, id }) {

  const getStyleFundoStatus = (status) => {
    switch (status) {
      case 'Aceito':
      case 'Finalizada':
      case 'ACEITO':
      case 'FINALIZADA':
        return 'bg-[#B2DF8A] border-[#0B8F48]';
      case 'Pendente':
      case 'Em andamento':
      case 'PENDENTE':
      case 'EM ANDAMENTO':
        return 'bg-[#C1C1C1] border-[#5E6977]';
      case 'Negado':
      case 'Cancelada':
      case 'NEGADO':
      case 'CANCELADO':
        return 'bg-[#F47D8B] border-[#EF233C]';
      default:
        return 'bg-slate-500 border-slate-700';
    }
  };

  const [qtdSolicitadaTransf, setQtdSolicitadaTransf] = useState(0);

  return (
    <table className='w-full'>
      <thead className='text-[1rem] h-[2rem] text-white'>
        <tr className='sticky top-0 bg-slate-600'>
          {colunas.map((coluna, index) => (
            <th key={index}>{coluna}</th>
          ))}
          {edit && <th>Editar</th>}
          {remove && <th>Remover</th>}
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
                  <div className={`ml-1 border-[1px] w-11/12 rounded-full shadow text-sm ${getStyleFundoStatus(valor)}`}>
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
                <button onClick={() => negar(id[index])} className=' h-4 w-4 duration-150 ease-in-out hover:scale-[1.05]'>
                  <img src={ImgNegar}></img>
                </button>
              </td>
            )}
            {aceitar && (
              <td>
                <button onClick={() => aceitar(id[index], dados[index].nSolic)} className='h-5 w-5 duration-150 ease-in-out hover:scale-[1.05]'>
                  <img src={ImgAceitar}></img>
                </button>
              </td>
            )}
            {verMais && (
              <td className='flex justify-center items-center' >
                <button onClick={() => verMais(id[index].id)} className='text-lg font-bold w-5 h-5 rounded text-white bg-[#96BDCE] flex items-center justify-center duration-50 ease-in-out hover:scale-[1.1] hover:bg-[#86AEC0] mt-[1.6px]'>+</button>
              </td>
            )}
            {troca && (
              <td >
                <ButtonModal>Trocar</ButtonModal>
              </td>
            )}
            {cancel && (
              <td>
                {
                  dados[index].status != "Cancelada" && (
                    <ButtonModal cor="#919191" funcao={() => cancel(id[index].id)}>Cancelar</ButtonModal>
                  )
                }
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaPage;
