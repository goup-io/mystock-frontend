import ButtonSearchModal from "../buttons/buttonSearchModal";

function InputSearcModal(props) {

    const handleInput = (event) => {
        const inputValue = event.target.value;
        props.funcao(inputValue);
    }

    return (
        <div className="flex items-center">
            <p className="form-floating text-lg text-black mr-2 font-normal">{props.children}:</p>
            <input 
                type={props.type} 
                name="ipt_search" 
                onChange={handleInput} 
                className="w-[12rem] h-6 rounded-l-md bg-[F5F3F4] pl-2 text-[1rem] font-[400] text-[#555] form-control border-[1px] border-gray-700 focus:outline-none" 
                maxLength="50"
            />
            <ButtonSearchModal />
        </div>
    );
}

export default InputSearcModal;