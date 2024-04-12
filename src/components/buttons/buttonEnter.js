
function ButtonEnter(props){
    return(
        <button  class="bg-[#355070] rounded-[3.125rem] w-[32.8125rem] h-[3.875rem] flex flex-col items-center justify-center">
            <span class="text-white text-[2.8125rem]">{props.children}</span>
        </button>
    )
}

export default ButtonEnter;