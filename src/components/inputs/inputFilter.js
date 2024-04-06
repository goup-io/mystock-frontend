import ButtonCloseModal from "../buttons/buttonCloseModal";

function InputFilter(props) {

    return (
        <div className="w-[13rem] h-2/2 flex ">
            <div className="w-full flex justify-around items-center text-center ">
                <p class="form-floating text-base text-black mb-2 font-normal">{props.children}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6.625rem] h-5 rounded bg-[F5F3F4] flex text-start pl-16 text-base font-[300] text-[#555] form-control border border-2 border-gray-700"
                ></input>
            </div>
        </div>
    );
}


export default InputFilter;