import { borderRadius, height, margin } from '@mui/system';

//Componentes
import Menu from '../../components/menu/MenuLateral.js'
import Header from '../../components/header/HeaderAR.js'

import { useState, useEffect } from 'react'


function PageLayoutAreaRestrita(props){

    return(
        <>
            <section class="flex h-[100vh] bg-[#355070] w-full overflow-hidden">
                <Menu></Menu>

                <div class="flex flex-col w-full h-full">
                    <Header></Header>

                    <div id="mainDiv" class="w-full h-full bg-[#F5F3F4] p-5 px-8 rounded-tl-3xl">
                        {props.children}
                    </div>
                </div>
            </section>
        </>   
    )
}

export default PageLayoutAreaRestrita