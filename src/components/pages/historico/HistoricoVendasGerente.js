import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import Filter from '../../inputs/filter.js'

import React, { useState, useEffect } from 'react';


function HistoricoVendasGerente() {

    const colunasHistorico = ['Data', 'Horário', 'Vendedor', 'Tipo Venda', 'N. Itens', 'Valor', 'Status'];

    const dadosHistorico = [
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
        {data: '12/11/2024', horario: '11:11:00', vendedor: 'Emily', tipo: 'Varejo', quantItens: 4, valor: 'R$450,00', status: 'Finalizada'},
    ]

    async function csvHistoricoVendas() {
        alert("Implementar lógica csv!")
    }

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Histórico de Vendas"></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data horario vendedor tipoVenda></Filter>
                </div>

                <ChartBox>
                    <div className='px-4 pt-1'>
                        <div className='w-full flex justify-between'>
                            <p className='font-medium text-lg'>HISTÓRICO</p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                <ButtonDownLoad func={csvHistoricoVendas} ></ButtonDownLoad>
                            </div>
                        </div>

                        <div className='w-full h-[50vh] mt-2 bg-slate-700 border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunasHistorico} dados={dadosHistorico} status verMais troca cancel id={0} /> 
                        </div>
                    </div>
                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default HistoricoVendasGerente;
