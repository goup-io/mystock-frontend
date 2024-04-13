
import ButtonSearchModal from "../buttons/buttonSearchModal";

function InputSearcModal(props) {

    return (
        
            <div className="flex items-center">
                <p class="form-floating text-base text-black ' mr-2 font-normal">{props.children}:</p>
                <input type={`${props.type}`} class="w-48 h-6 rounded-l-lg bg-[F5F3F4] pl-16 text-[1.5625rem] font-[400] text-[#555] form-control border border-2 border-gray-700"
                ></input>
                <ButtonSearchModal></ButtonSearchModal>
            </div>
     
    );
}


export default InputSearcModal;