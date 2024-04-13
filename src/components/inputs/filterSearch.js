// import ButtonSearchModal from "../buttons/buttonSearchModal";
import ButtonClear from "../buttons/buttonClear";
import ButtonModal from "../buttons/buttonsModal";
import InputFilter from "./inputFilter";
import InputFilterDate from "./inputFilterDate";

function FilterSearch() {

    return (
        <div className="h-[40rem] bg-slate-400 flex justify-center items-center">
            <div className="w-[62rem] h-[6rem] flex flex-col rounded-md p-2 shadow-lg justify-around items-center text-sm bg-white">
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
                <div className="w-[60.5rem] h-[1.5rem] flex justify-end ">
                    <ButtonClear>Limpar</ButtonClear>
                    <ButtonModal>Filtrar</ButtonModal>
                </div>
            </div>
        </div>
    );
}


export default FilterSearch;