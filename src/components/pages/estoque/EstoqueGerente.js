import PageLayoutAreaRestrita from '../PageLayoutAreaRestrita.js'
import ApiRequest from '../../../connections/ApiRequest.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import ButtonDownLoad from '../../buttons/buttonDownLoad.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

import AbrirModalCadastreKit from '../../modals/modals-kit/modalCadastreKit.js'
import AbrirModalCadastreModel from '../../modals/modals-model/modalCadastreModel.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'
import AbrirModalCadastreUser from '../../modals/modals-user/modalCadastreUser.js'
import PageLayout from '../PageLayout.js'
import Filter from '../../inputs/filter.js'



import React, { useState, useEffect } from 'react';
import AbrirModalComission from '../../modals/modalComission.js'
import ButtonCancel from '../../buttons/buttonCancel.js'


function EstoqueGerente(){

    const buttons = [
        { label: "Calculadora de comissão", event: AbrirModalComission },
        { label: "NOVO USUÁRIO", event: AbrirModalCadastreUser },
    ];
    
    return(
        <>
            <PageLayoutAreaRestrita>
-                <TitleBox title="Estoque" buttons={buttons}></TitleBox>

                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-10  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter modelo cor tamanho preço></Filter>
                </div>

                <ChartBox >

                    <div className='w-full h-[30rem] px-4 flex justify-start flex-col items-center'>

                        <div className='w-full mt-2 flex justify-between'>

                            <p className='font-medium text-lg'>ESTOQUE </p>

                            <div className='flex gap-4 items-center'>
                                <InputSearcModal props="text">Pesquisar</InputSearcModal>
                                <ButtonDownLoad></ButtonDownLoad>
                            </div>

                        </div>

                    </div>

                </ChartBox>
            </PageLayoutAreaRestrita>
        </>
    )

    
}
export default EstoqueGerente;
