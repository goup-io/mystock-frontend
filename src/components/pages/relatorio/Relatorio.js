import PageLayout from '../PageLayoutAreaRestrita.js'
import TitleBox from '../../header/TitleBox.js'
import ChartBox from '../../chartsBoxes/ChartBox.js'
import imgPageRelatorios from '../../../assets/icons/svg_page_relatorios.png'
import ButtonModal from '../../buttons/buttonsModal.js'
import React, { useState } from 'react';

function Relatorio() {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesAtual = new Date().getMonth();
    const [mesSelecionado, setMesSelecionado] = useState(meses[mesAtual]);
    
    const diaAtual = new Date().getDate(); 
    const [diaSelecionado, setDiaSelecionado] = useState(diaAtual);

    const anoAtual = new Date().getFullYear();
    const [anoSelecionado, setAnoSelecionado] = useState(anoAtual);

    const handleSelectMes = (event) => {
        setMesSelecionado(event.target.value);
    };

    const handleDia = (event) => {
        setDiaSelecionado(event.target.value);
};

    const handleAno = (event) => {
        setAnoSelecionado(event.target.value);
    };

    return (
        <>
            <PageLayout>
                <TitleBox title="Relatórios"></TitleBox>
                <ChartBox>
                    <div className='w-full flex p-2'>
                        <div className='w-[50%] text-left '>
                            <h2 className='font-medium text-lg mb-5'>CONFIGURAÇÃO PARA EMISSÃO</h2>
                            <form className='flex flex-col gap-8 w-[50%] h-[100%]'>
                                <div>
                                    <label>Modelo:</label>
                                    <div className='flex gap-5 mt-2'>
                                        <div><input type="radio" name="i_modelo" value="sim" /> Anual</div>
                                        <div><input type="radio" name="i_modelo" value="nao" /> Mensal</div>
                                        <div><input type="radio" name="i_modelo" value="talvez" checked /> Diario</div>
                                    </div>
                                </div>
                                <div>
                                    <label>Data referente:</label>
                                    <div className='flex gap-5 my-2'>
                                        <div className='flex flex-col'>
                                            <label>Dia:</label>
                                            <input type='number' min={1} max={31} value={diaSelecionado} placeholder='01' className='border rounded pl-3' onChange={handleDia}></input> 
                                        </div>
                                        <div className='flex flex-col'>
                                            <label>Mês:</label>
                                            <select value={mesSelecionado} onChange={handleSelectMes} className="border rounded">
                                                {meses.map((mes, index) => (
                                                    <option key={index} value={mes}>
                                                        {mes} 
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label>Ano:</label>
                                            <input type='number' min={2024} max={2050} value={anoSelecionado} name='i_ano' placeholder={anoAtual} className='border rounded pl-3' onChange={handleAno}></input> {/* Corrigido */}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Tipo:</label>
                                    <select className='border rounded px-1' name='i_tipo'>
                                        <option value={0}>Geral (todas as lojas)</option>
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
