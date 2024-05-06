import ButtonCancel from "../buttons/buttonCancel";
import ButtonClearFilter from "../buttons/buttonClearFilter";
import ButtonCloseModal from "../buttons/buttonCloseModal";

function InputFilterDate(props) {

    return (
       
            <div className="w-full flex  items-center text-center">
                <p class=" w-[4.5rem] form-floating text-[1rem] text-black  font-normal">{props.inicio}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[5rem] h-[1.2rem] rounded bg-[F5F3F4] ml-2 text-center text-[0.7rem] font-[400] text-[#555] border border-gray-700"
                ></input>
                <p class="form-floating text-[1rem] text-black font-normal ml-2">{props.fim}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[5rem] h-[1.2rem] rounded bg-[F5F3F4] ml-2 text-center  text-[0.7rem] font-[400] text-[#555] border border-gray-700"
                ></input>
                <button className="ml-2 w-5 h-5 bg-red-600 text-white text-base flex justify-center items-center rounded">
                    X
                </button>
            </div>
        
    );
}


export default InputFilterDate;