
import ButtonSearchModal from "../buttons/buttonSearchModal";

function InputSearcModal(props) {

    return (
        
            <div className="flex items-center">
                <p class="form-floating text-lg text-black ' mr-2 font-normal">{props.children}:</p>
                <input type={`${props.type}`} class="w-[12rem] h-6 rounded-l-md bg-[F5F3F4] pl-2 text-[1rem] font-[400] text-[#555] form-control border-2 border-gray-700 focus:outline-none" maxLength="50"
                ></input>
                <ButtonSearchModal></ButtonSearchModal>
            </div>
     
    );
}


export default InputSearcModal;