import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputFilterDate from "../inputs/inputFilterDate";
import ComboBoxFilter from "../inputs/comboBoxFilter";
import ButtonClearFilter from "../buttons/buttonClearFilter";

function Filter({ data, cor, modelo, tamanho, preço, status, vendedor, tipoVenda, horario, tipoAlerta }) {
    return (
        <div className="w-full flex flex-wrap justify-between items-center text-center ">
            {/* Seção dos filtros */}
            <div className="md:flex md:space-x-4 md:w-auto md:mb-0 ">
                {cor && <ComboBoxFilter>Cor</ComboBoxFilter>}
                {modelo && <ComboBoxFilter>Modelo</ComboBoxFilter>}
                {tamanho && <ComboBoxFilter>Tamanho</ComboBoxFilter>}
                {status && <ComboBoxFilter>Status</ComboBoxFilter>}
                {vendedor && <ComboBoxFilter>Vendedor</ComboBoxFilter>}
                {tipoVenda && <ComboBoxFilter>Tipo Venda</ComboBoxFilter>}
                {data && <div><InputFilterDate
                   type="date"
                   placeholder="DD/MM/AAAA"
                   inicio="Data de"
                   fim="á"
                 /></div>}
                {horario && <div><InputFilterDate
                   type="date"
                   placeholder="HH:MM"
                   inicio="Hora de"
                   fim="á"
                 /></div>}
                {preço && <div><InputFilterDate
                    type="text"
                    placeholder="R$00,00"
                    inicio="Preço de"
                    fim="á"
                /></div>}
                {tipoAlerta && 
                    <div className="flex items-center">
                        <label className="text-[1rem] text-black font-normal mr-3">Tipo:</label>
                        <div className='flex gap-5 mt-1'>
                            <div className="flex items-center gap-1"><input type="radio" name="tpAlerta" value="todos" checked /> Todos</div>
                            <div className="flex items-center gap-1"><input type="radio" name="tpAlerta" value="estoque" /> Estoque</div>
                            <div className="flex items-center gap-1"><input type="radio" name="tpAlerta" value="transferencias" /> Transferências</div>
                        </div>
                    </div>
                }
            </div>

            {/* Botões de limpar e filtrar */}
            <div className="flex  h-6 ml-4" >
                <ButtonClearFilter>Limpar</ButtonClearFilter>
                <ButtonModal>Filtrar</ButtonModal>
            </div>
        </div>
    );
}

export default Filter;

