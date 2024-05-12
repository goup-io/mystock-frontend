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

    return (
        <>
            <PageLayoutAreaRestrita>
                <TitleBox title="Histórico de Vendas"></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data horario vendedor tipoVenda></Filter>
                </div>

                <ChartBox>
                    
                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )
}

export default HistoricoVendasGerente;
