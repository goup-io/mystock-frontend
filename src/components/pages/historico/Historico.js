import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'
import Filter from '../../inputs/filter.js'
import InputSearcModal from '../../inputs/inputSearchModal.js'
import TabelaPage from '../../tables/tablePage.js'

function Historico() {

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

    return(
        <>
            <PageLayout>
                <Header telaAtual="Histórico de Vendas"></Header>
                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-6  shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] items-center text-sm bg-white'>
                    <Filter data horario vendedor tipoVenda></Filter>
                </div>

                <div className='bg-white mt-4 h-[74%] flex flex-col justify-start pl-10 pr-10 pt-2 pb-2 items-center shadow-[1px_4px_4px_0_rgba(0,0,0,0.25)] rounded-md'>
                    <div className='w-full h-[8%] flex justify-between items-center '>
                        <p className='font-medium text-lg'>HISTÓRICO</p>
                        <InputSearcModal props="text">Pesquisar</InputSearcModal>
                    </div>
                    <div className='w-full h-[85%] mt-2 flex justify-center items-center '>
                        <div className=' w-full h-full border-solid border-[1px] border-slate-700  bg-slate-700 overflow-y-auto rounded'>
                            <TabelaPage colunas={colunasHistorico} dados={dadosHistorico} status verMais troca cancel id={0} /> 
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Historico