import React from 'react';
import iconDash from '../../assets/icons/i-dashboard.svg'

import { useNavigate } from 'react-router-dom';

function TableRankingFunc({ header, series }) {

    const navigate = useNavigate();

    const exibirHeader = () => {
        return header.map((item, index) => (
            <th key={index} className="py-1">{item}</th>
        ));
    };


    const DashFunc = (item) => {
        const { posicao, funcionario, faturamento, id } = item;
        console.log(id);
        console.log(item.id);
        navigate(`/dashboard-funcionario/${item.id}`, { state: { id } });
    }

    const exibirDadosLista = () => {
        const iconStyle = {
            filter: "invert(0%) brightness(0)",
        };

        return series.map((item, index) => (
            <tr key={index} onClick={()=>DashFunc(item)} className="w-full bg-[#D0D4F0] border-y-2 border-[#355070] h-8 cursor-pointer hover:h-10 hover:bg-[#AFB3D4]" >
                <td className="">{index + 1}º</td>
                <td className="">{item.funcionario}</td>
                <td className="">{item.faturamento}</td>
                <td className=""><img src={iconDash} className='w-5' style={iconStyle} alt="Ícone" /></td>
            </tr>
        ));
    };

    return (
        <>
            <div className='w-full h-full bg-[#F6F6F6] border-2 rounded-md border-[#355070] overflow-y-auto '>
                <table className="w-full rounded-md">
                    <thead className="bg-[#355070] text-white font-medium">
                        <tr className='border-2 border-[#355070]' >
                            {exibirHeader()}
                        </tr>
                    </thead>
                    <tbody className="bg-[#F6F6F6] overflow-y-auto">
                        {exibirDadosLista()}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TableRankingFunc;
