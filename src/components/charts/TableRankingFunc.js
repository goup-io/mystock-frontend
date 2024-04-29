import React from 'react';

function TableRankingFunc({ header, series }) {
    const exibirHeader = () => {
        return header.map((item, index) => (
            <th key={index} className="py-1">{item}</th>
        ));
    };

    const exibirDadosLista = () => {
        return series.map((item, index) => (
            <tr key={index} className="bg-[#D0D4F0] border-2 border-[#355070] py-1">
                <td className="">{index + 1}º</td>
                <td className="">{item.funcionario}</td>
                <td className="">{item.faturamento}</td>
            </tr>
        ));
    };

    return (
        <>
            <table className="w-full border-2 rounded-md border-[#355070] mb-4 overflow-y-auto">
                <thead className="bg-[#355070] text-white font-medium">
                    <tr>
                        {exibirHeader()}
                    </tr>
                </thead>
                <tbody className="bg-[#F6F6F6] overflow-y-auto">
                    {exibirDadosLista()}
                </tbody>
            </table>
        </>
    );
}

export default TableRankingFunc;
