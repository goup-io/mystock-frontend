// import ButtonSearchModal from "../buttons/buttonSearchModal";
import ButtonModal from "../buttons/buttonsModal";
import InputFilter from "./inputFilter";
import InputFilterDate from "./inputFilterDate";

function FilterSearch() {

    return (
        <div className="h-[40.0rem] bg-slate-400 flex justify-center items-center">
        <div className="w-11/12 h-[4.5rem] flex flex-col rounded-md shadow-lg items-end text-sm bg-white">
            <div className="w-full h-[2.5rem] flex justify-center ">
                <InputFilterDate
                    type="text"
                    placeholder="DD/MM/AAAA"
                    inicio="data de"
                    fim="á"
                ></InputFilterDate>
                <InputFilterDate
                   type="text"
                   placeholder="HH:MM"
                   inicio="horário de"
                   fim="á"
                ></InputFilterDate>
                  <InputFilter
                placeholder="selecione..."
                >vendedor</InputFilter>
                <InputFilter
                placeholder="selecione..."
                >tipo venda</InputFilter>
                {/* <InputFilter
                 placeholder="selecione..."
                >vendedor</InputFilter> */}
            </div>
            <div className="w-[20.0rem] h-[1.5rem] flex justify-evenly ">
                <ButtonModal>Limpar</ButtonModal>
                <ButtonModal>Filtrar</ButtonModal>
            </div>
        </div>
    </div>
    );
}


export default FilterSearch;