
import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import Filter from '../../inputs/filter.js'
import InputSearch from '../../inputs/inputSearch.js'

function Relatorio() {

    return (
        <>
            <PageLayout>
                <TitleBox title="Mural de Avisos"></TitleBox>
                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-5 drop-shadow-md items-center text-sm bg-white'>
                    <Filter modelo cor tamanho preço></Filter>
                </div>
                <ChartBox>
                    <div className='p-2 px-3 flex justify-between'>
                        <h2 className='font-medium text-lg'>AVISOS</h2>                        
                        <InputSearch>Pesquisar</InputSearch>
                    </div>
                    <div>
                        
                    </div>
                </ChartBox>
            </PageLayout>
        </>
    )

}

export default Relatorio