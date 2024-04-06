// import * as React from 'react';
//  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// createData = params que vão ser os headers da tabela
//  function createData(name, modelo, preco, loja, sla) {
//     return { name, modelo, preco, loja, sla };
//   }
  
//   const rows = [ lista de json q vai vir do banco];
  
//   export default function tableTeste() {
//     return (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//                 {props.name && <TableCell>props.sla</TableCell>}
//               <TableCell>props.sla</TableCell>
//               <TableCell>props.sla2</TableCell>
//               <TableCell>props.sla3</TableCell>
//               <TableCell>props.sla4</TableCell>
//               <TableCell>props.sla5</TableCell>
//               <TableCell>props.sla6</TableCell>
              
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow key={row.name}>
//                 <TableCell> {row.name}</TableCell>
//                 <TableCell>{row.modelo}</TableCell>
//                 <TableCell>{row.preco}</TableCell>
//                 <TableCell>{row.loja}</TableCell>
//                 <TableCell>{row.sla}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }