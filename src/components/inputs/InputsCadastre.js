// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function InputCadastre(props) {
    return (
        <form class="relative">
            {props.icon && (
                <div className="absolute top-2 left-3.5">
                    <img src={props.icon} alt="Ícone" />
                </div>
            )}
            <input
               value={props.value}
               onChange={(e) => {props.handleInput(e, props.handlerAtributeChanger)}}
               id={props.id} 
               type={`${props.type}`} 
               placeholder={props.placeholder == undefined ? "" : props.placeholder} 
               class="w-56 h-7 rounded bg-[F5F3F4] pl-2 text-[0.8rem] font-[300] text-[#555] form-control border border-1 border-slate-600"
            >{props.children}</input>
            {/* <div class="relative">
            <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 appearance-none text-black border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-[32.8rem] h-[3.75rem] rounded-[3.125rem] bg-[F5F3F4] text-[1.5625rem] font-[400] text-[#555] form-control border border-slate-600" placeholder=" " />

            <label for="floating_outlined" class="absolute text-[1.56rem] text-gray-500 text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
            </div> */}

        </form>
    );
}

export default InputCadastre;