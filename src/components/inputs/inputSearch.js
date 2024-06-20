
import ButtonSearch from "../buttons/buttonSearch";

function InputSearch(props) {

    return (
        
            <div className="flex items-center">
                <p className="form-floating text-lg text-black ' mr-2 font-normal">{props.children}:</p>
                <input type={`${props.type}`} className="w-[12rem] h-6 rounded-l-md bg-[F5F3F4] pl-3 text-[1rem] font-[400] text-[#555] form-control border-2 border-[#355070]"
                ></input>
                <ButtonSearch></ButtonSearch>
            </div>
     
    );
}


export default InputSearch;