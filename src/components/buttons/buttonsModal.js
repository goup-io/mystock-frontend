function ButtonModal(props){
    return(
         <button class="px-4 font-medium bg-[#355070] rounded text-white ">
             <span class="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonModal;