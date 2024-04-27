
import InputCadastre from "./InputsCadastre";

function InputAndLabelModal(props) {

    return (
        <div className="w-2/2 h-1/3 flex">
            <div className="flex flex-col justify-start items-start">
                <p class="form-floating text-sm text-black mb-2 font-normal">{props.children}</p>
                <InputCadastre
                   value={props.value}
                   handleInput={ props.handleInput}
                   handlerAtributeChanger={props.handlerAtributeChanger}
                   id={props.id} 
                   type={`${props.type}`} 
                   placeholder={props.placeholder == undefined ? "" : props.placeholder} 
                ></InputCadastre>
            </div>
        </div>
    );
}


export default InputAndLabelModal;