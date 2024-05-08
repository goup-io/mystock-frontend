import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import imgPageRelatorios from '../../../assets/icons/svg_page_relatorios.png'
import ButtonModal from '../../buttons/buttonsModal.js'


function Relatorio() {

    return (
        <>
            <PageLayout>
                <TitleBox title="Relatórios"></TitleBox>
                <ChartBox>
                    <div className='w-full flex p-2'>
                        <div className='w-[50%] text-left '>
                            <h2 className='font-medium text-lg mb-5'>CONFIGURAÇÃO PARA EMISSÃO</h2>
                            <form className='flex flex-col gap-8 w-[42%] h-[100%]'>
                                <div>
                                    <label>Modelo:</label>
                                    <div className='flex gap-5 mt-2'>
                                        <div><input type="radio" name="webmaster" value="sim" /> Anual</div>
                                        <div><input type="radio" name="webmaster" value="nao" /> Mensal</div>
                                        <div><input type="radio" name="webmaster" value="talvez" /> Diario</div>
                                    </div>
                                </div>
                                <div>
                                    <label>Data referente:</label>
                                    <div className='flex gap-5 my-2'>
                                        <div className='flex flex-col'>
                                            <label>Dia:</label>
                                            <input type='number' min={1} max={31} placeholder='01' className='border rounded pl-3'></input>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label>Mês:</label>
                                            <input type='number' min={1} max={12} placeholder='05' className='border rounded pl-3'></input>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label>Ano:</label>
                                            <input type='number' min={2024} max={2050} placeholder='2024' className='border rounded pl-3'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Tipo:</label>
                                    <select className='border rounded px-1'>
                                        <option value={0}>Geral (todas as lojas)</option>
                                        <option value={1}>Loja 1</option>
                                        <option value={2}>Loja 2</option>
                                        <option value={3}>Loja 3</option>
                                    </select>
                                </div>
                                <div className='w-full flex flex-col bottom-0'>
                                    <ButtonModal>GERAR RELATÓRIO</ButtonModal>
                                </div>                                
                            </form>
                        </div>
                        <img src={imgPageRelatorios} className='h-[70vh]' />
                    </div>
                </ChartBox>
            </PageLayout>
        </>
    )

}

export default Relatorio