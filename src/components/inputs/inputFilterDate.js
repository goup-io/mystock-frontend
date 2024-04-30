import ButtonClearFilter from "../buttons/buttonClearFilter";

function InputFilterDate(props) {

    return (
       
            <div className="w-full flex justify-around items-center text-center ">
                <p class="form-floating text-[1.2rem] text-black  font-normal">{props.inicio}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6rem] h-6 rounded bg-[F5F3F4] text-center text-[0.8rem] font-[400] text-[#555] border border-gray-700"
                ></input>
                <p class="form-floating text-[1.2rem] text-black font-normal">{props.fim}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6rem] h-6 rounded bg-[F5F3F4] text-center  text-[0.8rem] font-[400] text-[#555] border border-gray-700"
                ></input>
                <ButtonClearFilter></ButtonClearFilter>
            </div>
        
    );
}


export default InputFilterDate;