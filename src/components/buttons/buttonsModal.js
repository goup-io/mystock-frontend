function ButtonModal(props){
    return(
         <button className="w-[7.725rem] h-[1.5rem] font-medium bg-gray-700 rounded text-white ">
             <span class="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonModal;