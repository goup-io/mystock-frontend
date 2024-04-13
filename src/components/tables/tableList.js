
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableHead from '@mui/material/TableHead';
// import { styled } from '@mui/material/styles';

// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: '#355070', 
//     color: 'white', 
//     padding: '8px',
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 12,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: '#E7E7E7', // Cor de fundo para linhas ímpares
//   },
//   '&:nth-of-type(even)': {
//     backgroundColor: '#D0D4F0', // Cor de fundo para linhas pares
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// const columns = [
//   { id: 'cod', label: 'Codigo', maxWidth: 70, align: 'center' },
//   { id: 'nome', label: 'Nome', maxWidth: 70, align: 'center' },
//   { id: 'modelo', label: 'Modelo', maxWidth: 70, align: 'center' },
//   { id: 'prec', label: 'Preço', maxWidth: 70, align: 'center' },
//   { id: 'tam', label: 'Tamanho', maxWidth: 70, align: 'center' },
//   { id: 'cor', label: 'Cor', maxWidth: 70, align: 'center' },
//   { id: 'loja', label: 'Loja', maxWidth: 70, align: 'center' },
//   { id: 'qtdItens', label: 'N.Itens', maxWidth: 70, align: 'center' },
//   { id: 'quantity', label: 'adicionar', maxWidth: 70, align: 'center'}, 
// ];

// function createData(cod,nome,modelo,prec,tam,cor,loja,qtdItens,quantity) {
//   return { cod,nome,modelo,prec,tam,cor,loja,qtdItens,quantity };
// }

// const rows = [
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
//   createData(123,'triple red', 'air max', 171.00, 36, 'red','loja1', 20),
// ];

// export default function TableTeste() {

//   return (

//       <div className='w-[32rem] h-[16rem]'>

//       <Paper sx={{ width: '100%', overflow: 'hidden'}}>
//       <TableContainer sx={{ maxHeight: 270}}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead >
//             <StyledTableRow>
//               {columns.map((column) => (
//                 <StyledTableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </StyledTableCell>
//               ))}
//             </StyledTableRow >
//           </TableHead>
//           <TableBody>
//             {rows
//               .map((row) => {
//                 return (
//                   <StyledTableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
// if (column.id === 'quantity') {
//   return (
//     <StyledTableCell key={column.id}>
//       <TextField
//         type="number"
//         value={value}
//       />
//       <IconButton size="small"></IconButton>
//     </StyledTableCell>
//   );
// }
//                       return (
//                         <StyledTableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </StyledTableCell>
//                       );
//                     })}
//                   </StyledTableRow >
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//     </Paper>

//       </div>

//   );
// }

import React from 'react';

function Tabela({ colunas, dados, iptQuantidade }) {

 // Função para lidar com a adição de quantidade
 const handleAdicionar = (index) => {
  // Aqui você pode implementar a lógica para adicionar a quantidade
  console.log(`Adicionar quantidade para a linha ${index}`);
};

  return (
   
      <table className='  w-[32rem] h-[16rem]'>
        <thead className=' text-sm text-white font-light'>
          <tr>
            {colunas.map((coluna, index) => (
              <th key={index}>{coluna}</th>
            ))}
            {iptQuantidade && <th>Add</th>}
          </tr>
        </thead>
        <tbody className=' text-sm'>
          {dados.map((linha, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#D0D4F0' : '#E7E7E7' }}>
              {Object.values(linha).map((valor, index) => (
                <td key={index}>{valor}</td>
              ))}
              {iptQuantidade && (
                <td className='flex items-center justify-center'>
                  <input type="number" className=' w-4 h-4 border border-slate-700 rounded' />
                  <button className=' text-base mb-1 font-medium items-center' onClick={() => handleAdicionar(index)}>+</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
  
  );
}

export default Tabela;

