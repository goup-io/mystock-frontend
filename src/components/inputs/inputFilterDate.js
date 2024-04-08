import ButtonCloseModal from "../buttons/buttonCloseModal";

function InputFilterDate(props) {

    return (
        <div className="w-[23rem] h-2/2 flex ">
            <div className="w-full flex justify-around items-center ">
                <p class="form-floating text-base text-black mb-2 font-normal">{props.inicio}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6.625rem] h-5 rounded bg-[F5F3F4] pl-16 text-sm font-[400] text-[#555] form-control border border-2 border-gray-700"
                ></input>
                <p class="form-floating text-base text-black mb-2 font-normal">{props.fim}:</p>
                <input type={`${props.type}`} placeholder={`${props.placeholder}`} class="w-[6.625rem] h-5 rounded bg-[F5F3F4] pl-16 text-sm font-[400] text-[#555] form-control border border-2 border-gray-700"
                ></input>
                <ButtonCloseModal></ButtonCloseModal>
            </div>
        </div>
    );
}


export default InputFilterDate;