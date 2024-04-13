import ButtonCloseModal from "../buttons/buttonCloseModal";

function InputFilterDate(props) {

    return (
       
            <div className="w-full flex justify-around items-center text-center ">
                <p class="form-floating text-[0.8rem] text-black  font-normal">{props.inicio}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6rem] h-5 rounded bg-[F5F3F4] pl-2 text-[0.8rem] font-[400] text-[#555] form-control border border-gray-700"
                ></input>
                <p class="form-floating text-[0.8rem] text-black font-normal">{props.fim}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6rem] h-5 rounded bg-[F5F3F4] pl-2 text-[0.8rem] font-[400] text-[#555] form-control border border-gray-700"
                ></input>
                <ButtonCloseModal></ButtonCloseModal>
            </div>
        
    );
}


export default InputFilterDate;